import type React from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  isNew?: boolean;
  discount?: number;
  category?: string;
  color?: string;
  size?: string;
  inStock?: boolean;
  description?: string;
}

export interface Category {
  name: string;
  image: string;
  description?: string;
}

export interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface NavigationItem {
  name: string;
  href: string;
}
