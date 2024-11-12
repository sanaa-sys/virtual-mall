// pages/index.js
"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase"; //Assuming the file is in the root `lib` directory
import "./globals.css";


export default function Home() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User created successfully!");
      router.push("/login"); // Ensure this line is called
    } catch (error) {
      alert(error.message);
    }
  };

    return (
     
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      <div className=" flex items-center justify-center h-screen">
        <img src="/logo1.png" alt="Logo" className="center rounded-full " />
      </div>{" "}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome to Virtual Mall</h1>
            <h1 className="text-3xl font-bold">Sign Up</h1>
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
            <Button type="submit" className="w-full" onClick={handleSignup}>
              Sign Up
            </Button>
          </div>
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
