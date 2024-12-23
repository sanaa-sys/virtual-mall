import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
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
    image: "/inafnt.jpeg",
    price: 389,
    originalPrice: 794,
    discount: 51,
    rating: 5,
    reviews: 118,
  },
  {
    id: 2,
    name: "AirPods_Pro Wireless Earbuds Bluetooth 5.0,...",
    image: "/airpords.jpeg",
    price: 1719,
    originalPrice: 4000,
    discount: 57,
    rating: 4,
    reviews: 5900,
  },
  {
    id: 3,
    name: "NEW Original Air Pro 6 TWS Wireless...",
    image: "/pro.jpeg",
    price: 808,
    originalPrice: 1616,
    discount: 50,
    rating: 4,
    reviews: 150,
  },
  {
    id: 4,
    name: "Men Sport Watch Military Sports Watch Waterproo...",
    image: "/watch.jpeg",
    price: 336,
    originalPrice: 840,
    discount: 60,
    rating: 4,
    reviews: 0,
  },
  {
    id: 5,
    name: "GLUTAPONE Extreme Strong Whitenin...",
    image: "/gulap.jpeg",
    price: 100,
    originalPrice: 200,
    discount: 9,
    rating: 4,
    reviews: 4539,
  },
  {
    id: 6,
    name: "Spigen PC Soft Phone Case for IPhone 11 14 12 1...",
    image: "/case.jpeg",
    price: 529,
    originalPrice: 2035,
    discount: 74,
    rating: 4,
    reviews: 265,
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden no-scrollbar"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
            ${product.price.toLocaleString()}
          </p>
          <p className="ml-2 text-sm text-gray-500 line-through">
            ${product.originalPrice.toLocaleString()}
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
    </motion.div>
  );
}

export default function JustForYou() {
  return (
    <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-6 text-black">Discount</h2>
          <p className="text-m font-semibold mb-6 text-black">Understanding and utilizing discounts is an essential part of financial literacy. Discounts help you save money on purchases, allowing you to allocate funds toward other priorities like savings or debt repayment. Always look for sales, coupons, or promotional offers to make the most of your spending.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
