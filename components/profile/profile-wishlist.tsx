"use client"

import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/products/product-card"
import { QuickView } from "@/components/products/quick-view"
import type { Product } from "@/types"
import { Heart } from "lucide-react";

interface ProfileWishlistProps {
  products: Product[]
  wishlist: number[]
  cart: number[]
  toggleWishlist: (id: number) => void
  toggleCart: (id: number) => void
}

export function ProfileWishlist({ products, wishlist, cart, toggleWishlist, toggleCart }: ProfileWishlistProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const openQuickView = (product: Product) => {
    setSelectedProduct(product)
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">My Wishlist</h2>

        {products.length > 0 && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="border-pink-400 text-pink-500 hover:bg-pink-50 rounded-full"
              onClick={() => products.forEach((product) => toggleCart(product.id))}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add All to Cart
            </Button>
          </motion.div>
        )}
      </div>

      {selectedProduct && (
        <QuickView
          product={selectedProduct}
          closeQuickView={() => setSelectedProduct(null)}
          wishlist={wishlist}
          cart={cart}
          toggleWishlist={toggleWishlist}
          toggleCart={toggleCart}
        />
      )}

      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-pink-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6">Save items you love to your wishlist and they'll appear here.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-pink-400 hover:bg-pink-500 text-white rounded-full">Continue Shopping</Button>
          </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlist={wishlist}
              cart={cart}
              toggleWishlist={toggleWishlist}
              toggleCart={toggleCart}
              openQuickView={openQuickView}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}