"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown } from "lucide-react";

const banners = [
  {
    id: 1,
    image: "/placeholder.svg?height=400&width=1200",
    alt: "50% Off Sale",
    title: "50% Off Sale",
    cta: "Shop Now",
    link: "/sale",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=400&width=1200",
    alt: "New Arrivals",
    title: "New Arrivals",
    cta: "Discover",
    link: "/new-arrivals",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=400&width=1200",
    alt: "Best Sellers",
    title: "Best Sellers",
    cta: "View All",
    link: "/best-sellers",
  },
];

export default function Carousel() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner(
      (prevBanner) => (prevBanner - 1 + banners.length) % banners.length
    );
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
            index === currentBanner ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <Image
            src={banner.image}
            alt={banner.alt}
            layout="fill"
            objectFit="cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">
              {banner.title}
            </h2>
            <a
              href={banner.link}
              className="bg-white text-black px-4 py-1 sm:px-6 sm:py-2 rounded-full text-sm sm:text-base font-semibold hover:bg-opacity-90 transition-colors"
            >
              {banner.cta}
            </a>
          </div>
        </div>
      ))}
      <button
        onClick={prevBanner}
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-1 sm:p-2 rounded-full hover:bg-opacity-75 transition-colors"
        aria-label="Previous banner"
      >
        <ChevronUp className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
      </button>
      <button
        onClick={nextBanner}
        className="absolute bottom-1/2 left-2 sm:left-4 transform translate-y-1/2 bg-white bg-opacity-50 p-1 sm:p-2 rounded-full hover:bg-opacity-75 transition-colors"
        aria-label="Next banner"
      >
        <ChevronDown className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
      </button>
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              index === currentBanner ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
