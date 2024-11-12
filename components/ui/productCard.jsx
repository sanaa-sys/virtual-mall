'use client'
import React from "react";
import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { useAppContext } from "../../context/AppContext";
import { useRouter } from "next/navigation";
const ProductCard = ({ product }) => {
    const router = useRouter(); 
    const { cart, setCart, wishlist, setWishlist } = useAppContext();

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

    const addToWishlist = (product) => {
        setWishlist([...wishlist, product])
        alert('Added to wishlist!')
        router.push("/wishlist");
    }

 
    if (!product) {
        return (
            <div className="p-4 text-center">Product information not available</div>
        );
    }



    return (
        <Card key={product.id} className="flex flex-col">
            <CardHeader>
                <div className="aspect-square relative mb-2">
                    <img
                        src={product.image || "https://via.placeholder.com/384x224"}  // Optional chaining or fallback
                        alt={product.title || 'Product Image'}
                        className="object-contain w-full h-full"
                    />
                </div>
                <CardTitle className="line-clamp-2">{product.title || "Unnamed Product"}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{product.description || "No description available"}</p>
                <div className="mt-2 flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{product.rating.rate || 0}</span>
                    <span className="text-sm text-muted-foreground ml-1">({product.rating.count || 0})</span>
                </div>
            </CardContent>
            <CardFooter className="mt-auto flex flex-col items-stretch gap-2">
                <div className="flex justify-between items-center w-full">
                    <Badge variant="secondary">{product.category || "No category"}</Badge>
                    <span className="text-lg font-bold">${product.price.toFixed(2) || 0}</span>
                </div>
                <div className="flex gap-2 w-full">
                    <Button
                        onClick={() => addToCart(product)}
                        className="flex-1"
                        aria-label={`Add ${product.title} to cart`}
                    >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                    </Button>
                    <Button
                        onClick={() => addToWishlist(product)}
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

    )
}

export default ProductCard;
