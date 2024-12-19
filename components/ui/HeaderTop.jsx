import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // Import framer-motion
import { useAppContext } from "../../context/AppContext";

const HeaderTop = () => {
  const { userEmail, setUser } = useAppContext();
  const isVirtualMallSeller = userEmail?.endsWith('@virtualmall.com') ?? false;
  const router = useRouter();
  const redirect = () => {
    if (userEmail) {
      if (isVirtualMallSeller) {
        router.push('/sell');
      } else {
        router.push('/sellerPage');
      }
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="headertop border-b border-gray-200 hidden sm:block ">
      <div className="container py-4">
        <div className="flex justify-evenly items-center no-scrollbar">
          {/* Social Media Icons */}
          <div className="hidden lg:flex gap-1 pr-10 no-scrollbar">
            <motion.div 
              className="header_top__icon_wrapper"
              whileHover={{ scale: 1.2 }}  // Add scale on hover
            >
              <a
                href="https://www.facebook.com/techgrovecom?mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="size-8" />
              </a>
            </motion.div>

            <motion.div 
              className="header_top__icon_wrapper "
              whileHover={{ scale: 1.2 }}  // Add scale on hover
            >
              <a
                href="https://www.linkedin.com/company/tech__grove/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="size-8" />
              </a>
            </motion.div>

            <motion.div 
              className="header_top__icon_wrapper"
              whileHover={{ scale: 1.2 }}  // Add scale on hover
            >
              <a
                href="https://www.instagram.com/tech__grove?igsh=MWZ1Z2NkdHVxdmowYw=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSquareInstagram className="size-8" />
              </a>
            </motion.div>
          </div>

          {/* Virtual Mall Lahore Text and Seller Button */}
          <motion.div 
            className="flex justify-center items-center text-center gap-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <div className="text-black text-5xl font-extrabold overflow-hidden pr-10">
              Virtual Store
            </div>
          
            <Button
              variant="outline"
              onClick={redirect}
              size="lg"
              className="flex-gap-4 bg-gradient-to-r from-red-400 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
            >
              Be a Seller on Virtual Mall
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
