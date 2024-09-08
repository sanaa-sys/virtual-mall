"use client";
import { useState } from "react";
import { Star, User } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import Link from "next/link";
export default function ProductReviewPage() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "John Doe",
      rating: 4,
      comment: "Great product! Exactly what I needed.",
      date: "2023-05-15",
    },
    {
      id: 2,
      author: "Jane Smith",
      rating: 5,
      comment: "Excellent quality and fast shipping. Highly recommended!",
      date: "2023-05-10",
    },
    {
      id: 3,
      author: "Bob Johnson",
      rating: 3,
      comment: "Good product, but a bit pricey.",
      date: "2023-05-05",
    },
  ]);

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const [newReview, setNewReview] = useState({
    author: "",
    rating: 5,
    comment: "",
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([...reviews, review]);
    setNewReview({ author: "", rating: 5, comment: "" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src="/headphones.jpg?height=400&width=400"
            alt="Product"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">
            Premium Wireless Headphones
          </h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.round(averageRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-lg font-semibold">
              {averageRating.toFixed(1)} out of 5
            </span>
          </div>
          <p className="text-gray-600 mb-4">
            Experience crystal-clear audio with our Premium Wireless Headphones.
            Featuring advanced noise-cancellation technology and long-lasting
            battery life, these headphones are perfect for music lovers and
            professionals alike.
          </p>
          <p className="text-2xl font-bold mb-4">$199.99</p>
          <Link href="/cart" passHref>
            <Button>Add to Cart</Button>
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Customer Reviews</h2>
      <div className="grid gap-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="mr-2">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.author}`}
                    />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{review.author}</CardTitle>
                    <CardDescription>{review.date}</CardDescription>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Write a Review</h2>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={newReview.author}
                onChange={(e) =>
                  setNewReview({ ...newReview, author: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="rating">Rating</Label>
              <select
                id="rating"
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    rating: parseInt(e.target.value),
                  })
                }
                required
              >
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating !== 1 && "s"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="comment">Your Review</Label>
              <Textarea
                id="comment"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit">Submit Review</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
