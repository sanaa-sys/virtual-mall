import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

// This would typically come from an API or state management solution
const wishlistItems = [
    {
        id: 1,
        name: "Wireless Bluetooth Earbuds",
        price: 79.99,
        image: "/placeholder.svg?height=200&width=200",
    },
    {
        id: 2,
        name: "Smart Fitness Tracker",
        price: 99.99,
        image: "/placeholder.svg?height=200&width=200",
    },
    {
        id: 3,
        name: "Portable Power Bank",
        price: 49.99,
        image: "/placeholder.svg?height=200&width=200",
    },
    {
        id: 4,
        name: "Noise-Cancelling Headphones",
        price: 199.99,
        image: "/placeholder.svg?height=200&width=200",
    },
]

export default function WishlistPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
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
                            <Button variant="outline" size="icon" className="w-12 h-12">
                                <Trash2 className="h-6 w-6" />
                                <span className="sr-only">Remove from wishlist</span>
                            </Button>
                            <Button size="lg" className="w-full ml-2">
                                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}