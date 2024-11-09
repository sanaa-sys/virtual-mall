import Image from "next/image";
import Link from "next/link";

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
            "image": "/baby.jpg",
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
            "image": "/dog.jpg",
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




export default function CategoryGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-white">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {categories.category.map((category, index) => (
          <Link
            key={index}
            href={`/category/${category.name
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            className="group block"
          >
            <div className="bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg h-full flex flex-col">
              <div className="aspect-square relative overflow-hidden rounded-t-lg">
                <Image
                  src={category.image}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-2 flex-grow flex items-center justify-center">
                <h3 className="text-xs sm:text-sm font-medium text-gray-800 text-center line-clamp-2">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
