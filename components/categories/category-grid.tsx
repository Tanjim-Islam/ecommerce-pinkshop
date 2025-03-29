"use client"

import { motion } from "framer-motion"
import { CategoryCard } from "@/components/categories/category-card"
import type { Category } from "@/types"

interface CategoryGridProps {
  categories: Category[]
  onCategoryClick: (category: string) => void
}

export function CategoryGrid({ categories, onCategoryClick }: CategoryGridProps) {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <>
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Explore Our Categories
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} onClick={() => onCategoryClick(category.name)} />
        ))}
      </motion.div>
    </>
  )
}

