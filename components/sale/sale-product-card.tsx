"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/products/product-card"
import type { Product } from "@/types"

interface SaleProductCardProps {
  product: Product
  wishlist: number[]
  cart: number[]
  toggleWishlist: (id: number) => void
  toggleCart: (id: number) => void
  openQuickView: (product: Product) => void
}

export function SaleProductCard({
  product,
  wishlist,
  cart,
  toggleWishlist,
  toggleCart,
  openQuickView,
}: SaleProductCardProps) {
  // Calculate discount percentage if not provided
  const discountPercentage =
    product.discount ||
    (product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0)

  // Enhance product with calculated discount
  const enhancedProduct = {
    ...product,
    discount: discountPercentage
  }

  return (
    <ProductCard
      product={enhancedProduct}
      wishlist={wishlist}
      cart={cart}
      toggleWishlist={toggleWishlist}
      toggleCart={toggleCart}
      openQuickView={openQuickView}
    />
  )
}
