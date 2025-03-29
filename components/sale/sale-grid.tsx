"use client"

import { motion } from "framer-motion"
import { FilterSidebar } from "@/components/shop/filter-sidebar"
import { SaleProductCard } from "@/components/sale/sale-product-card"
import type { Product } from "@/types"

interface SaleGridProps {
  products: Product[]
  wishlist: number[]
  cart: number[]
  toggleWishlist: (id: number) => void
  toggleCart: (id: number) => void
  openQuickView: (product: Product) => void
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

export function SaleGrid({
  products,
  wishlist,
  cart,
  toggleWishlist,
  toggleCart,
  openQuickView,
  filters,
  setFilters,
}: SaleGridProps) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Sale Items
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <SaleProductCard
                    key={product.id}
                    product={product}
                    wishlist={wishlist}
                    cart={cart}
                    toggleWishlist={toggleWishlist}
                    toggleCart={toggleCart}
                    openQuickView={openQuickView}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No sale items match your filters. Try adjusting your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

