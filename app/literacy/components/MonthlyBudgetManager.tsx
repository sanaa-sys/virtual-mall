'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

type BudgetCategory = {
    name: string;
    amount: number;
    spent: number;
}

export default function MonthlyBudgetManager() {
    const [categories, setCategories] = useState<BudgetCategory[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('budgetCategories')
            return saved ? JSON.parse(saved) : []
        }
        return []
    })
    const [newCategory, setNewCategory] = useState('')
    const [newAmount, setNewAmount] = useState('')
    const [totalBudget, setTotalBudget] = useState(0)
    const [totalSpent, setTotalSpent] = useState(0)

    useEffect(() => {
        localStorage.setItem('budgetCategories', JSON.stringify(categories))
        const total = categories.reduce((sum, category) => sum + category.amount, 0)
        const spent = categories.reduce((sum, category) => sum + category.spent, 0)
        setTotalBudget(total)
        setTotalSpent(spent)
    }, [categories])

    const addCategory = () => {
        if (newCategory && newAmount) {
            setCategories([...categories, { name: newCategory, amount: parseFloat(newAmount), spent: 0 }])
            setNewCategory('')
            setNewAmount('')
        }
    }

    const updateSpent = (index: number, spent: number) => {
        const updatedCategories = [...categories]
        updatedCategories[index].spent = spent
        setCategories(updatedCategories)
    }

    const deleteCategory = (index: number) => {
        const updatedCategories = categories.filter((_, i) => i !== index)
        setCategories(updatedCategories)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
                <div className="flex-1">
                    <Label htmlFor="newCategory">Category</Label>
                    <Input
                        id="newCategory"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="e.g., Groceries"
                    />
                </div>
                <div className="flex-1">
                    <Label htmlFor="newAmount">Budget Amount</Label>
                    <Input
                        id="newAmount"
                        type="number"
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                        placeholder="e.g., 300"
                    />
                </div>
                <div className="flex items-end">
                    <Button onClick={addCategory}>Add Category</Button>
                </div>
            </div>

            <div className="space-y-4">
                {categories.map((category, index) => (
                    <div key={index} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold">{category.name}</h3>
                            <Button variant="destructive" size="sm" onClick={() => deleteCategory(index)}>Delete</Button>
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                            <span>Budget: ${category.amount}</span>
                            <span>Spent: ${category.spent}</span>
                        </div>
                        <Progress value={(category.spent / category.amount) * 100} className="mb-2" />
                        <div className="flex items-center gap-2">
                            <Label htmlFor={`spent-${index}`}>Update Spent:</Label>
                            <Input
                                id={`spent-${index}`}
                                type="number"
                                value={category.spent}
                                onChange={(e) => updateSpent(index, parseFloat(e.target.value))}
                                className="max-w-[100px]"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t pt-4">
                <h2 className="text-xl font-bold mb-2">Overall Budget Summary</h2>
                <p>Total Budget: ${totalBudget}</p>
                <p>Total Spent: ${totalSpent}</p>
                <Progress value={(totalSpent / totalBudget) * 100} className="mt-2" />
            </div>
        </div>
    )
}

