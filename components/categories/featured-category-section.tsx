"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ChevronRight } from "lucide-react"

import { ProductCard } from "@/components/products/product-card"
import type { Product, Category } from "@/types"

interface FeaturedCategorySectionProps {
  category: Category
  products: Product[]
  wishlist: number[]
  cart: number[]
  toggleWishlist: (id: number) => void
  toggleCart: (id: number) => void
  openQuickView: (product: Product) => void
}

export function FeaturedCategorySection({
  category,
  products,
  wishlist,
  cart,
  toggleWishlist,
  toggleCart,
  openQuickView,
}: FeaturedCategorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // If no products in this category, don't render the section
  if (products.length === 0) return null

  return (
    <section className={`py-12 ${products.length % 2 === 0 ? "bg-white" : "bg-pink-50"}`} ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {category.name}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            whileHover={{ x: 5 }}
          >
            <Link
              href={`/categories/${category.name.toLowerCase()}`}
              className="text-pink-400 hover:text-pink-500 flex items-center gap-1 text-sm font-medium"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
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
      </div>
    </section>
  )
}

