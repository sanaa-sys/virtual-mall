"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Truck,
  Headphones,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import NavBar from "@/components/ui/navbar";
import Footer from "@/components/Footer";

const AboutUs = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const features = [
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Wide Selection",
      description: "Thousands of products at your fingertips",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Get your items delivered in record time",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Our team is always here to help you",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community",
      description: "Join our vibrant community of shoppers",
    },
  ];

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. Follow the prompts to enter your shipping and payment information.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and Apple Pay. We ensure secure transactions for all payment methods.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email. You can use this number on our website or the carrier's website to track your package.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Please check our Returns page for more detailed information and instructions on how to initiate a return.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <NavBar />
      <header className="bg-gradient-to-r from-blue-200 to-purple-300 shadow-md">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800">
            About Virtual Store
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <section className="mb-12">
          <motion.h2
            className="text-2xl font-semibold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Story
          </motion.h2>
          <motion.p
            className="text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Founded in 2020, Virtual Store has rapidly become one of the most
            trusted e-commerce platforms in the region. We aim to provide a
            seamless and convenient shopping experience, connecting buyers with
            sellers across various categories. Our goal is to offer a wide
            variety of quality products at competitive prices, all while
            maintaining excellent customer service and fast delivery times.
          </motion.p>
        </section>

        <section className="mb-12">
          <motion.h2
            className="text-2xl font-semibold text-gray-800 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-blue-500 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <motion.h2
            className="text-2xl font-semibold text-gray-800 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="flex justify-between items-center w-full p-4 text-left"
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                >
                  <span className="font-medium text-gray-800">
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="p-4 bg-gray-50">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <motion.h2
            className="text-2xl font-semibold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We'd love to hear from you! If you have any questions, suggestions,
            or just want to say hello, don't hesitate to reach out.
          </motion.p>
          <Link href="/contact">
            <motion.button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
