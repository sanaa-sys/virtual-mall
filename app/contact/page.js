/**
 * v0 by Vercel.
 * @see https://v0.dev/t/iS17ApSKyrO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
    return (
        <div className="container mx-auto max-w-3xl py-12 px-4 md:px-0">
            <div className="space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Contact Us</h1>
                    <p className="text-muted-foreground">Get in touch with our team for any inquiries or feedback.</p>
                </div>
                <Card>
                    <CardContent className="space-y-4">
                        <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Enter your name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" placeholder="Enter your phone number" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Enter your message" className="min-h-[120px]" />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Link href="/dashboard" passHref>
                            <Button as="a" type="submit">Submit</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}