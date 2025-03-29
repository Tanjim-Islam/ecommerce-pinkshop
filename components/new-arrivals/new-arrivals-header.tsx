"use client"

import { motion } from "framer-motion"
import { SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewArrivalsHeaderProps {
  productCount: number
  activeSort: string
  setActiveSort: (sort: string) => void
  openMobileFilter: () => void
}

export function NewArrivalsHeader({
  productCount,
  activeSort,
  setActiveSort,
  openMobileFilter,
}: NewArrivalsHeaderProps) {
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
            New Arrivals
          </motion.h1>

          <motion.p
            className="text-gray-600 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover our latest fashion pieces and stay ahead of the trends
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm max-w-md mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="md:hidden" onClick={openMobileFilter}>
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filter & Sort
              </Button>
            </div>

            <div className="flex items-center gap-2 w-full justify-center">
              <span className="text-sm text-gray-500">Sort by:</span>
              <Select value={activeSort} onValueChange={setActiveSort}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Newest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <motion.div
            className="mt-4 text-sm text-gray-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Showing {productCount} new arrivals
          </motion.div>
        </div>
      </div>
    </section>
  )
}

