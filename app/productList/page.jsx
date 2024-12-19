"use client";
import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { Grid, Container, CircularProgress, Typography } from "@mui/material";
import { db } from "../lib/firebase"; // Import the Firestore db object from firebase.js
import ProductCard from "@/components/ui/productCard";
import NavBar from "@/components/ui/navbar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching products from Firestore
  useEffect(() => {
    const q = query(collection(db, "products")); // Adjust 'products' to your Firestore collection name
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const productsArray = [];
        querySnapshot.forEach((doc) => {
          productsArray.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsArray);
        setLoading(false); // Set loading to false after fetching data
      },
      (error) => {
        setError("Failed to load products");
        setLoading(false); // Set loading to false if there is an error
      }
    );

    return () => unsubscribe(); // Clean up subscription when component unmounts
  }, []);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <Typography variant="h6">Loading products...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <div className="bg-gradient-to-r from-red-200 to-orange-200">
      <NavBar />
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
  );
};

export default ProductList;
