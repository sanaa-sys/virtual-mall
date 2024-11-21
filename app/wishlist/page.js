"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import NavBar from "@/components/ui/navbar";
// This would typically come from an API or state management solution
import { useAppContext } from "../../context/AppContext";

export default function WishlistPage() {
    const { wishlist, setWishlist, cart, setCart } = useAppContext();
    const addToCart = (product) => {

        const existingProduct = cart.find(item => item.id === product.id);
        let quantity = 1;

        if (existingProduct) {
            quantity = existingProduct.quantity + 1;
        }

        // Use the 'quantity' variable to add or update the product in the cart
        setCart([...cart, { ...product, quantity }]);
        alert('Added to cart!');
        router.push("/cart");
    };
    const removeWishlist = (productId) => {
        const updatedWishlist = wishlist.filter(product => product.id !== productId);

        setWishlist(updatedWishlist);
    };
    return (
        <div className="container mx-auto px-4 py-8">
            <NavBar />
            <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
                      {wishlist.length === 0 ? (
           <p className="text-center text-gray-500 py-8">
              Your wishlist is empty.
           </p>
           ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.map((item) => (
                    <Card key={item.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-48 object-cover mb-4 rounded-md"
                            />
                            <p className="text-2xl font-bold">${item.price.toFixed(2)}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" size="icon" className="w-12 h-12" onClick={() => removeWishlist(item.id)}>
                                <Trash2 className="h-6 w-6" />
                                <span className="sr-only">Remove from wishlist</span>
                            </Button>
                            <Button size="lg" className="w-full ml-2" onClick={() => addToCart(item)}>
                                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
                </div>
            )}
        </div>
    );
}


// "use client";

// import { useState } from "react";
// import { Heart, ShoppingCart, Trash2 } from "lucide-react";
// import Image from "next/image";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";

// // Mock data for wishlist items
// const initialWishlistItems = [
//   { id: 1, name: "Wireless Headphones", price: 129.99, image: "/placeholder.svg" },
//   { id: 2, name: "Smartwatch", price: 199.99, image: "/placeholder.svg" },
//   { id: 3, name: "Portable Charger", price: 49.99, image: "/placeholder.svg" },
//   { id: 4, name: "Bluetooth Speaker", price: 79.99, image: "/placeholder.svg" },
//   { id: 5, name: "Fitness Tracker", price: 89.99, image: "/placeholder.svg" },
// ];

// export default function Wishlist() {
//   const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

//   const removeFromWishlist = (id) => {
//     setWishlistItems(wishlistItems.filter((item) => item.id !== id));
//   };

//   const addToCart = (id) => {
//     console.log(`Added item ${id} to cart`);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Card className="w-full max-w-4xl mx-auto">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold flex items-center gap-2">
//             <Heart className="w-8 h-8 text-red-500" />
//             My Wishlist
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           {wishlistItems.length === 0 ? (
//             <p className="text-center text-gray-500 py-8">
//               Your wishlist is empty.
//             </p>
//           ) : (
//             <ScrollArea className="h-[60vh]">
//               <ul className="divide-y divide-gray-200">
//                 {wishlistItems.map((item) => (
//                   <li
//                     key={item.id}
//                     className="py-4 flex items-center justify-between"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <Image
//                         src={item.image}
//                         alt={item.name}
//                         width={80}
//                         height={80}
//                         className="rounded-md"
//                       />
//                       <div>
//                         <h3 className="text-lg font-semibold">{item.name}</h3>
//                         <p className="text-gray-600">
//                           ${item.price.toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => addToCart(item.id)}
//                         title="Add to Cart"
//                       >
//                         <ShoppingCart className="w-4 h-4" />
//                         <span className="sr-only">Add to Cart</span>
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => removeFromWishlist(item.id)}
//                         title="Remove from Wishlist"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                         <span className="sr-only">Remove from Wishlist</span>
//                       </Button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </ScrollArea>
//           )}
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <p className="text-lg font-semibold">
//             Total Items: {wishlistItems.length}
//           </p>
//           <Button
//             onClick={() => console.log("Add all to cart")}
//             disabled={wishlistItems.length === 0}
//           >
//             Add All to Cart
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

