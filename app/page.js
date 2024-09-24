// pages/index.js
import HeaderMain from "@/components/headermain"; // Ensure the import path is correct
import NewProducts from "../components/NewProducts";
import Carousel from "@/components/ui/Carousel";
import CategoryGrid from "@/components/ui/categories";
import JustForYou from "@/components/ui/justforyou";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-purple-300">
      <HeaderMain />
      <Carousel />
      <br />
      <br />
      <br />
      <CategoryGrid />
      <br />
      <br />
      <br />
      <JustForYou />
    </div>
  );
}
