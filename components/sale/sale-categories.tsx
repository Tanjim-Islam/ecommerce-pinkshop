"use client"

import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

interface SaleCategoriesProps {
  categories: string[]
  activeCategory: string | null
  setActiveCategory: (category: string | null) => void
}

export function SaleCategories({ categories, activeCategory, setActiveCategory }: SaleCategoriesProps) {
  if (categories.length === 0) return null

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-xl font-semibold mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Shop Sale by Category
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              className={`rounded-full ${
                activeCategory === null
                  ? "bg-pink-400 hover:bg-pink-500"
                  : "border-pink-200 text-pink-500 hover:bg-pink-50"
              }`}
              onClick={() => setActiveCategory(null)}
            >
              All Sale
            </Button>
          </motion.div>

          {categories.map((category, index) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            >
              <Button
                variant={activeCategory === category ? "default" : "outline"}
                className={`rounded-full ${
                  activeCategory === category
                    ? "bg-pink-400 hover:bg-pink-500"
                    : "border-pink-200 text-pink-500 hover:bg-pink-50"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

