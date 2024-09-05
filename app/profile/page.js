/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pELqQ12nIWK
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function Component() {
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" placeholder="Enter your username" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" placeholder="Tell us about yourself" rows={4} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="links">Links</Label>
                        <Input id="links" placeholder="Add your links (e.g. Twitter, GitHub)" />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Link href="/dashboard" passHref>
                    <Button as="a" type="submit">Save Changes</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}