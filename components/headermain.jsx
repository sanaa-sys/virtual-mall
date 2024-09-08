import React from "react";
import { BsSearch } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { BiUser } from "react-icons/bi";

const HeaderMain = () => {
  return (
    <div className="border-b border-gray-200 py-6 bg-gradient-to-bl from-zinc-50 to-indigo-300">
      <div className="container sm:flex juatify-between items-center">
        <div className="font-bold text-4xl text-center pb-2 sm:pb-0 text-blackish">
          <img
            src="/logo1.png"
            alt="Logo"
            className="center rounded-full pl-2"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
        <div className="w-full sm:w-[300px] md:w-[70%]  pl-32 relative">
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

        <div className="hidden lg:flex gap-4 text-gray-500 text-[30px] pl-10">
          <BiUser />

          <div className="relative">
            <FiHeart />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              0
            </div>
          </div>

          <div className="relative">
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
