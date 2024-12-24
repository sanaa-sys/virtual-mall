"use client";
import { useState, useEffect } from "react";
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/ui/navbar";
import { Badge } from "@/components/ui/badge"; // Adjust the path according to your project structure
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
import { useRouter } from "next/navigation";

const discountLevels = {
    'Bronze': 0.05,
    'Silver': 0.10,
    'Gold': 0.15,
    'Platinum': 0.20
}

const getLoyaltyLevel = (points) => {
    if (points >= 1000) return 'Platinum';
    if (points >= 500) return 'Gold';
    if (points >= 250) return 'Silver';
    if (points >= 100) return 'Bronze';
    return '';
}

export default function CartPage() {
  const { cart, setCart } = useAppContext();
  const [budget, setBudget] = useState(0);
  const [budgetExceeded, setBudgetExceeded] = useState(false);
  const [installments, setInstallments] = useState(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [loyaltyLevel, setLoyaltyLevel] = useState('');

  const router = useRouter();

  useEffect(() => {
    const points = localStorage.getItem('loyaltyPoints');
    const numericPoints = points ? parseInt(points, 10) : 0;
    setLoyaltyPoints(numericPoints);
    setLoyaltyLevel(getLoyaltyLevel(numericPoints));
  }, []);

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
  const tax = subtotal * 0.1;

  const discount = loyaltyLevel ? subtotal * discountLevels[loyaltyLevel] : 0;
  const total = subtotal + tax - discount;

  const sendOrderConfirmationEmail = (orderDetails) => {
    emailjs
      .send("service_cio6onz", "template_t5k24tp", orderDetails, "YOUR_USER_ID")
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
        },
        (error) => {
          console.log("Failed to send email:", error);
        }
      );
  };

  const handleCheckout = () => {
    const numericBudget = parseFloat(budget);
    if (numericBudget < total) {
      setBudgetExceeded(true);
      router.push("/installments");
    } else {
      setBudgetExceeded(false);
      router.push("/payment");
      const orderDetails = {
        customer_name: "John Doe",
        customer_email: "johndoe@example.com",
        order_id: new Date().toISOString(),
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
        product_list: cart
          .map((item) => `${item.name} (x${item.quantity})`)
          .join(", "),
        shipping_address: "123 Main St, City",
      };

      sendOrderConfirmationEmail(orderDetails);
    }
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
            {loyaltyLevel && (
              <div className="flex items-center justify-end">
                <Badge variant="outline" className="mr-2">{loyaltyLevel}</Badge>
                <p className="text-green-600">
                  Discount: -${discount.toFixed(2)} ({(discountLevels[loyaltyLevel] * 100).toFixed(0)}%)
                </p>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Budget Input Field */}
            <div className="mt-4">
              <label className="block mb-2">Enter your budget:</label>
              <Input
                type="number"
                value={budget}
                onChange={(e) => setBudget(parseFloat(e.target.value))}
                placeholder="Enter your budget"
              />
            </div>

            {/* Budget Exceeded Warning */}
            {budgetExceeded && (
              <div className="mt-2 text-red-500">
                Your total exceeds your budget. You will be redirected to installment options.
              </div>
            )}

            <Button className="w-full mt-6" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}