"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "app/lib/firebase"; // Adjust path to your firebase config
import "./globals.css";
import { useAppContext } from "/context/AppContext";
import GoogleAuth from "@/components/GoogleAuth";
import { motion } from "framer-motion"; // Import framer-motion

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const { userEmail, setUser } = useAppContext();

  // Function to handle Email/Password signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(email, password);
      alert("User created successfully!");
      router.push("/login");
    } catch (error) {
      if (error.code === "auth/weak-password") {
        alert("Password is too weak. Please use a stronger password.");
      } else if (error.code === "auth/email-already-in-use") {
        alert("Email address is already in use.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 bg-gradient-to-r from-red-200 to-orange-200 overflow-hidden">
      {/* Logo Section with Slide to Top Animation */} 
      <motion.div
        className="flex items-center justify-center min-h-screen"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <img src="/Virtualstore.png" alt="Logo" className="rounded-full" />
      </motion.div>
      {/* Sign Up Form with Slide Up Animation */}
      <motion.div
        className="flex items-center justify-center py-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-xl font-bold">Welcome to Virtual Mall</h1>
            <h1 className="text-xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to create an account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2 no-scrollbar">
              <label htmlFor="email">Email</label>
              <motion.input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded"
                whileFocus={{ scale: 1.05 }}
              />
            </div>
            <div className="grid gap-2 no-scrollbar">
              <div className="flex items-center no-scrollbar">
                <label htmlFor="password">Password</label>
              </div>
              <motion.input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border rounded"
                whileFocus={{ scale: 1.05 }}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </div>
          <GoogleAuth mode="Sign Up" />
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
          {error && (
            <motion.div
              className="error-notification"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error.message}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
