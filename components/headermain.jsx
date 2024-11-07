// components/headermain.jsx
"use client";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation"; // Ensure you import useRouter

const HeaderMain = () => {
  const router = useRouter(); // Use useRouter here

  const handleRedirect = (path) => {
    router.push(path); // Redirects to the specified path
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
          <input
            className="border-gray-200 border p-2 px-4 rounded-lg w-full"
            type="text"
            placeholder="Enter any product name..."
          />
          <BsSearch
            className="absolute right-0 top-0 mr-3 mt-3 text-gray-400"
            size={20}
          />
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
    </div>
  );
};

export default HeaderMain;
