import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const HeaderTop = () => {
  return (
    <div className=" headertop border-b border-gray-200 hidden sm:block pl-10 ">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <div className="hidden lg:flex gap-1">
            <div className="header_top__icon_wrapper">
              <FaFacebook />
            </div>
            <div className="header_top__icon_wrapper">
              <FaTwitter />
            </div>
            <div className="header_top__icon_wrapper">
              <FaLinkedin />
            </div>

            <div className="header_top__icon_wrapper">
              <FaSquareInstagram />
            </div>
          </div>

          <div className="text-black text-[12px] pr-10 text-3xl font-bold ">
            Get your order now!
          </div>
          <div className="flex-gap-4 pr-10">
            <select
              className="text-black text-[12px] w-[70px]"
              name="currency"
              id="currency"
            >
              <option value="USD $">USD $</option>
              <option value="PAK rs">PAK rs</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
