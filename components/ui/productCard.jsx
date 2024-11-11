import React from "react";

const ProductCard = ({ product }) => {
  if (!product) {
    return (
      <div className="p-4 text-center">Product information not available</div>
    );
  }

  // Destructure the product with the image field from FakeStore API
  const {
    name = "Unnamed Product",
    description = "No description available",
    image = "https://via.placeholder.com/384x224", // Fallback image
  } = product;

  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={image} // Use image from FakeStore API
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // Use fallback image if the image fails to load
            if (e.target.src !== "https://via.placeholder.com/384x224") {
              e.target.src = "https://via.placeholder.com/384x224";
            }
          }}
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {/* Escape quotes or special characters */}
          {name.replace(/"/g, "&quot;")}
        </h5>
        <p className="mb-3 font-normal text-gray-700">
          {/* If description is long, truncate it */}
          {description && description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>
        <div className="mt-4 flex justify-between">
          <button className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800">
            Learn More
          </button>
          <button className="inline-flex items-center rounded-lg bg-green-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-green-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
