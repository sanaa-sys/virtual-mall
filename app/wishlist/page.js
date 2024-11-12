"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

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
        alert('Added to cart!')
        router.push("/cart");
    }
    const removeWishlist = (productId) => {
        const updatedWishlist = wishlist.filter(product => product.id !== productId);
        
      
        setWishlist(updatedWishlist);
    };
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
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
        </div>
    )
}