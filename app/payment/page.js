'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import emailjs from 'emailjs-com';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '../lib/stripe';

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
import { CardPaymentForm } from "./CardPaymentForm";
import { AffirmationModal } from "@/components/ui/confirmation-modal";
import { EmailConfirmationModal } from "@/components/ui/email_confirmation";
import { useAppContext } from "../../context/AppContext";

export default function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [showAffirmation, setShowAffirmation] = useState(false);
    const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const router = useRouter();
    const { userEmail } = useAppContext();

    useEffect(() => {
        if (paymentMethod === "card") {
            fetch('/api/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 10499 }), // Amount in cents
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Client Secret received:", data.clientSecret); // Add this line
                    setClientSecret(data.clientSecret);
                });
        }
    }, [paymentMethod]);

    const sendOrderConfirmationEmail = (emailParams) => {
        // Customer email
        emailjs.send(
            'service_cio6onz',
            'template_for_owner',
            emailParams,
            '1oDlFZNgaaQnAhytI'
        ).then((result) => {
            console.log('Customer email sent successfully:', result);
        }).catch((error) => {
            console.error('Error sending customer email:', error);
        });

        // Owner email
        const ownerEmailParams = {
            owner_email: "afsbibi@gmail.com",
            order_id: emailParams.order_id,
            total_amount: emailParams.total_amount,
            payment_method: emailParams.payment_method
        };

        emailjs.send(
            'service_cio6onz',
            'template_t5k24tp',
            ownerEmailParams,
            '1oDlFZNgaaQnAhytI'
        ).then((result) => {
            console.log('Owner email sent successfully:', result);
        }).catch((error) => {
            console.error('Error sending owner email:', error);
            console.error('Error details:', JSON.stringify(error));
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Payment method selected:", paymentMethod); // Add this line
        if (paymentMethod === "card") {
            setShowEmailConfirmation(true);
        } else {
            processPayment(userEmail);
        }
    };

    const processPayment = async (confirmedEmail) => {
        setIsProcessing(true);
        const orderId = uuidv4();

        const emailParams = {
            customer_email: confirmedEmail,
            order_id: orderId,
            total_amount: "$104.99",
            payment_method: paymentMethod === "card" ? "Credit/Debit Card" : "Cash on Delivery",
        };

        console.log("Email Params in processPayment:", emailParams);

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

    const handlePaymentSuccess = () => {
        processPayment(userEmail);
    };

    const handlePaymentError = (errorMessage) => {
        console.error('Payment error:', errorMessage);
        // Handle payment error (e.g., show error message to user)
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

                        {paymentMethod === "card" && (
                            clientSecret ? (
                                <Elements stripe={getStripe()} options={{ clientSecret }}>
                                    <CardPaymentForm
                                        onPaymentSuccess={handlePaymentSuccess}
                                        onPaymentError={handlePaymentError}
                                    />
                                </Elements>
                            ) : (
                                <div>Loading payment form...</div>
                            )
                        )}

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
                    {paymentMethod === "cod" && (
                        <Button
                            className="w-full"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isProcessing}
                        >
                            Place Order
                        </Button>
                    )}
                </CardFooter>
            </Card>
            <AffirmationModal
                isOpen={showAffirmation}
                onClose={handleCloseAffirmation}
            />
            <EmailConfirmationModal
                isOpen={showEmailConfirmation}
                onClose={() => setShowEmailConfirmation(false)}
                onConfirm={handleEmailConfirmation}
            />
        </div>
    );
}

