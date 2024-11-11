import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="hidden lg:block">
      <div className="container">
        <div className="flex w-fit gap-10 mx-auto font-medium py-5 text-blackish">
          <Link className="navbar__link relative overflow-hidden" href="/home">
            Home
          </Link>
          <Link
            className="navbar__link relative overflow-hidden"
            href="/productList"
          >
            Products
          </Link>
          <Link
            className="navbar__link relative overflow-hidden"
            href="/profile"
          >
            Profile
          </Link>
          <Link
            className="navbar__link relative overflow-hidden"
            href="/contact"
          >
            Contact
          </Link>
          <Link className="navbar__link relative overflow-hidden" href="/sell">
            Sell
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
