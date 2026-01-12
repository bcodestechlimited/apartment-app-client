import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactUs() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission logic
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
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

          {/* Contact Form */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Input placeholder="John Doe" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Subject
                </label>
                <Input
                  placeholder="How can we help you?"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea
                  placeholder="Type your message here..."
                  className="min-h-[150px] border-gray-300"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-custom-primary text-white hover:bg-custom-primary/90 flex gap-2"
              >
                <Send size={18} />
                Send Message
              </Button>
            </form>
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
