"use client"; // Mark this component as a client component

import { usePathname } from "next/navigation";
import HeaderTop from "./HeaderTop";
import HeaderMain from "./headermain";
import NavBar from "./navbar";

export default function ClientLayout({ children }) {
  const pathname = usePathname(); // Get the current pathname
  const isHiddenPage = pathname === "/signup" || pathname === "/login"; // Check if it's the signup or login page

  return (
    <>
      {!isHiddenPage && (
        <>
          {/* Top Header */}
          <HeaderTop />

          {/* Main Header */}
          <HeaderMain />

          {/* Navigation Bar */}
          <NavBar />
        </>
      )}
      {/* Main Page Content */}
      {children}
    </>
  );
}
