'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreditCardCalculator() {
    const [balance, setBalance] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [monthlyPayment, setMonthlyPayment] = useState('')
    const [result, setResult] = useState<{ months: number, totalInterest: number } | null>(null)

    const calculatePayoff = (e: React.FormEvent) => {
        e.preventDefault()
        const b = parseFloat(balance)
        const r = parseFloat(interestRate) / 100 / 12
        const p = parseFloat(monthlyPayment)

        let currentBalance = b
        let months = 0
        let totalInterest = 0

        while (currentBalance > 0) {
            const interest = currentBalance * r
            totalInterest += interest
            currentBalance += interest - p
            months++

            if (months > 600) {  // Safeguard against infinite loops
                setResult({ months: -1, totalInterest: -1 })
                return
            }
        }

        setResult({ months, totalInterest })
    }

    return (
        <form onSubmit={calculatePayoff} className="space-y-4">
            <div>
                <Label htmlFor="balance">Current Balance ($)</Label>
                <Input
                    id="balance"
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="monthlyPayment">Monthly Payment ($)</Label>
                <Input
                    id="monthlyPayment"
                    type="number"
                    value={monthlyPayment}
                    onChange={(e) => setMonthlyPayment(e.target.value)}
                    required
                />
            </div>
            <Button type="submit">Calculate</Button>
            {result && result.months > 0 && (
                <div className="mt-4 space-y-2">
                    <p className="text-lg">
                        It will take <strong>{result.months} months</strong> to pay off your credit card balance.
                    </p>
                    <p className="text-lg">
                        You will pay a total of <strong>${result.totalInterest.toFixed(2)}</strong> in interest.
                    </p>
                </div>
            )}
            {result && result.months === -1 && (
                <p className="mt-4 text-lg text-red-600">
                    With the current payment, you will not be able to pay off the balance. Please increase your monthly payment.
                </p>
            )}
        </form>
    )
}

