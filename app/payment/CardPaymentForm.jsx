'use client'

import { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

export function CardPaymentForm({ onPaymentSuccess, onPaymentError }) {
    console.log("CardPaymentForm rendering"); // Add this line
    console.log("CardPaymentForm props:", { onPaymentSuccess, onPaymentError });
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState();
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        console.log("Stripe available:", !!stripe);
        console.log("Elements available:", !!elements);
        if (stripe && elements) {
            console.log("Both Stripe and Elements are available");
        }
    }, [stripe, elements]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message);
            onPaymentError(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            onPaymentSuccess();
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            <Button disabled={!stripe || isProcessing} className="w-full">
                {isProcessing ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    'Pay Now'
                )}
            </Button>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </form>
    );
}

