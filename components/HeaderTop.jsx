import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const HeaderTop = () => {
  return (
    <div className=" headertop border-b border-gray-200 hidden sm:block pl-10  ">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <div className="hidden lg:flex gap-1">
            <div className="header_top__icon_wrapper">
              <a
                href="https://www.facebook.com/techgrovecom?mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="size-8" />
              </a>
            </div>

            <div className="header_top__icon_wrapper">
              <a
                href="https://www.linkedin.com/company/tech__grove/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="size-8" />
              </a>
            </div>

            <div className="header_top__icon_wrapper">
              <a
                href="https://www.instagram.com/tech__grove?igsh=MWZ1Z2NkdHVxdmowYw=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSquareInstagram className="size-8" />
              </a>
            </div>
          </div>

          <div className="text-black pr-10 text-5xl font-extrabold overflow-hidden">
            Virtual Mall Lahore
          </div>

          <div className="flex-gap-4 pr-10 ">
            <select
              className="text-black text-[12px] w-[70px] "
              name="currency"
              id="currency"
            >
              <option value="PAK rs">PAK rs</option>
              <option value="USD $">USD $</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
