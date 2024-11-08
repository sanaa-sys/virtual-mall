"use client";
import Link from "next/link";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React from "react";
//import "../globals.css";

import SparklesPreview from "@/components/sparklescont";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const { toast } = useToast();
  const router = useRouter();

    const handleSignIn = async () => {
        try {
            const res = await signInWithEmailAndPassword(email, password);
            console.log({ res });
            sessionStorage.setItem('user', true)
            setEmail('');
            setPassword('');
            toast({ title: "Login successful", description: "Redirecting to dashboard..." });
            router.push("/home");
        } catch (e) {
            console.error(e)
            toast({ title: "Signup failed", description: e.message || "Please try again.", status: "error" });
        }
    };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen bg-gradient-to-tr from-indigo-200 via-zinc-50 to-indigo-300">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome to Virtual Mall</h1>
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded" // You can style it as needed
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
                className="w-full p-2 border rounded" // Adjust styling as needed
              />
            </div>

           <Button type="submit" className="w-full" onClick={handleSignIn}>
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div1>
        <div className="flex items-center justify-center h-screen">
          <img src="/logo1.png" alt="Logo" className="center rounded-full " />
        </div>
      </div1>
    </div>
  );
}
