import type { Product, Category, Benefit, NavigationItem } from "@/types";
import { Truck, ShieldCheck, Clock, Gift, type LucideIcon } from "lucide-react";
import * as React from "react";

export const navigationItems: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "/categories" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Sale", href: "/sale" },
];

export const categories: Category[] = [
  {
    name: "Dresses",
    image: "/placeholder.svg?height=400&width=300",
    description:
      "From casual day dresses to elegant evening wear, find the perfect dress for any occasion.",
  },
  {
    name: "Tops",
    image: "/placeholder.svg?height=400&width=300",
    description:
      "Stylish tops for every season, from basic tees to statement blouses.",
  },
  {
    name: "Bottoms",
    image: "/placeholder.svg?height=400&width=300",
    description:
      "Complete your look with our selection of skirts, pants, and shorts.",
  },
  {
    name: "Accessories",
    image: "/placeholder.svg?height=400&width=300",
    description:
      "Elevate any outfit with our curated collection of accessories.",
  },
  {
    name: "Shoes",
    image: "/placeholder.svg?height=400&width=300",
    description: "Step out in style with our range of trendy footwear options.",
  },
];

// Sample product images for each product to demonstrate the image gallery
const dressImages = [
  "/placeholder.svg?height=600&width=500",
  "/placeholder.svg?height=600&width=500&text=Dress-Front",
  "/placeholder.svg?height=600&width=500&text=Dress-Back",
  "/placeholder.svg?height=600&width=500&text=Dress-Detail",
];

const topImages = [
  "/placeholder.svg?height=600&width=500",
  "/placeholder.svg?height=600&width=500&text=Top-Front",
  "/placeholder.svg?height=600&width=500&text=Top-Back",
  "/placeholder.svg?height=600&width=500&text=Top-Detail",
];

const bottomImages = [
  "/placeholder.svg?height=600&width=500",
  "/placeholder.svg?height=600&width=500&text=Bottom-Front",
  "/placeholder.svg?height=600&width=500&text=Bottom-Back",
  "/placeholder.svg?height=600&width=500&text=Bottom-Detail",
];

const accessoryImages = [
  "/placeholder.svg?height=600&width=500",
  "/placeholder.svg?height=600&width=500&text=Accessory-Angle1",
  "/placeholder.svg?height=600&width=500&text=Accessory-Angle2",
  "/placeholder.svg?height=600&width=500&text=Accessory-Detail",
];

const shoeImages = [
  "/placeholder.svg?height=600&width=500",
  "/placeholder.svg?height=600&width=500&text=Shoes-Side",
  "/placeholder.svg?height=600&width=500&text=Shoes-Top",
  "/placeholder.svg?height=600&width=500&text=Shoes-Back",
];

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=300",
    images: dressImages,
    isNew: true,
    category: "Dresses",
    color: "pink",
    size: "M",
    inStock: true,
    description:
      "A beautiful floral summer dress perfect for warm days. Made with lightweight, breathable fabric.",
  },
  {
    id: 2,
    name: "Classic White Blouse",
    price: 39.99,
    image: "/placeholder.svg?height=400&width=300",
    images: topImages,
    isNew: false,
    category: "Tops",
    color: "white",
    size: "S",
    inStock: true,
    description:
      "A timeless white blouse that pairs perfectly with any bottom. Versatile and elegant.",
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=300",
    images: accessoryImages,
    isNew: true,
    category: "Accessories",
    color: "black",
    size: "M",
    inStock: true,
    description:
      "A stylish leather crossbody bag with multiple compartments. Perfect for everyday use.",
  },
  {
    id: 4,
    name: "Strappy Sandals",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=300",
    images: shoeImages,
    isNew: false,
    category: "Shoes",
    color: "black",
    size: "M",
    inStock: true,
    description:
      "Elegant strappy sandals with a comfortable heel. Perfect for both casual and formal occasions.",
  },
];

export const newArrivals: Product[] = [
  {
    id: 5,
    name: "Pink Ruffle Blouse",
    price: 45.99,
    originalPrice: 59.99,
    image: "/placeholder.svg?height=400&width=300",
    images: topImages,
    discount: 20,
    category: "Tops",
    color: "pink",
    size: "S",
    inStock: true,
    isNew: true,
    description:
      "A feminine pink blouse with ruffle details. Made from soft, comfortable fabric.",
  },
  {
    id: 6,
    name: "Floral Maxi Skirt",
    price: 65.99,
    image: "/placeholder.svg?height=400&width=300",
    images: bottomImages,
    category: "Bottoms",
    color: "blue",
    size: "M",
    inStock: true,
    isNew: true,
    description:
      "A flowing maxi skirt with a beautiful floral pattern. Perfect for summer days.",
  },
  {
    id: 7,
    name: "Statement Earrings",
    price: 24.99,
    originalPrice: 34.99,
    image: "/placeholder.svg?height=400&width=300",
    images: accessoryImages,
    discount: 30,
    category: "Accessories",
    color: "gold",
    size: "OS",
    inStock: true,
    isNew: true,
    description:
      "Bold statement earrings that add a touch of glamour to any outfit.",
  },
  {
    id: 8,
    name: "Pastel Sneakers",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=300",
    images: shoeImages,
    category: "Shoes",
    color: "pink",
    size: "8",
    inStock: true,
    isNew: true,
    description:
      "Comfortable pastel sneakers that add a pop of color to your casual looks.",
  },
  {
    id: 21,
    name: "Embroidered Denim Jacket",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=300",
    images: topImages,
    category: "Tops",
    color: "blue",
    size: "M",
    inStock: true,
    isNew: true,
    description:
      "A stylish denim jacket with beautiful embroidery details. Perfect for layering in any season.",
  },
  {
    id: 22,
    name: "Pleated Midi Dress",
    price: 75.99,
    image: "/placeholder.svg?height=400&width=300",
    images: dressImages,
    category: "Dresses",
    color: "pink",
    size: "S",
    inStock: true,
    isNew: true,
    description:
      "An elegant pleated midi dress that's perfect for special occasions. Features a flattering silhouette.",
  },
  {
    id: 23,
    name: "Oversized Sunglasses",
    price: 35.99,
    image: "/placeholder.svg?height=400&width=300",
    images: accessoryImages,
    category: "Accessories",
    color: "black",
    size: "OS",
    inStock: true,
    isNew: true,
    description:
      "Stylish oversized sunglasses with UV protection. A must-have accessory for sunny days.",
  },
];

// Additional products for the shop page
export const additionalProducts: Product[] = [
  {
    id: 9,
    name: "Denim Jacket",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=300",
    images: topImages,
    category: "Tops",
    color: "blue",
    size: "L",
    inStock: true,
    description:
      "A classic denim jacket that never goes out of style. Perfect for layering.",
  },
  {
    id: 10,
    name: "Pleated Midi Skirt",
    price: 55.99,
    image: "/placeholder.svg?height=400&width=300",
    images: bottomImages,
    category: "Bottoms",
    color: "black",
    size: "S",
    inStock: true,
    description:
      "An elegant pleated midi skirt that transitions seamlessly from day to night.",
  },
  {
    id: 11,
    name: "Oversized Sweater",
    price: 69.99,
    originalPrice: 89.99,
    image: "/placeholder.svg?height=400&width=300",
    images: topImages,
    discount: 20,
    category: "Tops",
    color: "pink",
    size: "M",
    inStock: true,
    description:
      "A cozy oversized sweater perfect for chilly days. Soft and comfortable.",
  },
  {
    id: 12,
    name: "Ankle Boots",
    price: 99.99,
    image: "/placeholder.svg?height=400&width=300",
    images: shoeImages,
    category: "Shoes",
    color: "black",
    size: "7",
    inStock: true,
    description:
      "Stylish ankle boots that complement any outfit. Comfortable for all-day wear.",
  },
  {
    id: 13,
    name: "Silk Scarf",
    price: 29.99,
    image: "/placeholder.svg?height=400&width=300",
    images: accessoryImages,
    category: "Accessories",
    color: "red",
    size: "OS",
    inStock: true,
    description: "A luxurious silk scarf that adds elegance to any outfit.",
  },
  {
    id: 14,
    name: "Wrap Dress",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=300",
    images: dressImages,
    category: "Dresses",
    color: "blue",
    size: "M",
    inStock: true,
    description:
      "A flattering wrap dress that suits all body types. Comfortable and stylish.",
  },
  {
    id: 15,
    name: "Leather Belt",
    price: 34.99,
    image: "/placeholder.svg?height=400&width=300",
    images: accessoryImages,
    category: "Accessories",
    color: "brown",
    size: "M",
    inStock: true,
    description:
      "A high-quality leather belt that adds the perfect finishing touch to any outfit.",
  },
  {
    id: 16,
    name: "Wide Leg Pants",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=300",
    images: bottomImages,
    category: "Bottoms",
    color: "black",
    size: "L",
    inStock: true,
    description:
      "Comfortable and stylish wide leg pants that flatter your figure.",
  },
  {
    id: 17,
    name: "Cashmere Beanie",
    price: 45.99,
    originalPrice: 59.99,
    image: "/placeholder.svg?height=400&width=300",
    images: accessoryImages,
    discount: 20,
    category: "Accessories",
    color: "pink",
    size: "OS",
    inStock: false,
    description:
      "A luxuriously soft cashmere beanie to keep you warm during cold days.",
  },
  {
    id: 18,
    name: "Slip Dress",
    price: 69.99,
    image: "/placeholder.svg?height=400&width=300",
    images: dressImages,
    category: "Dresses",
    color: "black",
    size: "S",
    inStock: true,
    description:
      "A sleek slip dress that can be dressed up or down for any occasion.",
  },
  {
    id: 19,
    name: "Platform Sandals",
    price: 85.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=400&width=300",
    images: shoeImages,
    discount: 15,
    category: "Shoes",
    color: "white",
    size: "9",
    inStock: true,
    description:
      "Trendy platform sandals that add height without sacrificing comfort.",
  },
  {
    id: 20,
    name: "Cropped Cardigan",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=300",
    images: topImages,
    category: "Tops",
    color: "pink",
    size: "S",
    inStock: false,
    description:
      "A cute cropped cardigan perfect for layering over dresses and tops.",
  },
];

// Combine all products for the shop page
export const allProducts: Product[] = [
  ...featuredProducts,
  ...newArrivals,
  ...additionalProducts,
];

export const productColors = [
  { name: "Pink", value: "bg-pink-400" },
  { name: "White", value: "bg-white" },
  { name: "Black", value: "bg-gray-900" },
  { name: "Blue", value: "bg-blue-400" },
];

export const productSizes = ["XS", "S", "M", "L", "XL"];

const createIcon = (Icon: LucideIcon): React.ReactNode => {
  return React.createElement(Icon, { className: "h-6 w-6" });
};

export const benefits: Benefit[] = [
  {
    icon: createIcon(Truck),
    title: "Free Shipping",
    description: "On all orders over $50",
  },
  {
    icon: createIcon(ShieldCheck),
    title: "Secure Payment",
    description: "100% secure payment",
  },
  {
    icon: createIcon(Clock),
    title: "Fast Delivery",
    description: "2-3 business days",
  },
  {
    icon: createIcon(Gift),
    title: "Gift Wrapping",
    description: "Available for all products",
  },
];
