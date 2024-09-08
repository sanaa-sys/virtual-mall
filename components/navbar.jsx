import React from "react";
import Link from "next/link";
const NavBar = () => {
  return (
    <div className="hidden lg:block ">
      <div className="container">
        <div className="flex w-fit gap-10 mx-auto font-medium py-5 text-blackish">
          <Link className="navbar__link relative" href="#">
            HOME
          </Link>
          <Link className="navbar__link relative" href="#">
            Products
          </Link>
          <Link className="navbar__link relative" href="#">
            Orders
          </Link>
          <Link className="navbar__link relative" href="#">
            Dashboard
          </Link>
          <Link className="navbar__link relative" href="#">
            Profile
          </Link>
          <Link className="navbar__link relative" href="#">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
