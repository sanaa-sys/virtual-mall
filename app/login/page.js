"use client";
import Link from "next/link";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleAuth from '@/components/GoogleAuth'
import React from "react";
import { useAppContext } from "../../context/AppContext";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { userEmail, setUser } = useAppContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(email, password);
      toast.success("Logged in successfully!");
      router.push("/home");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ToastContainer moved to the root */}
      <ToastContainer />

      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 bg-gradient-to-tr from-indigo-200 via-zinc-50 to-indigo-300 overflow-hidden">
        <div className="flex items-center justify-center py-12 min-h-screen">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-xl font-bold">Welcome to Virtual Mall</h1>
              <h1 className="text-xl font-bold">Login</h1>
              <p className="text-muted-foreground">
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
                  onChange={(e) => setUser(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="password">Password</label>
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
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
                      </div>
                      <GoogleAuth mode="Log In" />
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center min-h-screen">
          <img src="/logo1.png" alt="Logo" className="rounded-full" />
        </div>
      </div>
    </>
  );
}
