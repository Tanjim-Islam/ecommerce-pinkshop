"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

interface CategoryHeaderProps {
  activeCategory: string | null
  setActiveCategory: (category: string | null) => void
}

export function CategoryHeader({ activeCategory, setActiveCategory }: CategoryHeaderProps) {
  return (
    <section className="bg-gradient-to-r from-pink-50 to-pink-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeCategory ? activeCategory : "Shop by Category"}
          </motion.h1>

          <motion.p
            className="text-gray-600 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {activeCategory
              ? `Browse our collection of ${activeCategory.toLowerCase()} and find your perfect style.`
              : "Explore our wide range of fashion categories and discover your perfect look."}
          </motion.p>

          <motion.div
            className="relative max-w-md mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-300 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="pl-10 pr-4 py-2 w-full border-pink-100 focus:border-pink-200 focus:ring focus:ring-pink-100 focus:ring-opacity-50 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

