import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { toast } from "sonner";
import { CustomAlert } from "@/components/custom/custom-alert";
import { Loader, ServerCrash } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  phoneNumber: z.string().min(7, "Enter a valid phone number"),
  occupation: z.string().min(2, "Occupation is required"),
  workAddress: z.string().min(3, "Work address is required"),
  homeAddress: z.string().min(3, "Home address is required"),
});

export default function Guarantor() {
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-guarantor"],
    queryFn: () => authService.getUserGuarantor(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      occupation: "",
      workAddress: "",
      homeAddress: "",
    },
  });

  useEffect(() => {
    if (data?.guarantor) {
      form.setValue("firstName", data.guarantor.firstName);
      form.setValue("lastName", data.guarantor.lastName);
      form.setValue("email", data.guarantor.email);
      form.setValue("phoneNumber", data.guarantor.phoneNumber);
      form.setValue("occupation", data.guarantor.occupation);
      form.setValue("workAddress", data.guarantor.workAddress);
      form.setValue("homeAddress", data.guarantor.homeAddress);
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: authService.updateUserGuarantor,
    onSuccess: (data) => {
      console.log({ data });
      queryClient.invalidateQueries({ queryKey: ["user-guarantor"] });
      toast.success("Guarantor updated successfully!");
    },
    onError: (error: any) => {
      // toast.error(error.message || "Something went wrong");
      setError(error.message || "Something went wrong");
      console.log(error);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    console.log("Guarantor Data:", data);
    mutation.mutateAsync(data);
  };

  console.log({ data });

  if (isError) {
    return (
      <div className="flex flex-col gap-4 items-center justify-start py-24">
        <ServerCrash className="w-12 h-12 text-custom-primary" />
        <h2 className="text-xl">Something went wrong</h2>
        <p className="md:text-base">Please try refreshing the page</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mr-auto space-y-6 py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
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

          {/* Email Address */}
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

          {/* Phone Number */}
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

          {/* Occupation */}
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-muted-foreground font-normal">
                  Occupation
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter occupation"
                    className="rounded-full py-5 px-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Work Address */}
          <FormField
            control={form.control}
            name="workAddress"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-muted-foreground font-normal">
                  Work Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter work address"
                    className="rounded-full py-5 px-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Home Address */}
          <FormField
            control={form.control}
            name="homeAddress"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="text-muted-foreground font-normal">
                  Home Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter home address"
                    className="rounded-full py-5 px-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <CustomAlert variant="destructive" message={error} />}

          {/* Submit Button */}
          <div className="col-span-2 flex justify-end mt-4">
            <Button type="submit" className="btn-primary rounded-full px-12">
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
