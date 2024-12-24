'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

type Reward = {
    name: string;
    description: string;
    pointsRequired: number;
}

const rewards: Reward[] = [
    { name: 'Bronze', description: '5% discount on next purchase', pointsRequired: 100 },
    { name: 'Silver', description: '10% discount on next purchase', pointsRequired: 250 },
    { name: 'Gold', description: '15% discount on next purchase', pointsRequired: 500 },
    { name: 'Platinum', description: '20% discount on next purchase', pointsRequired: 1000 },
]

export default function LoyaltySystem() {
    const [points, setPoints] = useState(() => {
        if (typeof window !== 'undefined') {
            return parseInt(localStorage.getItem('loyaltyPoints') || '0', 10)
        }
        return 0
    })
    const [currentLevel, setCurrentLevel] = useState('')

    // Define getLoyaltyLevel function before using it
    const getLoyaltyLevel = (points: number) => {
        if (points >= 1000) return 'Platinum';
        if (points >= 500) return 'Gold';
        if (points >= 250) return 'Silver';
        if (points >= 100) return 'Bronze';
        return 'None';
    }

    useEffect(() => {
        localStorage.setItem('loyaltyPoints', points.toString())
        setCurrentLevel(getLoyaltyLevel(points)) // Call getLoyaltyLevel here after defining it
    }, [points])

    const earnPoints = (amount: number) => {
        setPoints(prevPoints => prevPoints + amount)
    }

    const getNextReward = () => {
        return rewards.find(reward => reward.pointsRequired > points) || rewards[rewards.length - 1]
    }

    const getProgressToNextLevel = () => {
        const nextReward = getNextReward()
        const prevReward = rewards[rewards.indexOf(nextReward) - 1]
        const basePoints = prevReward ? prevReward.pointsRequired : 0
        const progressPoints = points - basePoints
        const totalPointsNeeded = nextReward.pointsRequired - basePoints
        return (progressPoints / totalPointsNeeded) * 100
    }

    return (
        <div className="space-y-6">
            <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Your Financial Literacy Rewards</h3>
                <p className="text-lg mb-2">Current Points: <span className="font-bold">{points}</span></p>
                <p className="text-lg mb-4">Current Level: <Badge variant="outline">{currentLevel || 'None'}</Badge></p>
                <Progress value={getProgressToNextLevel()} className="mb-2" />
                <p className="text-sm text-gray-600">Progress to next level: {getNextReward().name}</p>
            </div>

            <div className="space-y-4">
                <h4 className="text-xl font-semibold">Earn Points</h4>
                <div className="flex flex-wrap gap-4">
                    <Button onClick={() => earnPoints(10)}>Read an Article (+10 points)</Button>
                    <Button onClick={() => earnPoints(20)}>Use a Calculator (+20 points)</Button>
                    <Button onClick={() => earnPoints(50)}>Set a Monthly Budget (+50 points)</Button>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-xl font-semibold">Rewards</h4>
                <div className="grid gap-4 md:grid-cols-2">
                    {rewards.map((reward) => (
                        <div key={reward.name} className="border p-4 rounded-lg">
                            <h5 className="text-lg font-semibold">{reward.name}</h5>
                            <p>{reward.description}</p>
                            <p className="text-sm text-gray-600">{reward.pointsRequired} points required</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
