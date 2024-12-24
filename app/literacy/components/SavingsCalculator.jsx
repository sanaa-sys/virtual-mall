'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SavingsCalculator() {
    const [goal, setGoal] = useState('')
    const [initialSavings, setInitialSavings] = useState('')
    const [monthlyContribution, setMonthlyContribution] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [result, setResult] = useState(null)

    const calculateSavings = (e) => {
        e.preventDefault()
        const P = parseFloat(initialSavings)
        const PMT = parseFloat(monthlyContribution)
        const r = parseFloat(interestRate) / 100 / 12
        const t = Math.ceil((parseFloat(goal) - P) / (PMT + P * r))

        const futureValue = P * Math.pow(1 + r, t) + PMT * ((Math.pow(1 + r, t) - 1) / r)
        setResult(t)
    }

    return (
        <form onSubmit={calculateSavings} className="space-y-4">
            <div>
                <Label htmlFor="goal">Savings Goal ($)</Label>
                <Input
                    id="goal"
                    type="number"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="initialSavings">Initial Savings ($)</Label>
                <Input
                    id="initialSavings"
                    type="number"
                    value={initialSavings}
                    onChange={(e) => setInitialSavings(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
                <Input
                    id="monthlyContribution"
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
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
            <Button type="submit">Calculate</Button>
            {result !== null && (
                <p className="mt-4 text-lg">
                    It will take approximately <strong>{result} months</strong> to reach your savings goal.
                </p>
            )}
        </form>
    )
}

