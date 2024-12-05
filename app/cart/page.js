'use client';
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/ui/navbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAppContext } from "../../context/AppContext";
import Link from "next/link";
import emailjs from "emailjs-com";

export default function CartPage() {
  const { cart, setCart } = useAppContext();
  console.log(cart);

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

  // Function to send the email
  const sendOrderConfirmationEmail = (orderDetails) => {
    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", orderDetails, "YOUR_USER_ID")
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
        },
        (error) => {
          console.log("Failed to send email:", error);
        }
      );
  };

  // Handle checkout
  const handleCheckout = () => {
    // Assuming the user has an email, name, etc.
    const orderDetails = {
      customer_name: "John Doe", // Replace with dynamic user data
      customer_email: "johndoe@example.com", // Replace with dynamic user email
      order_id: new Date().toISOString(), // Use a dynamic order ID or a unique ID
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      product_list: cart.map((item) => `${item.name} (x${item.quantity})`).join(", "),
      shipping_address: "123 Main St, City", // Replace with dynamic address
    };

    sendOrderConfirmationEmail(orderDetails);
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
            <Link href="/payment" passHref className="w-full">
              <Button
                className="w-full mt-6"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
