import { Suspense } from 'react';
import PaymentPageClient from './PaymentPageClient';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto py-10">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Loading Payment Details...</CardTitle>
                        <CardDescription>Please wait while we prepare your payment information.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        }>
            <PaymentPageClient />
        </Suspense>
    );
}

