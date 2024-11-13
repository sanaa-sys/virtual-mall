"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, Store } from "lucide-react";

const UserChoiceDialog = ({ open, onClose }) => {
  const router = useRouter();
  const [hoveredChoice, setHoveredChoice] = useState(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleChoice = (choice) => {
    onClose();
    if (choice === "buyer") {
      router.push("/home");
    } else {
      router.push("/sellerPage");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-[600px] w-full">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Choose Your Role</h2>
          <p className="text-gray-600">
            Select whether you want to be a buyer or a seller on our platform.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 py-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredChoice("buyer")}
            onHoverEnd={() => setHoveredChoice(null)}
            className="h-full"
          >
            <div
              className={`cursor-pointer transition-colors h-full bg-gradient-to-r from-blue-200 to-purple-300 rounded-lg p-4 ${
                hoveredChoice === "buyer" ? "shadow-lg" : ""
              }`}
              onClick={() => handleChoice("buyer")}
            >
              <div className="text-center font-bold mb-2">Buyer</div>
              <div className="flex justify-center items-center flex-grow mb-2">
                <ShoppingCart size={48} />
              </div>
              <div className="text-center text-gray-800">
                Browse and purchase items
              </div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredChoice("seller")}
            onHoverEnd={() => setHoveredChoice(null)}
            className="h-full"
          >
            <div
              className={`cursor-pointer transition-colors h-full bg-gradient-to-r from-blue-200 to-purple-300 rounded-lg p-4 ${
                hoveredChoice === "seller" ? "shadow-lg" : ""
              }`}
              onClick={() => handleChoice("seller")}
            >
              <div className="text-center font-bold mb-2">Seller</div>
              <div className="flex justify-center items-center flex-grow mb-2">
                <Store size={48} />
              </div>
              <div className="text-center text-gray-800">
                List and sell your products
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserChoiceDialog;
