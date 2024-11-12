"use client"
import ProductCatalog from '@/components/ProductCatalog'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppContext } from "../../context/AppContext";

export default function CatalogPage() {
 
    const { category, setCategory } = useAppContext();
    console.log(category);
    return <ProductCatalog initialCategory={category}/>
}