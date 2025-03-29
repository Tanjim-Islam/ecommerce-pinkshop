"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Heart, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types"

interface SaleFeaturedProductProps {
  product: Product
  wishlist: number[]
  cart: number[]
  toggleWishlist: (id: number) => void
  toggleCart: (id: number) => void
  openQuickView: (product: Product) => void
}

export function SaleFeaturedProduct({
  product,
  wishlist,
  cart,
  toggleWishlist,
  toggleCart,
  openQuickView,
}: SaleFeaturedProductProps) {
  // Calculate discount percentage if not provided
  const discountPercentage =
    product.discount ||
    (product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0)

  return (
    <motion.div
      className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative aspect-square rounded-xl overflow-hidden">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        <Badge className="absolute top-4 left-4 bg-pink-400 text-white rounded-full px-3 py-1 text-lg">
          {discountPercentage}% OFF
        </Badge>
      </div>

      <div className="flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-semibold text-pink-500">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 text-lg line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <p className="text-gray-600 mb-6">
          {product.description ||
            `Limited time offer! This ${product.name.toLowerCase()} is now available at an incredible discount. Don't miss out on this amazing deal.`}
        </p>

        <div className="flex flex-wrap gap-4">
          <motion.div className="flex-1" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              className="w-full bg-pink-400 hover:bg-pink-500 text-white rounded-full"
              onClick={() => toggleCart(product.id)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {cart.includes(product.id) ? "Remove from Cart" : "Add to Cart"}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outline"
              className="border-pink-400 text-pink-500 hover:bg-pink-50 rounded-full"
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart className={`h-4 w-4 mr-2 ${wishlist.includes(product.id) ? "fill-pink-400" : ""}`} />
              Wishlist
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-pink-400 rounded-full"
              onClick={() => openQuickView(product)}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Quick View
            </Button>
          </motion.div>
        </div>

        <div className="mt-6 p-3 bg-pink-50 rounded-lg text-pink-600 text-sm">
          <strong>Hurry!</strong> Sale ends soon. Limited stock available.
        </div>
      </div>
    </motion.div>
  )
}

