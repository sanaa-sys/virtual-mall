import React from "react";
import Link from "next/link";
const NavBar = () => {
  return (
    <div className="hidden lg:block ">
      <div className="container">
        <div className="flex w-fit gap-10 mx-auto font-medium py-5 text-blackish">
          <Link
            className="navbar__link relative overflow-hidden"
            href="http://localhost:3000/home"
          >
            Home
          </Link>

          <Link
            className="navbar__link relative overflow-hidden"
            href="http://localhost:3000/order"
          >
            Orders
          </Link>

          <Link
            className="navbar__link relative overflow-hidden"
            href="http://localhost:3000/profile"
          >
            Profile
          </Link>
          <Link
            className="navbar__link relative overflow-hidden"
            href="http://localhost:3000/contact"
          >
            Contact
          </Link>
          <Link
            className="navbar__link relative overflow-hidden"
            href="http://localhost:3000/sell"
          >
            Sell
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
