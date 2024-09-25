import React from "react";
import Link from "next/link";
const NavBar = () => {
  return (
    <div className="hidden lg:block ">
      <div className="container">
        <div className="flex w-fit gap-10 mx-auto font-medium py-5 text-blackish">
          <Link className="navbar__link relative" href="http://localhost:3000/">
            HOME
          </Link>
          <Link
            className="navbar__link relative"
            href="http://localhost:3000/product"
          >
            Products
          </Link>
          <Link
            className="navbar__link relative"
            href="http://localhost:3000/order"
          >
            Orders
          </Link>
          <Link
            className="navbar__link relative"
            href="http://localhost:3000/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="navbar__link relative"
            href="http://localhost:3000/profile"
          >
            Profile
          </Link>
          <Link
            className="navbar__link relative"
            href="http://localhost:3000/contact"
          >
            Contact
                  </Link>
                  <Link
                      className="navbar__link relative"
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
