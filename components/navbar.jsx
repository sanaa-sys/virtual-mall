import React from "react";
import Link from "next/link";

const NavBar = () => {

        return (
            <nav className="hidden lg:block bg-white shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center py-4">
                        <ul className="flex space-x-8 font-medium text-gray-700">
                            
                            <li>
                                <Link
                                    className="navbar__link relative overflow-hidden hover:text-gray-900 transition-colors"
                                    href="/home"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="navbar__link relative overflow-hidden hover:text-gray-900 transition-colors"
                                    href="/productList"
                                >
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="navbar__link relative overflow-hidden hover:text-gray-900 transition-colors"
                                    href="/contact"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="navbar__link relative overflow-hidden hover:text-gray-900 transition-colors"
                                    href="/sell"
                                >
                                    Sell
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    };

export default NavBar;
