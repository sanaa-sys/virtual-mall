"use client";
import emailjs from "emailjs-com";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Package, BarChart, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Footer from "@/components/Footer";
import ThankYouPopup from "@/components/ThankYouPopup";
import { useRouter } from "next/navigation";

const SellerPage = () => {
  const router = useRouter();
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    businessName: "",
    productCategory: "",
    agreeTerms: false, // State for checkbox
    socialLink: "", // Initial state for socialLink
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prevState) => ({
      ...prevState,
      agreeTerms: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      businessName: formData.businessName,
      productCategory: formData.productCategory,
      socialLink: formData.socialLink,
    };

    emailjs
      .send(
        "service_cio6onz",
        "template_579m15j",
        templateParams,
        "1oDlFZNgaaQnAhytI"
      )
      .then((response) => {
        console.log("Email sent successfully:", response);
        setShowThankYou(true);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handleClosePopup = () => {
    setShowThankYou(false);
    router.push("/home");
  };

  const benefits = [
    {
      icon: <DollarSign className="w-12 h-12 text-green-500" />,
      title: "Increase Your Revenue",
      description: "Tap into our large customer base and boost your sales.",
    },
    {
      icon: <Package className="w-12 h-12 text-blue-500" />,
      title: "Easy Inventory Management",
      description:
        "Our tools make it simple to manage your products and orders.",
    },
    {
      icon: <BarChart className="w-12 h-12 text-purple-500" />,
      title: "Insightful Analytics",
      description: "Get detailed reports and insights to grow your business.",
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-red-500" />,
      title: "Secure Transactions",
      description:
        "We ensure safe and secure transactions for you and your customers.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Become a Seller on Virtual Mall Lahore
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
            Why Sell on Virtual Mall Lahore?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <motion.h2
            className="text-2xl font-semibold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            How to Get Started
          </motion.h2>
          <motion.ol
            className="list-decimal list-inside space-y-2 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <li>Fill out the seller application form below</li>
            <li>Verify your email and complete your seller profile</li>
            <li>List your products and set up your shop</li>
            <li>Start selling and grow your business!</li>
          </motion.ol>
        </section>

        <section>
          <motion.h2
            className="text-2xl font-semibold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Seller Application
          </motion.h2>
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-4">
              <Label
                htmlFor="fullName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Full Name
              </Label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="phoneNumber"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Phone Number
              </Label>
              <Input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="socialLink"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Social Link
              </Label>
              <Input
                type="url"
                id="socialLink"
                name="socialLink"
                value={formData.socialLink}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="businessName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Business Name
              </Label>
              <Input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="productCategory"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Product Category
              </Label>
              <Input
                type="text"
                id="productCategory"
                name="productCategory"
                value={formData.productCategory}
                onChange={handleInputChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4 flex items-center">
              <Checkbox
                checked={formData.agreeTerms} // Use checked for state management
                onCheckedChange={handleCheckboxChange} // Use onCheckedChange to handle checkbox change
                id="agreeTerms"
              />
              <Label
                htmlFor="agreeTerms"
                className="ml-2 text-sm text-gray-600"
              >
                I agree to the terms and conditions
              </Label>
            </div>

            <Button
              type="submit"
              disabled={!formData.agreeTerms}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </Button>
          </motion.form>
        </section>
      </main>

      {showThankYou && (
        <ThankYouPopup
          message="Thank you for applying to become a seller on Virtual Mall Lahore!"
          onClose={handleClosePopup}
        />
      )}

      <Footer />
    </div>
  );
};

export default SellerPage;
