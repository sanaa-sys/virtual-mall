'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import emailjs from 'emailjs-com';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '../lib/stripe';
import NavBar from "@/components/ui/navbar";
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

const loyaltyDiscounts = {
    'Bronze': 0.05,   // 5% discount
    'Silver': 0.10,   // 10% discount
    'Gold': 0.15,     // 15% discount
    'Platinum': 0.20, // 20% discount
};

export default function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [showAffirmation, setShowAffirmation] = useState(false);
    const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [installmentPlan, setInstallmentPlan] = useState(null);
    const [loyaltyLevel, setLoyaltyLevel] = useState(''); // New state to store loyalty level
    const [discount, setDiscount] = useState(0); // New state for discount

    const router = useRouter();
    const searchParams = useSearchParams();
    const { userEmail } = useAppContext();

    useEffect(() => {
        const installmentQuery = searchParams.get("installment");
        if (installmentQuery) {
            setInstallmentPlan(installmentQuery);
        }

        // Fetch loyalty points and calculate the discount
        const points = parseInt(localStorage.getItem('loyaltyPoints') || '0', 10);
        let level = '';
        if (points >= 1000) level = 'Platinum';
        else if (points >= 500) level = 'Gold';
        else if (points >= 250) level = 'Silver';
        else if (points >= 100) level = 'Bronze';

        setLoyaltyLevel(level);
        setDiscount(loyaltyDiscounts[level] || 0); // Set the discount based on loyalty level

        if (paymentMethod === "card") {
            fetch('/api/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: installmentQuery ? 3499 : 10499 }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setClientSecret(data.clientSecret);
                });
        }
    }, [paymentMethod, searchParams]);

    const calculateTotal = () => {
        const baseAmount = installmentPlan ? 3499 : 10499; // Amount in cents
        const discountAmount = baseAmount * discount;
        return (baseAmount - discountAmount + 500) / 100; // Including $5 shipping, converting from cents to dollars
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
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
            total_amount: `$${calculateTotal()}`, // Adjust total amount with discount
            payment_method: paymentMethod === "card" ? "Credit/Debit Card" : "Cash on Delivery",
        };

        sendOrderConfirmationEmail(emailParams);

        if (paymentMethod === "cod") {
            setShowAffirmation(true);
        } else {
            router.push("/home");
        }

        setIsProcessing(false);
    };

    const sendOrderConfirmationEmail = (emailParams) => {
        // emailjs.send(
        //     'service_cio6onz',
        //     'template_for_owner',
        //     emailParams,
        //     '1oDlFZNgaaQnAhytI'
        // ).then((result) => {
        //     console.log('Customer email sent successfully:', result);
        // }).catch((error) => {
        //     console.error('Error sending customer email:', error);
        // });

        const ownerEmailParams = {
            owner_email: "afsbibi@gmail.com",
            order_id: emailParams.order_id,
            total_amount: emailParams.total_amount,
            payment_method: emailParams.payment_method,
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
        });
    };

    const handlePaymentSuccess = () => {
        processPayment(userEmail);
    };

    const handlePaymentError = (errorMessage) => {
        console.error('Payment error:', errorMessage);
    };

    return (

        <div className="container mx-auto py-10">
            <NavBar />
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Payment</CardTitle>
                    <CardDescription>
                        {installmentPlan ? `You have selected a ${installmentPlan}-month installment plan. You will only be charged for the first installment.` : 'Choose your payment method and complete your purchase.'}
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

                        {paymentMethod === "card" && clientSecret && (
                            <Elements stripe={getStripe()} options={{ clientSecret }}>
                                <CardPaymentForm
                                    onPaymentSuccess={handlePaymentSuccess}
                                    onPaymentError={handlePaymentError}
                                />
                            </Elements>
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
                                <span>{installmentPlan ? "$34.99" : "$99.99"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>$5.00</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                                <span>Discount</span>
                                <span>- ${discount * 100}%</span> {/* Display the discount */}
                            </div>
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>${calculateTotal()}</span> {/* Adjusted total with discount */}
                            </div>
                        </div>

                        <Button type="submit" disabled={isProcessing} className="mt-4">
                            {isProcessing ? "Processing..." : "Place Order"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter></CardFooter>
            </Card>

            {showAffirmation && (
                <AffirmationModal
                    onClose={() => setShowAffirmation(false)}
                    onConfirm={() => router.push("/home")}
                />
            )}

            {showEmailConfirmation && (
                <EmailConfirmationModal
                    onClose={() => setShowEmailConfirmation(false)}
                    onConfirm={(confirmedEmail) => processPayment(confirmedEmail)}
                />
            )}
        </div>
    );
}
