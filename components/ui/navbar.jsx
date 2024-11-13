"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">ShopNow</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/home"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/productList"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </Link>
              <Link
                href="/aboutus"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link
                href="/cart"
                className="text-muted-foreground hover:text-primary p-1 rounded-full"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">View cart</span>
              </Link>
              <Link
                href="/profile"
                className="text-muted-foreground hover:text-primary p-1 rounded-full ml-3"
              >
                <User className="h-6 w-6" />
                <span className="sr-only">View profile</span>
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/home"
              className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/productList"
              className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact Us
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-border">
            <div className="flex items-center px-5">
              <Link
                href="/cart"
                className="text-muted-foreground hover:text-primary p-1 rounded-full"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">View cart</span>
              </Link>
              <Link
                href="/profile"
                className="text-muted-foreground hover:text-primary p-1 rounded-full ml-3"
              >
                <User className="h-6 w-6" />
                <span className="sr-only">View profile</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
