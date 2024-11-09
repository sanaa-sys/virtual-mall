// pages/index.js
import HeaderMain from "@/components/headermain"; // Ensure the import path is correct

import Carousel from "@/components/ui/Carousel";
import CategoryGrid from "@/components/ui/categories";
import JustForYou from "@/components/ui/justforyou";
import Chatbot from "@/components/ui/chat";
import Footer from "@/components/Footer";
import HeaderTop from "@/components/ui/HeaderTop";
import NavBar from "@/components/ui/navbar";

export default function Home() {
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
