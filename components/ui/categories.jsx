import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Sunglasses", image: "/sunglasses.jpeg" },
  { name: "Mobiles", image: "/mobiles.jpeg" },
  {
    name: "Trash Bags & Liners",
    image: "/trash.jpeg",
  },
  { name: "Dog & Cat Beds", image: "/dog.jpeg" },
  { name: "Tablets", image: "/tablet.jpeg" },
  {
    name: "Ventilation Parts & Accessories",
    image: "/placeholder.svg?height=100&width=100",
  },
  { name: "Starter Kits", image: "/placeholder.svg?height=100&width=100" },
  {
    name: "Blocks & Building Toys",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Knife Sharpeners & Blocks",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Comforters, Quilts & Duvets",
    image: "/placeholder.svg?height=100&width=100",
  },
  { name: "Microphones", image: "/placeholder.svg?height=100&width=100" },
  { name: "Zakat", image: "/placeholder.svg?height=100&width=100" },
  { name: "Stud earrings", image: "/placeholder.svg?height=100&width=100" },
  {
    name: "Shower Caddies & Hangers",
    image: "/placeholder.svg?height=100&width=100",
  },
  { name: "Stickers & Labels", image: "/placeholder.svg?height=100&width=100" },
  { name: "Dining Sets", image: "/placeholder.svg?height=100&width=100" },
];

export default function CategoryGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-white">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/category/${category.name
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            className="group block"
          >
            <div className="bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg h-full flex flex-col">
              <div className="aspect-square relative overflow-hidden rounded-t-lg">
                <Image
                  src={category.image}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-2 flex-grow flex items-center justify-center">
                <h3 className="text-xs sm:text-sm font-medium text-gray-800 text-center line-clamp-2">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
