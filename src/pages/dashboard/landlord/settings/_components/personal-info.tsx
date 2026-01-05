import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader, Loader2, Upload, X } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { useEffect, useState } from "react";
import { CustomAlert } from "@/components/custom/custom-alert";
import { toast } from "sonner";
import {
  NIGERIAN_STATE_CITIES,
  NIGERIAN_STATES,
} from "@/constants/nigerian-states";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.email("Enter a valid email address"),
  phoneNumber: z.string().min(7, "Enter a valid phone number"),
  gender: z.enum(["male", "female", "other"], {
    error: "Select a gender",
  }),
  dob: z
    .union([z.date(), z.string()])
    .refine(
      (val) => {
        const date = val instanceof Date ? val : new Date(val);
        return date <= new Date();
      },
      { message: "Date of birth cannot be in the future" }
    )
    .optional(),
  address: z.string().min(3, "Address is required"),
  state: z.string().min(1, "Select a state"),
  city: z.string().min(1, "City is required"),
  avatar: z.instanceof(File).optional(),
});

export default function PersonalInfo() {
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["user-personal-info"],
    queryFn: () => authService.getUserPersonalInfo(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: undefined,
      dob: undefined,
      address: "",
      state: "",
      city: "",
      avatar: undefined,
    },
  });

  const selectedState = form.watch("state");

  useEffect(() => {
    if (data?.personalInfo) {
      form.setValue("firstName", data.personalInfo.firstName);
      form.setValue("lastName", data.personalInfo.lastName);
      form.setValue("email", data.personalInfo.email);
      form.setValue("phoneNumber", data.personalInfo.phoneNumber);
      form.setValue("gender", data.personalInfo.gender);
      if (data.personalInfo.dob) {
        form.setValue("dob", new Date(data.personalInfo.dob));
      }
      form.setValue("address", data.personalInfo.address);
      form.setValue("state", data.personalInfo.state);
      form.setValue("city", data.personalInfo.city);
      if (data.personalInfo.avatar) {
        setPreviewUrl(data.personalInfo.avatar);
      }
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: authService.updateUserPersonalInfo,
    onSuccess: (data) => {
      console.log({ data });
      queryClient.invalidateQueries({ queryKey: ["user-personal-info"] });
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      toast.success("Personal info updated successfully!");
      form.reset(form.getValues());
    },
    onError: (error: any) => {
      // toast.error(error.message || "Something went wrong");
      setError(error.message || "Something went wrong");
      console.log(error);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError(null);
    console.log("Form data:", values);

    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const value = values[key as keyof typeof values];

      if (key === "avatar") {
        if (value instanceof File) {
          formData.append(key, value);
        }
      } else if (value !== undefined && value !== null) {
        // Handle Date objects
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else {
          formData.append(key, String(value));
        }
      }
    });

    console.log("FormData entries:", Array.from(formData.entries()));

    mutation.mutateAsync(formData as any);
  };

  const personalInfo = data?.personalInfo;

  // console.log({ personalInfo });

  return (
    <div className="max-w-2xl mr-auto space-y-6 py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Profile Picture */}
          <FormField
            control={form.control}
            name="avatar"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="col-span-2">
                <FormLabel className="text-muted-foreground font-normal">
                  Profile Picture
                </FormLabel>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col gap-2">
                    {previewUrl && (
                      <div className="relative w-24 h-24">
                        <img
                          src={previewUrl}
                          alt="Avatar preview"
                          className="w-full h-full object-cover rounded-full"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            onChange(undefined);
                            setPreviewUrl(null);
                          }}
                          className="absolute top-0 right-0 bg-red-500 rounded-full p-1 hover:bg-red-600"
                        >
                          <X size={16} className="text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                  <FormControl>
                    <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition">
                      <div className="flex items-center gap-2">
                        <Upload size={20} />
                        <span className="text-sm text-muted-foreground">
                          Click to upload profile picture
                        </span>
                      </div>
                      <Input
                        {...fieldProps}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file); // Update React Hook Form
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setPreviewUrl(reader.result as string); // Update UI
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-muted-foreground font-normal">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter first name"
                    className="rounded-full py-5 px-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground font-normal">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter last name"
                    className="rounded-full py-5 px-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground font-normal">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    className="rounded-full py-5 px-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground font-normal">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter phone number"
                    className="rounded-full py-5 px-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => {
              console.log({ value: field.value });

              return (
                <FormItem>
                  <FormLabel className="text-muted-foreground font-normal">
                    Gender
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-full py-5 px-5 w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Date of Birth */}
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground font-normal">
                  Date of Birth
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild className="rounded-full py-5 px-5">
                    <FormControl>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className=" w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value as Date}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      // autoFocus
                      captionLayout="dropdown"
                      startMonth={new Date(1900, 0)}
                      endMonth={new Date()}
                      className="rounded-md border bg-white z-50"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="text-muted-foreground font-normal">
                  Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter address"
                    className="rounded-full py-5 px-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State */}
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground font-normal">
                  State
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-full w-full py-5 px-5">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    <SelectGroup>
                      {NIGERIAN_STATES.map((state) => (
                        <SelectItem key={state} value={String(state)}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground font-normal">
                  City
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-full w-full py-5 px-5">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {NIGERIAN_STATE_CITIES[selectedState]?.map((city) => (
                        <SelectItem key={city} value={String(city)}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <CustomAlert variant="destructive" message={error} />}

          {/* Submit Button */}
          <div className="col-span-2 flex justify-end mt-4">
            <Button
              disabled={mutation.isPending || !form.formState.isDirty}
              type="submit"
              className="btn-primary rounded-full px-12"
            >
              {mutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin" /> Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
