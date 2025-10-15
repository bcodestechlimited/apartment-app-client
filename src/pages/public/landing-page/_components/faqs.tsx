import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQs() {
  const faqs = [
    {
      id: "faq-1",
      question: "How is HavenLease diffeent from other proptech platforms?",
      answer:
        "We offer a 14-day money-back guarantee on all subscriptions. If you're not satisfied, contact support and we'll walk you through the refund process.",
    },
    {
      id: "faq-2",
      question: "Are the properties verified?",
      answer:
        "Yes. Every property listed on HavenLease goes through a verification process by our trained associates. We ensure the listings are real, available, and fairly priced.",
    },
    {
      id: "faq-3",
      question: "What happens if there are issues with a landlord or tenant?",
      answer:
        "Yes — you can change plans at any time from the Billing page. Upgrades take effect immediately; downgrades will take effect at the end of your current billing cycle.",
    },
    {
      id: "faq-4",
      question: "How does shared spaces work?",
      answer:
        "Visit our Help Center or contact support via the in-app chat. We aim to respond within 24 hours on business days.",
    },
  ];

  return (
    <div className="bg-custom-primary">
      <div className="max-w-custom text-white flex flex-col gap-4 py-14 px-4">
        <h2 className="text-2xl">Frequently Asked Questions</h2>
        <p className="text-xs">
          Everything you need to know, all in one place - so renting and hosting
          stays simple
        </p>
        <div className="mt-4">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-white text-custom-primary px-4 rounded-sm"
              >
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-left text-custom-grey font-medium text-xs">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
