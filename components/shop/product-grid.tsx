"use client"

import { motion } from "framer-motion"

import { ProductCard } from "@/components/products/product-card"
import { ProductListItem } from "@/components/shop/product-list-item"
import type { Product } from "@/types"

interface ProductGridProps {
  products: Product[]
  wishlist: number[]
  cart: number[]
  toggleWishlist: (id: number) => void
  toggleCart: (id: number) => void
  openQuickView: (product: Product) => void
  viewMode: "grid" | "list"
}

export function ProductGrid({
  products,
  wishlist,
  cart,
  toggleWishlist,
  toggleCart,
  openQuickView,
  viewMode,
}: ProductGridProps) {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-pink-400 mb-4"
        >
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>
        <motion.h3
          className="text-xl font-semibold text-gray-900 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          No products found
        </motion.h3>
        <motion.p
          className="text-gray-500 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Try adjusting your filters or search criteria to find what you're looking for.
        </motion.p>
      </div>
    )
  }

  return (
    <>
      {viewMode === "grid" ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
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
        </motion.div>
      ) : (
        <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" animate="visible">
          {products.map((product) => (
            <ProductListItem
              key={product.id}
              product={product}
              wishlist={wishlist}
              cart={cart}
              toggleWishlist={toggleWishlist}
              toggleCart={toggleCart}
              openQuickView={openQuickView}
            />
          ))}
        </motion.div>
      )}
    </>
  )
}

