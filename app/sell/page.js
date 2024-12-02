"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from 'lucide-react'
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  Package,
  Truck,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { getFirestore, collection, addDoc, get } from 'firebase/firestore'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import NavBar from "@/components/ui/navbar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadImage } from './uploadImage'

const categories = {
    "category": [
        {
            "id": "electronics",
            "name": "Electronics",
            "image": "/mobiles.jpeg",
            "subcategories": [
                { "id": "smartphones", "name": "Smartphones" },
                { "id": "laptops", "name": "Laptops" },
                { "id": "tablets", "name": "Tablets" },
                { "id": "wearables", "name": "Wearables" }
            ]
        },
        {
            "id": "clothing",
            "name": "Clothing",
            "image": "/clothing.jpg",
            "subcategories": [
                { "id": "mens", "name": "Men's Clothing" },
                { "id": "womens", "name": "Women's Clothing" },
                { "id": "kids", "name": "Kids' Clothing" },
                { "id": "accessories", "name": "Accessories" }
            ]
        },
        {
            "id": "home_garden",
            "name": "Home & Garden",
            "image": "/dinner.jpeg",
            "subcategories": [
                { "id": "furniture", "name": "Furniture" },
                { "id": "kitchenware", "name": "Kitchenware" },
                { "id": "bedding", "name": "Bedding" },
                { "id": "gardening", "name": "Gardening" }
            ]
        },
        {
            "id": "books",
            "name": "Books",
            "image": "/book.jpg",
            "subcategories": [
                { "id": "fiction", "name": "Fiction" },
                { "id": "non_fiction", "name": "Non-Fiction" },
                { "id": "ebooks", "name": "E-books" },
                { "id": "audiobooks", "name": "Audiobooks" }
            ]
        },
        {
            "id": "sports_outdoors",
            "name": "Sports & Outdoors",
            "image": "/sport.jpg",
            "subcategories": [
                { "id": "fitness", "name": "Fitness Equipment" },
                { "id": "camping", "name": "Camping Gear" },
                { "id": "bicycles", "name": "Bicycles" },
                { "id": "team_sports", "name": "Team Sports" }
            ]
        },
        {
            "id": "beauty",
            "name": "Beauty",
            "image": "/beauty.jpg",
            "subcategories": [
                { "id": "skincare", "name": "Skincare" },
                { "id": "makeup", "name": "Makeup" },
                { "id": "haircare", "name": "Hair Care" },
                { "id": "fragrances", "name": "Fragrances" }
            ]
        },
        {
            "id": "fashion",
            "name": "Fashion",
            "image": "/sunglasses.jpeg",
            "subcategories": [
                { "id": "designer_brands", "name": "Designer Brands" },
                { "id": "jewelry", "name": "Jewelry" },
                { "id": "watches", "name": "Watches" },
                { "id": "handbags", "name": "Handbags" }
            ]
        },
        {
            "id": "toys",
            "name": "Toys",
            "image": "/toy.jpg",
            "subcategories": [
                { "id": "action_figures", "name": "Action Figures" },
                { "id": "board_games", "name": "Board Games" },
                { "id": "educational_toys", "name": "Educational Toys" },
                { "id": "outdoor_toys", "name": "Outdoor Toys" }
            ]
        },
        {
            "id": "baby",
            "name": "Baby",
            "image": "/babyjpg.jpg",
            "subcategories": [
                { "id": "baby_clothing", "name": "Baby Clothing" },
                { "id": "diapers_wipes", "name": "Diapers & Wipes" },
                { "id": "feeding", "name": "Feeding" },
                { "id": "nursery", "name": "Nursery" }
            ]
        },
        {
            "id": "health",
            "name": "Health",
            "image": "/panadol.jpg",
            "subcategories": [
                { "id": "vitamins_supplements", "name": "Vitamins & Supplements" },
                { "id": "personal_care", "name": "Personal Care" },
                { "id": "medical_supplies", "name": "Medical Supplies" },
                { "id": "wellness", "name": "Wellness" }
            ]
        },
        {
            "id": "automotive",
            "name": "Automotive",
            "image": "/ventilation.jpg",
            "subcategories": [
                { "id": "car_accessories", "name": "Car Accessories" },
                { "id": "motorcycle_accessories", "name": "Motorcycle Accessories" },
                { "id": "tools", "name": "Tools" },
                { "id": "car_care", "name": "Car Care" }
            ]
        },
        {
            "id": "pet_supplies",
            "name": "Pet Supplies",
            "image": "/dog.jpeg",
            "subcategories": [
                { "id": "dog_supplies", "name": "Dog Supplies" },
                { "id": "cat_supplies", "name": "Cat Supplies" },
                { "id": "fish_supplies", "name": "Fish Supplies" },
                { "id": "bird_supplies", "name": "Bird Supplies" }
            ]
        },
        {
            "id": "food_grocery",
            "name": "Food & Grocery",
            "image": "/grocery.jpg",
            "subcategories": [
                { "id": "fresh_produce", "name": "Fresh Produce" },
                { "id": "beverages", "name": "Beverages" },
                { "id": "snacks", "name": "Snacks" },
                { "id": "pantry", "name": "Pantry" }
            ]
        },
        {
            "id": "office_supplies",
            "name": "Office Supplies",
            "image": "/office.jpg",
            "subcategories": [
                { "id": "stationery", "name": "Stationery" },
                { "id": "office_furniture", "name": "Office Furniture" },
                { "id": "electronics", "name": "Office Electronics" },
                { "id": "cleaning_supplies", "name": "Cleaning Supplies" }
            ]
        },
        {
            "id": "furniture",
            "name": "Furniture",
            "image": "/furniture.jpeg",
            "subcategories": [
                {
                    "id": "living_room",
                    "name": "Living Room Furniture"
                },
                {
                    "id": "bedroom",
                    "name": "Bedroom Furniture"
                },
                {
                    "id": "office_furniture",
                    "name": "Office Furniture"
                },
                {
                    "id": "outdoor_furniture",
                    "name": "Outdoor Furniture"
                }
            ]
        },

        {
            "id": "travel",
            "name": "Travel",
            "image": "/travel.jpg",
            "subcategories": [
                { "id": "luggage", "name": "Luggage" },
                { "id": "travel_accessories", "name": "Travel Accessories" },
                { "id": "outdoor_gear", "name": "Outdoor Gear" },
                { "id": "travel_guides", "name": "Travel Guides" }
            ]
        }
    ]
};
export default function SellPage() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('Clothing')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleCategorySelect = (categoryName) => {
        setSelectedCategory(categoryName)
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true);

        try {
            let imageUrl = ''
            if (image) {
                imageUrl = await uploadImage(image);
            }
            
            const db = getFirestore();
            await addDoc(collection(db, 'products'), {
                title: title,
                description: description,
                price: parseFloat(price),
                category: category,
                image: imageUrl
            });

            // Access the newly generated ID
     

            alert('Product added successfully!');
            setTitle("");
            setDescription("");
            setPrice(0);
            setCategory("");
            setImage("");
            // You can use newProductId for any further actions
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error adding product. Please try again.');
        } finally {
            setLoading(false);
        }
    };
  return (
      <div className="flex flex-col min-h-screen">
          <main className="flex-1">
              <NavBar />

              {/* Hero Section */}
              <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary">
                  <div className="container px-4 md:px-6">
                      <div className="flex flex-col items-center space-y-4 text-center">
                          <div className="space-y-2">
                              <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl text-white no-scrollbar">
                                  Start Selling on Our Platform
                              </h1>
                              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                                  Reach millions of customers and grow your business with our powerful e-commerce tools.
                              </p>
                          </div>
                          <div className="space-x-4">
                           
                              <Button variant="outline">Learn More</Button>
                          </div>
                      </div>
                  </div>
              </section>

              {/* Features Section */}
              <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
                  <div className="container px-4 md:px-6">
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 no-scrollbar">
                          Why Sell With Us?
                      </h2>
                      <div className="flex flex-col items-center text-center">
                          <DollarSign className="h-12 w-12 mb-4 text-primary" />
                          <h3 className="text-xl font-bold mb-2">Competitive Fees</h3>
                          <p className="text-muted-foreground">
                              Enjoy low selling fees and keep more of your profits.
                          </p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                          <Truck className="h-12 w-12 mb-4 text-primary" />
                          <h3 className="text-xl font-bold mb-2">Easy Shipping</h3>
                          <p className="text-muted-foreground">
                              Access discounted shipping rates and convenient pickup
                              options.
                          </p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                          <Package className="h-12 w-12 mb-4 text-primary" />
                          <h3 className="text-xl font-bold mb-2">Powerful Tools</h3>
                          <p className="text-muted-foreground">
                              Manage your inventory, orders, and analytics with ease.
                          </p>
                      </div>
                  </div>
              </section>

              {/* Add Product Section */}
              <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                  <div className="container px-4 md:px-6 items-center">
                      <div className="container px-4 md:px-6">
                          <div className="flex flex-col items-center space-y-4">
                              <div className="space-y-2">
                                  <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl no-scrollbar space-y-2 mx-auto">
                                      Ready to Start Selling?
                                  </h2>
                                  <Card className="w-full max-w-2xl mx-auto">
                                      <CardHeader>
                                          <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl no-scrollbar">Add New Product</CardTitle>
                                          <CardDescription>
                                              Enter the details of your new product below. The product ID will be auto-generated.
                                          </CardDescription>
                                      </CardHeader>
                                      <CardContent>
                                          <form onSubmit={handleSubmit} className="space-y-4">
                                             
                                           
                                              <div className="space-y-2">
                                                  <Label htmlFor="title">Title</Label>
                                                  <Input
                                                      id="title"
                                                      value={title}
                                                      onChange={(e) => setTitle(e.target.value)}
                                                      required
                                                  />
                                              </div>
                                              <div className="space-y-2">
                                                  <Label htmlFor="description">Description</Label>
                                                  <Textarea
                                                      id="description"
                                                      value={description}
                                                      onChange={(e) => setDescription(e.target.value)}
                                                      required
                                                  />
                                              </div>
                                              <div className="space-y-2">
                                                  <Label htmlFor="price">Price</Label>
                                                  <Input
                                                      id="price"
                                                      type="number"
                                                      step="0.01"
                                                      value={price}
                                                      onChange={(e) => setPrice(e.target.value)}
                                                      required
                                                  />
                                              </div>
                                              <div className="space-y-2">
                                                  <DropdownMenu>
                                                      <DropdownMenuTrigger asChild>
                                                          <Button variant="outline" className="w-[200px] justify-between">
                                                              {category || "Categories"}
                                                              <ChevronDown className="ml-2 h-4 w-4" />
                                                          </Button>
                                                      </DropdownMenuTrigger>
                                                      <DropdownMenuContent className="w-[200px]">
                                                          {categories.category.map((category) => (
                                                              <DropdownMenuItem
                                                                  key={category.id}
                                                                  onSelect={() => handleCategorySelect(category.name)}
                                                              >
                                                                  {category.name}
                                                              </DropdownMenuItem>
                                                          ))}
                                                      </DropdownMenuContent>
                                                  </DropdownMenu>
                                              </div>
                                              <div className="space-y-2">
                                                  <Label htmlFor="image">Product Image</Label>
                                                  <Input
                                                      id="image"
                                                      type="file"
                                                      accept="image/*"
                                                      onChange={(e) => setImage(e.target.files?.[0] || null)}
                                                      required
                                                  />
                                              </div>
                                              <Button type="submit" disabled={loading} className="w-full">
                                                  {loading ? 'Adding Product...' : 'Add Product'}
                                              </Button>
                                          </form>
                                      </CardContent>
                                  </Card>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
          </main>

          {/* Footer */}
          <footer className="w-full py-6 bg-background">
              <div className="container px-4 md:px-6">
                  <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                      <p className="text-center text-sm text-muted-foreground md:text-left">
                          © 2023 Our E-commerce Platform. All rights reserved.
                      </p>
                      <nav className="flex gap-4 sm:gap-6">
                          <Link className="text-sm hover:underline underline-offset-4" to="/" href= "#">
                              Terms of Service
                          </Link>
                          <Link className="text-sm hover:underline underline-offset-4" to="/" href="#">
                              Privacy
                          </Link>
                      </nav>
                  </div>
              </div>
          </footer>
      </div>
  );
  
}
