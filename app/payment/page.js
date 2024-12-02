"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';  // Import UUID library
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
import { useAppContext } from "../../context/AppContext";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAffirmation, setShowAffirmation] = useState(false);
  const router = useRouter();
  const { userEmail } = useAppContext();

  // Function to send order confirmation email
  const sendOrderConfirmationEmail = (emailParams) => {
    emailjs.send(
      'service_cio6onz',  // Replace with your EmailJS service ID
      'template_t5k24tp', // Replace with your EmailJS template ID
      emailParams,        // Parameters to fill in the template
      '1oDlFZNgaaQnAhytI'      // Replace with your EmailJS user ID
    ).then((result) => {
      console.log('Email sent successfully:', result);
    }).catch((error) => {
      console.error('Error sending email:', error);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    // Generate a unique order ID
    const orderId = uuidv4();  // This will generate a unique ID for each order

    if (paymentMethod === "card") {
      alert("Payment confirmed");

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Prepare email data with the dynamic order ID
      const emailParams = {
        customer_email: userEmail, // Email of the user
        order_id: orderId, // Unique order ID
        total_amount: "$104.99", // Example total amount
        payment_method: "Credit/Debit Card",
      };

      // Send confirmation email
      sendOrderConfirmationEmail(emailParams);

      // Redirect to confirmation page
      router.push("/home");
    } else {
      // Cash on Delivery, show affirmation modal
      setShowAffirmation(true);

      // Prepare email data for COD
      const emailParams = {
        customer_email: userEmail,
        order_id: orderId, // Unique order ID
        total_amount: "$104.99",
        payment_method: "Cash on Delivery",
      };

      // Send confirmation email for COD
      sendOrderConfirmationEmail(emailParams);
    }

    setIsProcessing(false);
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
    </div>
  );
}
