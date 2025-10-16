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

const formSchema = z.object({
  employmentStatus: z.enum(
    ["employed", "self-employed", "unemployed", "student", "retired"],
    { error: () => ({ message: "Select employment status" }) }
  ),
  companyName: z.string().min(2, "Company name is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  monthlyIncome: z
    .string()
    .min(1, "Monthly income is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Enter a valid number",
    }),
  companyAddress: z.string().min(3, "Company address is required"),
});

export default function Employment() {
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Employment Data:", data);
  };

  return (
    <div className="max-w-2xl mr-auto space-y-6 py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
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
                  defaultValue={field.value}
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
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter monthly income"
                    className="rounded-full py-5 px-5"
                    {...field}
                  />
                </FormControl>
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

          {/* Submit Button */}
          <div className="col-span-2 flex justify-end mt-4">
            <Button type="submit" className="btn-primary rounded-full px-12">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
