'use client'

import { useEffect, useState } from 'react'
import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { db, app, firebaseConfig  } from "app/lib/firebase";

export default function ProductCatalog({ initialCategory }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState([])
    const [wishlist, setWishlist] = useState([])
    console.log(initialCategory);
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const productsCollection = collection(db, 'products');
                const querySnapshot = await getDocs(productsCollection);

                const products = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));
                console.log(products);
                // Filter products after fetching them
                const filteredProducts = products.filter((product) =>
                    product.category && typeof product.category === 'string' &&
                    product.category.toLowerCase().includes(initialCategory)
                )
                console.log(filteredProducts);
                setProducts(filteredProducts);
            } catch (error) {
                console.error("Error getting documents: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [initialCategory]);




    const addToCart = (productId) => {
        setCart([...cart, productId])
        toast.success('Added to cart!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const addToWishlist = (productId) => {
        setWishlist([...wishlist, productId])
        toast.success('Added to wishlist!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    if (loading) {
        return <div className="container mx-auto p-4">Loading...</div>
    }

    return (
        <div className="container mx-auto p-4">
            {loading ? ( // Check if products are still loading
                <p>Loading products...</p>
            ) : (
                <>
            <h1 className="text-3xl font-bold mb-6"> Catalog</h1>
      
              
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map(product => (
                    <Card key={product.id} className="flex flex-col">
                        <CardHeader>
                            <div className="aspect-square relative mb-2">
                                <img
                                    src={product.image || 'clothing.jpg'}  // Optional chaining or fallback
                                    alt={product.title || 'Product Image'}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                            <CardTitle className="line-clamp-2">{product.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
                            <div className="mt-2 flex items-center">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span className="text-sm font-medium">{product.rating.rate}</span>
                                <span className="text-sm text-muted-foreground ml-1">({product.rating.count})</span>
                            </div>
                        </CardContent>
                        <CardFooter className="mt-auto flex flex-col items-stretch gap-2">
                            <div className="flex justify-between items-center w-full">
                                <Badge variant="secondary">{product.category}</Badge>
                                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                            </div>
                            <div className="flex gap-2 w-full">
                                <Button
                                    onClick={() => addToCart(product.id)}
                                    className="flex-1"
                                    aria-label={`Add ${product.title} to cart`}
                                >
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Add to Cart
                                </Button>
                                <Button
                                    onClick={() => addToWishlist(product.id)}
                                    variant="outline"
                                    className="flex-1"
                                    aria-label={`Add ${product.title} to wishlist`}
                                >
                                    <Heart className="w-4 h-4 mr-2" />
                                    Wishlist
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
                </>
            )}
        </div>
    )
}
