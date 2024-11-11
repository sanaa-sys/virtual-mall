"use client";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "app/lib/firebase"; // Ensure the path is correct for your Firebase setup

const HeaderMain = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm) return;

    try {
      const productsRef = collection(db, "products");

      // Simplified query for exact matches or prefix matching
      const q = query(
        productsRef,
        where("name", ">=", searchTerm),
        where("name", "<=", searchTerm + "\uf8ff")
      );

      const querySnapshot = await getDocs(q);

      // Log the raw query results to see what data is being returned
      console.log(querySnapshot.docs);

      // Check if any products are found
      if (querySnapshot.empty) {
        console.log("No products found!");
      }

      // Map the query snapshot to products
      const searchResults = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(searchResults); // Set the products to display the search results
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div className="border-b border-gray-200 py-6 bg-gradient-to-r from-blue-200 to-purple-300">
      <div className="container sm:flex justify-between items-center">
        <div className="font-bold text-4xl text-center pr-3 pb-2 sm:pb-0 text-blackish">
          <img
            src="/logo1.png"
            alt="Logo"
            className="center rounded-full pl-2"
            style={{ width: "150px", height: "150px" }}
          />
        </div>

        <div className="w-full sm:w-[300px] md:w-[70%] pl-2 relative">
          <form onSubmit={handleSearch}>
            <input
              className="border-gray-200 border p-2 px-4 rounded-lg w-full"
              type="text"
              placeholder="Enter any product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <BsSearch
                className="absolute right-0 top-0 mr-3 mt-3 text-gray-400"
                size={20}
              />
            </button>
          </form>
        </div>

        <div className="hidden lg:flex gap-4 text-gray-500 text-[30px] pl-1">
          <BiUser
            onClick={() => handleRedirect("/signup")}
            className="cursor-pointer"
          />
          <div
            className="relative cursor-pointer"
            onClick={() => handleRedirect("/wishlist")}
          >
            <FiHeart />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              0
            </div>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => handleRedirect("/cart")}
          >
            <MdOutlineShoppingBag />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              0
            </div>
          </div>
        </div>
      </div>

      {/* Render Search Results */}
      <div className="container py-4">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border p-4 rounded-lg shadow">
                <h3 className="font-bold">{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.title}</p>
              </div>
            ))}
          </div>
        ) : (
          searchTerm && <p>No products found for "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
};

export default HeaderMain;
