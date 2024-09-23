import NewProducts from "../components/NewProducts";
import Carousel from "@/components/ui/Carousel";
import CategoryGrid from "@/components/ui/categories";
import JustForYou from "@/components/ui/justforyou";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-purple-300">
      <Carousel />
      <br></br>
      <br></br>
      <br></br>
      <CategoryGrid />

      <br></br>
      <br></br>
      <br></br>
      <JustForYou />
    </div>
  );
}
