"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

interface FilterSidebarProps {
  filters: {
    categories: string[]
    priceRange: [number, number]
    colors: string[]
    sizes: string[]
    onSale: boolean
    inStock: boolean
  }
  setFilters: (filters: any) => void
}

export function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    colors: true,
    sizes: true,
    other: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const handleCategoryChange = (category: string) => {
    if (filters.categories.includes(category)) {
      setFilters({
        ...filters,
        categories: filters.categories.filter((c) => c !== category),
      })
    } else {
      setFilters({
        ...filters,
        categories: [...filters.categories, category],
      })
    }
  }

  const handleColorChange = (color: string) => {
    if (filters.colors.includes(color)) {
      setFilters({
        ...filters,
        colors: filters.colors.filter((c) => c !== color),
      })
    } else {
      setFilters({
        ...filters,
        colors: [...filters.colors, color],
      })
    }
  }

  const handleSizeChange = (size: string) => {
    if (filters.sizes.includes(size)) {
      setFilters({
        ...filters,
        sizes: filters.sizes.filter((s) => s !== size),
      })
    } else {
      setFilters({
        ...filters,
        sizes: [...filters.sizes, size],
      })
    }
  }

  const handlePriceChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: [value[0], value[1]],
    })
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 500],
      colors: [],
      sizes: [],
      onSale: false,
      inStock: false,
    })
  }

  const categories = ["Dresses", "Tops", "Bottoms", "Accessories", "Shoes"]
  const colors = [
    { name: "Pink", value: "pink" },
    { name: "White", value: "white" },
    { name: "Black", value: "black" },
    { name: "Blue", value: "blue" },
    { name: "Red", value: "red" },
  ]
  const sizes = ["XS", "S", "M", "L", "XL"]

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-pink-400 hover:text-pink-500 p-0 h-auto"
          onClick={clearAllFilters}
        >
          Clear All
        </Button>
      </div>

      <Separator className="mb-4" />

      {/* Categories */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full text-left font-medium mb-2"
          onClick={() => toggleSection("categories")}
        >
          Categories
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.categories ? "rotate-180" : ""}`} />
        </button>

        {expandedSections.categories && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 ml-1"
          >
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={`category-${category}`} className="text-sm text-gray-700 cursor-pointer">
                  {category}
                </label>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <Separator className="mb-4" />

      {/* Price Range */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full text-left font-medium mb-2"
          onClick={() => toggleSection("price")}
        >
          Price Range
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.price ? "rotate-180" : ""}`} />
        </button>

        {expandedSections.price && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 px-1"
          >
            <Slider
              defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
              max={500}
              step={10}
              onValueChange={handlePriceChange}
              className="mt-6"
            />

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">${filters.priceRange[0]}</span>
              <span className="text-sm text-gray-700">${filters.priceRange[1]}</span>
            </div>
          </motion.div>
        )}
      </div>

      <Separator className="mb-4" />

      {/* Colors */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full text-left font-medium mb-2"
          onClick={() => toggleSection("colors")}
        >
          Colors
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.colors ? "rotate-180" : ""}`} />
        </button>

        {expandedSections.colors && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 ml-1"
          >
            {colors.map((color) => (
              <div key={color.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color.value}`}
                  checked={filters.colors.includes(color.value)}
                  onCheckedChange={() => handleColorChange(color.value)}
                />
                <label
                  htmlFor={`color-${color.value}`}
                  className="text-sm text-gray-700 cursor-pointer flex items-center"
                >
                  <span
                    className={`inline-block w-4 h-4 rounded-full mr-2 border border-gray-200 bg-${color.value === "white" ? "white" : color.value}-400`}
                  ></span>
                  {color.name}
                </label>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <Separator className="mb-4" />

      {/* Sizes */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full text-left font-medium mb-2"
          onClick={() => toggleSection("sizes")}
        >
          Sizes
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.sizes ? "rotate-180" : ""}`} />
        </button>

        {expandedSections.sizes && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 ml-1"
          >
            {sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={filters.sizes.includes(size)}
                  onCheckedChange={() => handleSizeChange(size)}
                />
                <label htmlFor={`size-${size}`} className="text-sm text-gray-700 cursor-pointer">
                  {size}
                </label>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <Separator className="mb-4" />

      {/* Other Filters */}
      <div>
        <button
          className="flex items-center justify-between w-full text-left font-medium mb-2"
          onClick={() => toggleSection("other")}
        >
          Other Filters
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.other ? "rotate-180" : ""}`} />
        </button>

        {expandedSections.other && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 ml-1"
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                id="on-sale"
                checked={filters.onSale}
                onCheckedChange={() => setFilters({ ...filters, onSale: !filters.onSale })}
              />
              <label htmlFor="on-sale" className="text-sm text-gray-700 cursor-pointer">
                On Sale
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={filters.inStock}
                onCheckedChange={() => setFilters({ ...filters, inStock: !filters.inStock })}
              />
              <label htmlFor="in-stock" className="text-sm text-gray-700 cursor-pointer">
                In Stock
              </label>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

