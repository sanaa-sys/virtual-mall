"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const MyComponent = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/home");
  };

  return (
    <div className="container mx-auto p-4">
      <ScrollArea className="h-[80vh] w-full rounded-md border p-4">
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-sm text-gray-500 mb-6">
            Last Updated: December 2, 2024
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">INTRODUCTION</h2>
          <h3 className="text-xl font-semibold mt-4 mb-2">About Us</h3>
          <p>
            This Site is owned and operated by Virtual Pakistan Pvt Limited
            (Registration Number: #####). Virtual Store is an e-commerce
            platform that connects Buyers and Sellers, offering a wide variety
            of products for sale.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">
            1. AGREEMENT TO OUR LEGAL TERMS
          </h2>
          <p>
            By accessing and using the website, platform, and services of
            Virtual Store ("Company," "we," "us," "our"), including but
            not limited to the website https://virtual-store-xyz.vercel.app/ (the
            "Site") and any related services or products (collectively, the
            "Services"), you agree to comply with and be bound by these Terms
            and Conditions ("Terms").
          </p>
          <p>
            If you do not agree with these Terms, please do not use our
            Services.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">2. DEFINITIONS</h2>
          <ul>
            <li>
              <strong>Buyer</strong> refers to any individual or entity who
              purchases products through the Virtual Store platform.
            </li>
            <li>
              <strong>Seller</strong> refers to any individual or entity who
              lists and sells products through the Virtual Store platform.
            </li>
            <li>
              <strong>Platform</strong> refers to the Virtual Store
              marketplace, including the website, mobile app, and associated
              services.
            </li>
            <li>
              <strong>Transaction</strong> refers to any purchase or sale
              conducted on the Platform.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-3">16. CONTACT US</h2>
          <p>
            If you have any questions or concerns regarding these Terms and
            Conditions, please contact us at:
          </p>
          <p>
            Virtual Store
            <br />
            Lahore, Pakistan
            <br />
            Email: [Email Address]
          </p>
        </div>
      </ScrollArea>

      <Button
        variant="outline"
        onClick={handleRedirect}
        size="lg"
        className="flex-gap-4 bg-orange-200 text-black font-semibold hover:bg-red-200 transition-all duration-300 transform hover:scale-105 mt-6"
      >
        Back to Home
      </Button>
    </div>
  );
};

export default MyComponent;
