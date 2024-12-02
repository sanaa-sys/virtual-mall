"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, provider } from "app/lib/firebase"; // Adjust path to your firebase config
import { signInWithPopup } from "firebase/auth"; // For Google Sign-In
import "./globals.css";
import { useAppContext } from "/context/AppContext";


import GoogleAuth from '@/components/GoogleAuth'

export default function Home() {

  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

    const router = useRouter();
    const { userEmail, setUser } = useAppContext();
    

  // Function to handle Email/Password signup
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate email and password fields
    if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return; // Prevent form submission if fields are empty
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
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      <div className="flex items-center justify-center h-screen">
        <img src="/logo1.png" alt="Logo" className="center rounded-full " />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-xl font-bold">Welcome to Virtual Mall</h1>
            <h1 className="text-xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to create an account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setUser(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <label htmlFor="password">Password</label>
              </div>
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border rounded"
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
        </div>
      </div>
    </div>
  );
}
