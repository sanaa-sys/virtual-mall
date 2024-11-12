'use client'

import { useEffect, useState } from 'react'
import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { db, app, firebaseConfig } from "app/lib/firebase";
import ProductCard from "@/components/ui/productCard";
import { Grid, Container, CircularProgress, Typography } from "@mui/material";
export default function ProductCatalog({ initialCategory }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
 
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


    if (loading) {
        return (
            <Container>
                <CircularProgress />
                <Typography variant="h6">Loading products...</Typography>
            </Container>
        );
    }




    return (
        <div className="bg-gradient-to-r from-blue-200 to-purple-300">
            <Container>
                <Grid container spacing={4}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
       
    )
}
