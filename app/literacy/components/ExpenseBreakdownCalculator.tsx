'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Expense = {
    category: string;
    amount: number;
}

export default function ExpenseBreakdownCalculator() {
    const [income, setIncome] = useState('')
    const [expenses, setExpenses] = useState<Expense[]>([
        { category: 'Housing', amount: 0 },
        { category: 'Transportation', amount: 0 },
        { category: 'Food', amount: 0 },
        { category: 'Utilities', amount: 0 },
        { category: 'Insurance', amount: 0 },
        { category: 'Other', amount: 0 },
    ])
    const [breakdown, setBreakdown] = useState<{ category: string; percentage: number }[]>([])

    const handleExpenseChange = (index: number, amount: string) => {
        const newExpenses = [...expenses]
        newExpenses[index].amount = parseFloat(amount) || 0
        setExpenses(newExpenses)
    }

    const calculateBreakdown = (e: React.FormEvent) => {
        e.preventDefault()
        const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
        const incomeValue = parseFloat(income) || 0

        const newBreakdown = expenses.map(expense => ({
            category: expense.category,
            percentage: (expense.amount / incomeValue) * 100
        }))

        setBreakdown(newBreakdown)
    }

    return (
        <form onSubmit={calculateBreakdown} className="space-y-4">
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
            {expenses.map((expense, index) => (
                <div key={expense.category}>
                    <Label htmlFor={`expense-${index}`}>{expense.category} ($)</Label>
                    <Input
                        id={`expense-${index}`}
                        type="number"
                        value={expense.amount}
                        onChange={(e) => handleExpenseChange(index, e.target.value)}
                    />
                </div>
            ))}
            <Button type="submit">Calculate Breakdown</Button>
            {breakdown.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-2">Expense Breakdown:</h4>
                    {breakdown.map((item) => (
                        <p key={item.category}>
                            {item.category}: {item.percentage.toFixed(2)}% of income
                        </p>
                    ))}
                </div>
            )}
        </form>
    )
}

