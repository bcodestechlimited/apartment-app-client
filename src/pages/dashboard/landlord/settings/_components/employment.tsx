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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { CustomAlert } from "@/components/custom/custom-alert";

const formSchema = z.object({
  employmentStatus: z.enum(
    ["employed", "self-employed", "unemployed", "student", "retired"],
    { error: () => ({ message: "Select employment status" }) },
  ),
  companyName: z.string().min(2, "Company name is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  monthlyIncome: z.string().min(1, "Monthly income is required"),
  companyAddress: z.string().min(3, "Company address is required"),
});

export default function Employment() {
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["user-employment-info"],
    queryFn: () => authService.getUserEmployment(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employmentStatus: undefined,
      companyName: "",
      jobTitle: "",
      monthlyIncome: "",
      companyAddress: "",
    },
  });

  useEffect(() => {
    if (data?.employment) {
      form.setValue("employmentStatus", data?.employment?.employmentStatus);
      form.setValue("employmentStatus", data?.employment?.employmentStatus);
      form.setValue("companyName", data?.employment?.companyName);
      form.setValue("jobTitle", data?.employment?.jobTitle);
      form.setValue("monthlyIncome", data?.employment?.monthlyIncome);
      form.setValue("companyAddress", data?.employment?.companyAddress);
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: authService.updateUserEmployment,
    onSuccess: (data) => {
      console.log({ data });
      queryClient.invalidateQueries({ queryKey: ["user-employment-info"] });
      toast.success("Employment info updated successfully!");
    },
    onError: (error: any) => {
      // toast.error(error.message || "Something went wrong");
      setError(error.message || "Something went wrong");
      console.log(error);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    console.log("Employment Data:", data);
    mutation.mutateAsync(data);
  };

  return (
    <div className="w-6/7  space-y-6 py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" md:grid-cols-2 gap-8 space-y-6"
        >
          {/* Employment Status */}
          <FormField
            control={form.control}
            name="employmentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground font-normal">
                  Employment Status
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-full py-5 px-5 w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="self-employed">Self-employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground font-normal">
                  Company Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter company name"
                    className="rounded-full py-5 px-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Title */}
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground font-normal">
                  Job Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter job title"
                    className="rounded-full py-5 px-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Monthly Income */}
          <FormField
            control={form.control}
            name="monthlyIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground font-normal">
                  Monthly Income
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString() ?? ""} // ensure it’s a string
                >
                  <FormControl>
                    <SelectTrigger className="rounded-full py-5 px-5 w-full">
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="50000-99999">
                      ₦50,000 - ₦99,999
                    </SelectItem>
                    <SelectItem value="100000-199999">
                      ₦100,000 - ₦199,999
                    </SelectItem>
                    <SelectItem value="200000-499999">
                      ₦200,000 - ₦499,999
                    </SelectItem>
                    <SelectItem value="500000-999999">
                      ₦500,000 - ₦999,999
                    </SelectItem>
                    <SelectItem value="1000000">
                      ₦1,000,000 and above
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Address */}
          <FormField
            control={form.control}
            name="companyAddress"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="text-muted-foreground font-normal">
                  Company Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter company address"
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
          <div className="col-span-2 flex flex-col md:flex-row justify-end mt-4">
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
