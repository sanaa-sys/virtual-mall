"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We offer a wide range of services including web design, development, SEO optimization, and digital marketing solutions. Our team specializes in creating custom websites tailored to your specific business needs.",
  },
  {
    question: "How long does it take to complete a project?",
    answer:
      "Project timelines can vary depending on the scope and complexity of the work. Typically, a standard website can take 4-8 weeks from concept to launch. We'll provide you with a more accurate timeline during our initial consultation.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer:
      "Yes, we offer various support and maintenance packages to ensure your website remains up-to-date and secure. Our team can handle regular updates, security patches, and content changes as needed.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "Our pricing is project-based and depends on your specific requirements. We offer competitive rates and will provide a detailed quote after understanding your project needs. Contact us for a free consultation and estimate.",
  },
  {
    question: "Can you help with e-commerce websites?",
    answer:
      "We have extensive experience in building e-commerce websites using platforms like Shopify, WooCommerce, and custom solutions. We can help you set up your online store, integrate payment gateways, and optimize for conversions.",
  },
  {
    question: "Do you provide hosting services?",
    answer:
      "While we don't provide hosting services directly, we can recommend reliable hosting providers and assist with the setup and deployment of your website. We ensure that your site is optimized for performance on your chosen hosting platform.",
  },
];

const FAQItem = ({ faq, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium">{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600" role="region">
          {faq.answer}
        </div>
      )}
    </div>
  );
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h1>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            toggleOpen={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </div>
  );
}
