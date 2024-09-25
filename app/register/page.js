"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    // Here you would typically handle the form submission, such as sending data to an API
    console.log("Form submitted");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container max-w-lg mx-auto p-4 py-8">
          <Link
            href="/sell"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sell Page
          </Link>
          <h1 className="text-3xl font-bold mb-6">Create Seller Account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" required />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create Seller Account"}
            </Button>
          </form>
          <p className="mt-4 text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>

        <section className="w-full py-12 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-8">
              Why Sell on Our Platform?
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">
                    Access to Millions of Customers
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Reach a vast audience of potential buyers.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Easy-to-Use Tools</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your inventory and orders with our intuitive
                    dashboard.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Secure Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive payments safely and on time.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Get help whenever you need it with our dedicated support
                    team.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Marketing Tools</h3>
                  <p className="text-sm text-muted-foreground">
                    Promote your products with our built-in marketing features.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Analytics and Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Make data-driven decisions with our powerful analytics
                    tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © 2024 Virtual Mall. All rights reserved.
            </p>
            <nav className="flex gap-4 sm:gap-6">
              <Link
                className="text-sm hover:underline underline-offset-4"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-sm hover:underline underline-offset-4"
                href="#"
              >
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
