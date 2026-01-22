import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { contactUsService } from "@/api/contact-us.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactUs() {
  // 2. Define your form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      contactUsService.contactUs(data);
    },
    onSuccess: () => {
      toast.success("Message sent successfully!");
      form.reset();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to send message.");
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data Submitted:", data);
    mutation.mutate(data);
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information Cards (Unchanged) */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-custom-primary/10 p-3 rounded-full mb-4">
                <Mail className="text-custom-primary w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900">Email Us</h3>
              <p className="text-gray-600 text-sm mt-1">
                support@havenlease.com
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-custom-primary/10 p-3 rounded-full mb-4">
                <Phone className="text-custom-primary w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900">Call Us</h3>
              <p className="text-gray-600 text-sm mt-1">
                +234 (0) XXX XXX XXXX
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-custom-primary/10 p-3 rounded-full mb-4">
                <MapPin className="text-custom-primary w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900">Visit Us</h3>
              <p className="text-gray-600 text-sm mt-1">Lagos, Nigeria</p>
            </div>
          </div>

          {/* Contact Form using Shadcn Form Components */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Send us a Message
            </h3>

            {/* Pass the form object to the Form provider */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Subject */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="How can we help you?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your message here..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-custom-primary text-white hover:bg-custom-primary/90 flex gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* FAQ Prompt */}
        <div className="mt-12 text-center bg-white rounded-lg shadow-sm p-8 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800">
            Need a quick answer?
          </h4>
          <p className="text-gray-600 mb-4">
            Check out our frequently asked questions for immediate help.
          </p>
          <Button
            variant="outline"
            className="rounded-full border-custom-primary text-custom-primary hover:bg-custom-primary/5"
          >
            Visit FAQ Center
          </Button>
        </div>

        <section className="mt-8 text-center">
          <p className="text-gray-500 text-sm">Last Updated: January 7, 2026</p>
        </section>
      </div>
    </div>
  );
}
