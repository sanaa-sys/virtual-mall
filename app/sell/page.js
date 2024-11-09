import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  Package,
  Truck,
} from "lucide-react";

export default function SellPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Start Selling on Our Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Reach millions of customers and grow your business with our
                  powerful e-commerce tools.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/register">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Why Sell With Us?
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <DollarSign className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Competitive Fees</h3>
                <p className="text-muted-foreground">
                  Enjoy low selling fees and keep more of your profits.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Easy Shipping</h3>
                <p className="text-muted-foreground">
                  Access discounted shipping rates and convenient pickup
                  options.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Package className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Powerful Tools</h3>
                <p className="text-muted-foreground">
                  Manage your inventory, orders, and analytics with ease.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to Start Selling?
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join thousands of successful sellers on our platform.
                    It&apos;s quick and easy to get started.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="/register">Create Seller Account</Link>
                  </Button>
                  <Button variant="outline">Contact Sales</Button>
                </div>
              </div>
              <div className="flex flex-col space-y-4 lg:p-8 lg:bg-background lg:rounded-lg">
                <h3 className="text-xl font-bold">
                  Get updates on seller news
                </h3>
                <form className="flex flex-col space-y-2">
                  <Input type="email" placeholder="Enter your email" />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our terms and privacy policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © 2023 Our E-commerce Platform. All rights reserved.
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
