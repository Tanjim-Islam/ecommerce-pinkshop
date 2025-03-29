import type { Product, Category, Benefit } from "@/types";
import { Truck, ShieldCheck, Clock, Gift } from "lucide-react";
import React from "react";
import type { LucideIcon } from "lucide-react";

export const categories: Category[] = [
  { name: "Dresses", image: "/placeholder.svg?height=400&width=300" },
  { name: "Tops", image: "/placeholder.svg?height=400&width=300" },
  { name: "Accessories", image: "/placeholder.svg?height=400&width=300" },
  { name: "Shoes", image: "/placeholder.svg?height=400&width=300" },
];

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=300",
    isNew: true,
  },
  {
    id: 2,
    name: "Classic White Blouse",
    price: 39.99,
    image: "/placeholder.svg?height=400&width=300",
    isNew: false,
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=300",
    isNew: true,
  },
  {
    id: 4,
    name: "Strappy Sandals",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=300",
    isNew: false,
  },
];

export const newArrivals: Product[] = [
  {
    id: 5,
    name: "Pink Ruffle Blouse",
    price: 45.99,
    originalPrice: 59.99,
    image: "/placeholder.svg?height=400&width=300",
    discount: 20,
  },
  {
    id: 6,
    name: "Floral Maxi Skirt",
    price: 65.99,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 7,
    name: "Statement Earrings",
    price: 24.99,
    originalPrice: 34.99,
    image: "/placeholder.svg?height=400&width=300",
    discount: 30,
  },
  {
    id: 8,
    name: "Pastel Sneakers",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=300",
  },
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

