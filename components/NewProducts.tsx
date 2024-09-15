"use client";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Eco-friendly Water Bottle",
    price: 19.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Organic Cotton T-shirt",
    price: 29.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Recycled Paper Notebook",
    price: 9.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Bamboo Toothbrush Set",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Solar-powered Charger",
    price: 39.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Reusable Produce Bags",
    price: 12.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    name: "Stainless Steel Straws",
    price: 8.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    name: "Biodegradable Phone Case",
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 9,
    name: "Recycled Plastic Backpack",
    price: 59.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 10,
    name: "Bamboo Cutlery Set",
    price: 17.99,
    image: "/placeholder.svg?height=200&width=200",
  },
];

const categories: Category[] = [
  { id: 1, name: "Kitchen", image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Bathroom", image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Clothing", image: "/placeholder.svg?height=100&width=100" },
  {
    id: 4,
    name: "Electronics",
    image: "/placeholder.svg?height=100&width=100",
  },
  { id: 5, name: "Outdoor", image: "/placeholder.svg?height=100&width=100" },
  { id: 6, name: "Home Decor", image: "/placeholder.svg?height=100&width=100" },
  {
    id: 7,
    name: "Personal Care",
    image: "/placeholder.svg?height=100&width=100",
  },
  { id: 8, name: "Office", image: "/placeholder.svg?height=100&width=100" },
];

export default function ProductPage() {
  return (
      <div className="container mx-auto px-4 py-8 bg-orange-500">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Product Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            >
              <div className="relative h-24 w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 ease-in-out group-hover:opacity-75"
                />
              </div>
              <div className="p-2 text-center">
                <h3 className="text-sm font-medium">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h1 className="text-3xl font-bold mb-8 text-center">
          Featured Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl flex flex-col"
            >
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 ease-in-out group-hover:opacity-75"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mb-4 text-xl font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <button
                  className="w-full transition-colors duration-300 ease-in-out flex items-center justify-center"
                  style={{
                    backgroundColor: "#fed7aa",
                    transition: "background-color 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f97316")
                  } // New hover color
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fed7aa")
                  } // Reset to original color
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
