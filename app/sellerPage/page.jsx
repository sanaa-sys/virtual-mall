"use client";
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import NavBar from "@/components/ui/navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppContext } from "../../context/AppContext";
import Link from "next/link";
import emailjs from "emailjs-com";

export default function CartPage() {
  const { cart, setCart } = useAppContext();
  const [buyerEmail, setBuyerEmail] = useState(""); // Add buyer's email state

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity >= 0) {
      setCart((items) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setCart((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  const handleProceedToCheckout = () => {
    if (buyerEmail === "") {
      alert("Please enter your email to proceed.");
      return;
    }

    const productList = cart.map(item => `${item.name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`).join("\n");

    // Send confirmation email using EmailJS
    emailjs.send(
      "service_cio6onz", // Replace with your EmailJS service ID
      "template_t5k24tp", // Replace with your EmailJS template ID
      {
        buyer_email: buyerEmail, // The buyer's email
        order_id: "123456", // Example order ID (replace with actual ID if needed)
        payment_method: "Credit Card", // Example payment method (replace with actual payment method if available)
        order_total: total.toFixed(2), // Order total
        product_list: productList, // List of products in the cart
        from_name: "Virtual Mall", // Sender's name
      },
      "1oDlFZNgaaQnAhytI" // Replace with your EmailJS user ID
    )
    .then((result) => {
      console.log("Email sent successfully!");
    })
    .catch((error) => {
      console.log("Error sending email:", error);
    });
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/productList" passHref>
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <NavBar />
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Trash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="lg:w-1/3">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Add an email input field for buyer */}
            <div className="mt-4">
              <label htmlFor="buyerEmail" className="block mb-2">
                Enter your email:
              </label>
              <Input
                type="email"
                id="buyerEmail"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full"
                required
              />
            </div>

            {/* Proceed to checkout button */}
            <Button className="w-full mt-6" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
