'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the form data to your server or a third-party service
        console.log('Form submitted:', { name, email, message })
        // Simulating form submission
        await new Promise(resolve => setTimeout(resolve, 1000))
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Thank you for your message!</h3>
                <p>We'll get back to you as soon as possible.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
            </div>
            <Button type="submit">Send Message</Button>
        </form>
    )
}

