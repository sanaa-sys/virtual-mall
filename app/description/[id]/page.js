"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "app/lib/firebase"; // Adjust this path to your Firebase config
import { Loader2, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const productRef = doc(db, "products", id);
          const productSnap = await getDoc(productRef);

          if (productSnap.exists()) {
            setProduct({ id: productSnap.id, ...productSnap.data() });
          } else {
            console.log("No such product!");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Redirect to the cart page when the button is clicked
    router.push("/cart");
  };

  const handleAddToWishlist = () => {
    // Redirect to the wishlist page when the button is clicked
    router.push("/wishlist");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-gray-800">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              width={400}
              height={400}
              className="h-48 w-full object-cover md:h-full md:w-48"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Product ID: {product.id}
            </div>
            <h1 className="mt-2 text-xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500">
              {product.description}
            </p>
            <div className="mt-6 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                ({product.reviewCount} reviews)
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  product.stock > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </span>
            </div>
            <div className="mt-8 flex space-x-4">
              <button
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={product.stock <= 0}
                onClick={handleAddToCart} // Add click handler to Add to Cart button
              >
                Add to Cart
              </button>
              <button
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleAddToWishlist} // Add click handler to Add to Wishlist button
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
