"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CardPaymentForm } from './card-payment-form'

// Replace with your Stripe publishable key


export default function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState('card')
    const [isProcessing, setIsProcessing] = useState(false)
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsProcessing(true)
        alert("Payment confirmed");
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000))
       
        // Redirect to confirmation page
        router.push('/home')
    }

    return (
        <div className="container mx-auto py-10">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Payment</CardTitle>
                    <CardDescription>Choose your payment method and complete your purchase.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <RadioGroup
                            defaultValue="card"
                            onValueChange={(value) => setPaymentMethod(value)}
                            className="mb-6"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card">Credit/Debit Card</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cod" id="cod" />
                                <Label htmlFor="cod">Cash on Delivery</Label>
                            </div>
                        </RadioGroup>

                        {paymentMethod === 'card' && (
                        
                                <CardPaymentForm />
                   
                        )}

                        {paymentMethod === 'cod' && (
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
                    <Button className="w-full" type="submit" disabled={isProcessing}>
                        {isProcessing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            `Pay ${paymentMethod === 'card' ? 'Now' : 'on Delivery'}`
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

