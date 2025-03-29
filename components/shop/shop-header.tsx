"use client"

import { motion } from "framer-motion"
import { Grid, List, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ShopHeaderProps {
  totalProducts: number
  activeView: "grid" | "list"
  setActiveView: (view: "grid" | "list") => void
  activeSort: string
  setActiveSort: (sort: string) => void
  openMobileFilter: () => void
}

export function ShopHeader({
  totalProducts,
  activeView,
  setActiveView,
  activeSort,
  setActiveSort,
  openMobileFilter,
}: ShopHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Shop
        </motion.h1>

        <motion.p
          className="text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Showing {totalProducts} products
        </motion.p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="md:hidden" onClick={openMobileFilter}>
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filter & Sort
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant={activeView === "grid" ? "default" : "outline"}
              size="icon"
              className={`rounded-md ${activeView === "grid" ? "bg-pink-400 hover:bg-pink-500" : ""}`}
              onClick={() => setActiveView("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={activeView === "list" ? "default" : "outline"}
              size="icon"
              className={`rounded-md ${activeView === "list" ? "bg-pink-400 hover:bg-pink-500" : ""}`}
              onClick={() => setActiveView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <Select value={activeSort} onValueChange={setActiveSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

