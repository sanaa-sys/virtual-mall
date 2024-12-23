'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ShoppingBudgetCalculator() {
    const [income, setIncome] = useState('')
    const [savingsPercentage, setSavingsPercentage] = useState('')
    const [essentialExpenses, setEssentialExpenses] = useState('')
    const [result, setResult] = useState<number | null>(null)

    const calculateShoppingBudget = (e: React.FormEvent) => {
        e.preventDefault()
        const incomeValue = parseFloat(income) || 0
        const savingsValue = (parseFloat(savingsPercentage) || 0) / 100
        const expensesValue = parseFloat(essentialExpenses) || 0

        const availableBudget = incomeValue - (incomeValue * savingsValue) - expensesValue
        setResult(Math.max(availableBudget, 0))
    }

    return (
        <form onSubmit={calculateShoppingBudget} className="space-y-4">
            <div>
                <Label htmlFor="income">Monthly Income ($)</Label>
                <Input
                    id="income"
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="savings">Savings Percentage (%)</Label>
                <Input
                    id="savings"
                    type="number"
                    min="0"
                    max="100"
                    value={savingsPercentage}
                    onChange={(e) => setSavingsPercentage(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="expenses">Essential Monthly Expenses ($)</Label>
                <Input
                    id="expenses"
                    type="number"
                    value={essentialExpenses}
                    onChange={(e) => setEssentialExpenses(e.target.value)}
                    required
                />
            </div>
            <Button type="submit">Calculate Shopping Budget</Button>
            {result !== null && (
                <p className="mt-4 text-lg">
                    Your available shopping budget is: <strong>${result.toFixed(2)}</strong>
                </p>
            )}
        </form>
    )
}

