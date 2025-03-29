"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FilterSidebar } from "@/components/shop/filter-sidebar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface MobileSortFilterProps {
  isOpen: boolean
  onClose: () => void
  filters: {
    categories: string[]
    priceRange: [number, number]
    colors: string[]
    sizes: string[]
    onSale: boolean
    inStock: boolean
  }
  setFilters: (filters: any) => void
  activeSort: string
  setActiveSort: (sort: string) => void
}

export function MobileSortFilter({
  isOpen,
  onClose,
  filters,
  setFilters,
  activeSort,
  setActiveSort,
}: MobileSortFilterProps) {
  const handleSortChange = (value: string) => {
    setActiveSort(value)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-t-xl w-full h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white z-10 p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filter & Sort</h2>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="filter" className="p-4">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="filter" className="flex-1">
                  Filter
                </TabsTrigger>
                <TabsTrigger value="sort" className="flex-1">
                  Sort
                </TabsTrigger>
              </TabsList>

              <TabsContent value="filter" className="mt-0">
                <FilterSidebar filters={filters} setFilters={setFilters} />
              </TabsContent>

              <TabsContent value="sort" className="mt-0">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-medium mb-4">Sort By</h3>

                  <RadioGroup value={activeSort} onValueChange={handleSortChange}>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="featured" id="featured" />
                        <Label htmlFor="featured">Featured</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="newest" id="newest" />
                        <Label htmlFor="newest">Newest</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="price-low-high" id="price-low-high" />
                        <Label htmlFor="price-low-high">Price: Low to High</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="price-high-low" id="price-high-low" />
                        <Label htmlFor="price-high-low">Price: High to Low</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>
            </Tabs>

            <div className="sticky bottom-0 bg-white border-t p-4">
              <Button className="w-full bg-pink-400 hover:bg-pink-500 text-white rounded-full" onClick={onClose}>
                Apply
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

