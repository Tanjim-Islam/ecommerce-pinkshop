"use client"

import { motion } from "framer-motion"
import { SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SaleCountdown } from "@/components/sale/sale-countdown"

interface SaleHeaderProps {
  productCount: number
  activeSort: string
  setActiveSort: (sort: string) => void
  openMobileFilter: () => void
}

export function SaleHeader({ productCount, activeSort, setActiveSort, openMobileFilter }: SaleHeaderProps) {
  // Set end date for the sale (2 weeks from now)
  const saleEndDate = new Date()
  saleEndDate.setDate(saleEndDate.getDate() + 14)

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
            Sale
          </motion.h1>

          <motion.p
            className="text-gray-600 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Enjoy up to 50% off on selected items. Limited time offer!
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SaleCountdown targetDate={saleEndDate} />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm max-w-md mx-auto mt-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={openMobileFilter}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filter & Sort
              </Button>
            </div>

            <div className="flex items-center gap-2 w-full justify-center">
              <span className="text-sm text-gray-500">Sort by:</span>
              <Select value={activeSort} onValueChange={setActiveSort}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Discount: High to Low" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount-high-low">
                    Discount: High to Low
                  </SelectItem>
                  <SelectItem value="price-low-high">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high-low">
                    Price: High to Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <motion.div
            className="mt-4 text-sm text-gray-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Showing {productCount} sale items
          </motion.div>
        </div>
      </div>
    </section>
  );
}

