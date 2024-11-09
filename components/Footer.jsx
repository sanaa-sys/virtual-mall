"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  CreditCard,
  Bitcoin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-12 justify-center pl-10 mr-6 ml-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://virtual-mall-phi.vercel.app/faq"
                  className="hover:text-primary transition-transform transform hover:scale-105 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="https://virtual-mall-phi.vercel.app/return"
                  className="hover:text-primary transition-transform transform hover:scale-105 transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-transform transform hover:scale-105 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="https://virtual-mall-phi.vercel.app/privacy"
                  className="hover:text-primary transition-transform transform hover:scale-105 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://www.facebook.com/techgrovecom?mibextid=ZbWKwL"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook />
              </a>
              <a
                href="https://www.linkedin.com/company/tech__grove/"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
              <a
                href="https://www.instagram.com/tech__grove?igsh=MWZ1Z2NkdHVxdmowYw=="
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube />
              </a>
            </div>
            <h3 className="font-bold text-lg mb-4">Payment Options</h3>
            <div className="flex space-x-4">
              <span className="text-gray-400" aria-label="Credit Card">
                <CreditCard />
              </span>

              <span className="text-gray-400" aria-label="Bitcoin">
                <Bitcoin />
              </span>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="mb-4">
              Stay updated with our latest offers and products.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
                aria-label="Email for newsletter"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p> 2024 Virtual Mall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
