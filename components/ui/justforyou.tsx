import Image from "next/image";
import { Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "2 in 1 Baby Infant Food Fruits Soft Bite Nipple...",
    image: "/placeholder.svg?height=200&width=200",
    price: 389,
    originalPrice: 794,
    discount: 51,
    rating: 5,
    reviews: 118,
  },
  {
    id: 2,
    name: "AirPods_Pro Wireless Earbuds Bluetooth 5.0,...",
    image: "/placeholder.svg?height=200&width=200",
    price: 1719,
    originalPrice: 4000,
    discount: 57,
    rating: 4,
    reviews: 5900,
  },
  {
    id: 3,
    name: "NEW Original Air Pro 6 TWS Wireless...",
    image: "/placeholder.svg?height=200&width=200",
    price: 808,
    originalPrice: 1616,
    discount: 50,
    rating: 4,
    reviews: 150,
  },
  {
    id: 4,
    name: "Men Sport Watch Military Sports Watch Waterproo...",
    image: "/placeholder.svg?height=200&width=200",
    price: 336,
    originalPrice: 840,
    discount: 60,
    rating: 4,
    reviews: 0,
  },
  {
    id: 5,
    name: "GLUTAPONE Extreme Strong Whitenin...",
    image: "/placeholder.svg?height=200&width=200",
    price: 730,
    originalPrice: 803,
    discount: 9,
    rating: 4,
    reviews: 4539,
  },
  {
    id: 6,
    name: "Spigen PC Soft Phone Case for IPhone 11 14 12 1...",
    image: "/placeholder.svg?height=200&width=200",
    price: 529,
    originalPrice: 2035,
    discount: 74,
    rating: 4,
    reviews: 265,
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center">
          <p className="text-lg font-semibold text-red-600">
            Rs.{product.price.toLocaleString()}
          </p>
          <p className="ml-2 text-sm text-gray-500 line-through">
            Rs.{product.originalPrice.toLocaleString()}
          </p>
          <p className="ml-2 text-sm font-medium text-green-600">
            -{product.discount}%
          </p>
        </div>
        <div className="mt-2 flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-sm text-gray-500">
            ({product.reviews})
          </span>
        </div>
      </div>
    </div>
  );
}

export default function JustForYou() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-white">Just For You</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
