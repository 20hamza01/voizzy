
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Voizzy help improve my conversion rates?",
    answer: "Voizzy helps you collect and display authentic testimonials from real customers, which builds trust with potential clients. Studies show that websites featuring customer testimonials see conversion rate improvements of 34% on average."
  },
  {
    question: "Can I customize the testimonial collection forms?",
    answer: "Absolutely! Voizzy allows you to fully customize your testimonial forms with your brand colors, logo, and preferred question format. You can collect text, audio, or video testimonials based on your needs."
  },
  {
    question: "How do I embed testimonials on my website?",
    answer: "Voizzy makes it easy to embed your testimonials with just a few clicks. Simply generate an embed code from your dashboard and paste it onto your website. You can also use our WordPress plugin or integrate with popular website builders."
  },
  {
    question: "Is there a limit to how many testimonials I can collect?",
    answer: "Our Free plan allows you to collect up to 10 testimonials per month. For unlimited testimonial collection and additional features, check out our Pro and Business plans."
  },
  {
    question: "Do I need technical knowledge to use Voizzy?",
    answer: "Not at all! Voizzy is designed to be user-friendly for everyone, regardless of technical expertise. Our intuitive interface makes it easy to create forms, collect testimonials, and display them on your website."
  }
];

const FAQ = () => {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">FAQ</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently asked questions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Get answers to common questions about how Voizzy can help your business collect and showcase powerful testimonials.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-gray-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
