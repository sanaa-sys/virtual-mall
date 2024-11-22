import { useState } from 'react'


import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function CardPaymentForm() {

    const [error, setError] = useState(null)

    const handleChange = (event) => {
        if (event.error) {
            setError(event.error.message)
        } else {
            setError(null)
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name on Card</Label>
                <Input id="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="card-element">Credit or debit card</Label>
                <div className="border rounded-md p-3">
                    <CardElement onChange={handleChange} />
                </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
    )
}

