"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
  wishlist: number[]
  cart: number[]
  toggleWishlist: (id: number) => void
  toggleCart: (id: number) => void
  openQuickView: (product: Product) => void
}

export function ProductCard({ product, wishlist, cart, toggleWishlist, toggleCart, openQuickView }: ProductCardProps) {
  return (
    <motion.div className="group" whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              size="icon"
              variant="secondary"
              className={`rounded-full bg-white shadow-sm ${
                wishlist.includes(product.id) ? "text-pink-400" : "text-gray-400"
              }`}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-pink-400" : ""}`} />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white shadow-sm text-gray-400"
              onClick={() => openQuickView(product)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
        {product.isNew && <Badge className="absolute top-2 left-2 bg-pink-400 text-white rounded-full px-3">New</Badge>}
        {product.discount && (
          <Badge className="absolute top-2 left-2 bg-pink-400 text-white rounded-full px-3">-{product.discount}%</Badge>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="w-full bg-white text-pink-400 hover:bg-pink-50 rounded-full"
              onClick={() => toggleCart(product.id)}
            >
              {cart.includes(product.id) ? "Remove from Cart" : "Add to Cart"}
            </Button>
          </motion.div>
        </div>
      </div>
      <h3 className="font-medium text-gray-900">{product.name}</h3>
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <span className="text-gray-800 font-semibold">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 text-sm line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <div className="flex items-center">
          {product.originalPrice ? (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="sm"
                variant="ghost"
                className="text-pink-400 hover:text-pink-500 p-0 rounded-full"
                onClick={() => toggleCart(product.id)}
              >
                <ShoppingCart className={`h-4 w-4 ${cart.includes(product.id) ? "fill-pink-400" : ""}`} />
              </Button>
            </motion.div>
          ) : (
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3 w-3 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

