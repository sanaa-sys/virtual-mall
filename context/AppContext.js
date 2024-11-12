// context/AppContext.js
"use client";
import React, { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
    const [userEmail, setUser] = useState(null);
    const [category, setCategory] = useState(null);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    return (
        <AppContext.Provider value={{ userEmail, setUser , category, setCategory, cart, setCart, wishlist, setWishlist }}>
            {children}
        </AppContext.Provider>
    );
};

// Create a custom hook to use the context
export const useAppContext = () => {
    return useContext(AppContext);
};