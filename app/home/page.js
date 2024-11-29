"use client";
import HeaderMain from "@/components/headermain";
import Carousel from "@/components/ui/Carousel";
import CategoryGrid from "@/components/ui/categories";
import JustForYou from "@/components/ui/justforyou";
import Chatbot from "@/components/ui/chat";
import Footer from "@/components/Footer";
import HeaderTop from "@/components/ui/HeaderTop";
import NavBar from "@/components/ui/navbar";
import UserChoiceDialog from "@/components/ui/UserChoiceDialog";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        // Check if dialog has been shown before
        const dialogShown = localStorage.getItem("dialogShown");

        if (!dialogShown) {
          setOpenDialog(true);
          localStorage.setItem("dialogShown", "true"); // Set flag to true after dialog is shown
        }
      } else {
        setUser(null);
        localStorage.removeItem("dialogShown"); // Remove flag if user logs out
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-200 to-purple-300">
      <HeaderTop />
      <HeaderMain />
      <NavBar />
      <Carousel />
      <br />
      <br />
      <br />
      <CategoryGrid />
      <br />
      <br />
      <br />
      <JustForYou />
      <br />
      <Chatbot />
      <br />
      <Footer />

     
    </div>
  );
}
