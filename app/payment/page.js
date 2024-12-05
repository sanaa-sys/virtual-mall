"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import emailjs from 'emailjs-com';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CardPaymentForm } from "./card-payment-form";
import { AffirmationModal } from "@/components/ui/confirmation-modal";
import { EmailConfirmationModal } from "@/components/ui/email_confirmation";
import { useAppContext } from "../../context/AppContext";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAffirmation, setShowAffirmation] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const router = useRouter();
  const { userEmail } = useAppContext();

  const sendOrderConfirmationEmail = (emailParams) => {
    // Customer email
    emailjs.send(
      'service_cio6onz', // Your EmailJS service ID
      'template_for_owner', // Customer template ID
      emailParams,
      '1oDlFZNgaaQnAhytI' // Your EmailJS public key
    ).then((result) => {
      console.log('Customer email sent successfully:', result);
    }).catch((error) => {
      console.error('Error sending customer email:', error);
    });

    // Owner email
    const ownerEmailParams = {
      owner_email: "afsbibi@gmail.com", // Replace with the owner’s email
      //customer_email: emailParams.customer_email,
      order_id: emailParams.order_id,
      total_amount: emailParams.total_amount,
      payment_method: emailParams.payment_method
    };

    emailjs.send(
      'service_cio6onz', // Your EmailJS service ID
      'template_t5k24tp', // New template for owner
      ownerEmailParams,
      '1oDlFZNgaaQnAhytI' // Your EmailJS public key
    ).then((result) => {
      console.log('Owner email sent successfully:', result);
    }).catch((error) => {
      console.error('Error sending owner email:', error);
      console.error('Error details:', JSON.stringify(error)); // Log the error details
    });
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Show email confirmation modal if payment method is card
    if (paymentMethod === "card") {
      setShowEmailConfirmation(true); // Show modal here
    } else {
      processPayment(userEmail); // Process payment for COD
    }
  };

  const processPayment = async (confirmedEmail) => {
    setIsProcessing(true);
    const orderId = uuidv4();
  
    if (paymentMethod === "card") {
      alert("Payment confirmed");
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate processing time
    }
  
    const emailParams = {
      customer_email: confirmedEmail, // Ensure the correct customer email is passed here
      order_id: orderId,
      total_amount: "$104.99",
      payment_method: paymentMethod === "card" ? "Credit/Debit Card" : "Cash on Delivery",
    };
  
    console.log("Email Params in processPayment:", emailParams); // Log emailParams for debugging
  
    // Send emails to both customer and owner
    sendOrderConfirmationEmail(emailParams);
  
    if (paymentMethod === "cod") {
      setShowAffirmation(true);
    } else {
      router.push("/home");
    }
  
    setIsProcessing(false);
  };
  

  const handleEmailConfirmation = (confirmedEmail) => {
    setShowEmailConfirmation(false);
    processPayment(confirmedEmail);
  };

  const handleCloseAffirmation = () => {
    setShowAffirmation(false);
    router.push("/home");
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Payment</CardTitle>
          <CardDescription>
            Choose your payment method and complete your purchase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Label htmlFor="card">Credit/Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Label htmlFor="cod">Cash on Delivery</Label>
              </div>
            </div>

            {paymentMethod === "card" && <CardPaymentForm />}

            {paymentMethod === "cod" && (
              <p className="text-sm text-gray-500 mb-6">
                You will pay for your order when it is delivered to you.
              </p>
            )}

            <Separator className="my-6" />

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$99.99</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>$104.99</span>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            type="submit"
            onClick={handleSubmit}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : paymentMethod === "card" ? (
              "Pay Now"
            ) : (
              "Place Order"
            )}
          </Button>
        </CardFooter>
      </Card>
      <AffirmationModal
        isOpen={showAffirmation}
        onClose={handleCloseAffirmation}
      />
      <EmailConfirmationModal
        isOpen={showEmailConfirmation}
        onClose={() => setShowEmailConfirmation(false)}
        onConfirm={handleEmailConfirmation} // Confirm email input
      />
    </div>
  );
}
