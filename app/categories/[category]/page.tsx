"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { AnimatePresence } from "framer-motion"

import { CategoryDetailHeader } from "@/components/categories/category-detail-header"
import { ProductGrid } from "@/components/shop/product-grid"
import { FilterSidebar } from "@/components/shop/filter-sidebar"
import { MobileSortFilter } from "@/components/shop/mobile-sort-filter"
import { QuickView } from "@/components/products/quick-view"
import { Pagination } from "@/components/shop/pagination"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { MobileMenu } from "@/components/navigation/mobile-menu"
import { CartSidebar } from "@/components/cart/cart-sidebar"

import type { Product } from "@/types"
import { allProducts, categories } from "@/data"

export default function CategoryDetailPage() {
  const params = useParams()
  const categorySlug = params.category as string

  // Find the category from the slug
  const category = categories.find((cat) => cat.name.toLowerCase() === categorySlug)

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [cart, setCart] = useState<number[]>([])
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [activeView, setActiveView] = useState<"grid" | "list">("grid")
  const [activeSort, setActiveSort] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 500] as [number, number],
    colors: [] as string[],
    sizes: [] as string[],
    onSale: false,
    inStock: false,
  })

  // Set the category filter on load
  useEffect(() => {
    if (category) {
      setFilters((prev) => ({
        ...prev,
        categories: [category.name],
      }))
    }
  }, [category])

  // Toggle wishlist
  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id))
    } else {
      setWishlist([...wishlist, id])
    }
  }

  // Toggle cart
  const toggleCart = (id: number) => {
    if (cart.includes(id)) {
      setCart(cart.filter((item) => item !== id))
    } else {
      setCart([...cart, id])
    }
  }

  // Open quick view
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product)
    document.body.style.overflow = "hidden"
  }

  // Close quick view
  const closeQuickView = () => {
    setQuickViewProduct(null)
    document.body.style.overflow = "auto"
  }

  // Get products for this category
  const categoryProducts = allProducts.filter((product) => product.category?.toLowerCase() === categorySlug)

  // Apply filters
  const filteredProducts = categoryProducts.filter((product) => {
    // Filter by price range
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false
    }

    // Filter by colors
    if (filters.colors.length > 0 && !filters.colors.includes(product.color || "")) {
      return false
    }

    // Filter by sizes
    if (filters.sizes.length > 0 && !filters.sizes.includes(product.size || "")) {
      return false
    }

    // Filter by sale
    if (filters.onSale && !product.discount) {
      return false
    }

    // Filter by stock
    if (filters.inStock && !product.inStock) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (activeSort) {
      case "price-low-high":
        return a.price - b.price
      case "price-high-low":
        return b.price - a.price
      case "newest":
        return (b.id || 0) - (a.id || 0)
      default:
        return 0
    }
  })

  // Pagination
  const productsPerPage = 8
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)

  if (!category) {
    return <div className="container mx-auto px-4 py-12">Category not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} wishlist={wishlist} cart={cart} onClose={() => setIsMenuOpen(false)} />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        cart={cart}
        products={allProducts}
        toggleCart={toggleCart}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickView
            product={quickViewProduct}
            wishlist={wishlist}
            cart={cart}
            toggleWishlist={toggleWishlist}
            toggleCart={toggleCart}
            closeQuickView={closeQuickView}
          />
        )}
      </AnimatePresence>

      {/* Mobile Filter/Sort */}
      <MobileSortFilter
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
      />

      {/* Category Header */}
      <CategoryDetailHeader category={category} productCount={filteredProducts.length} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          {/* Filter Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center gap-2">
                <button className="md:hidden text-sm text-gray-600" onClick={() => setIsMobileFilterOpen(true)}>
                  Filter & Sort
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={activeSort}
                  onChange={(e) => setActiveSort(e.target.value)}
                  className="text-sm border-gray-200 rounded-md"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>
            </div>

            <ProductGrid
              products={paginatedProducts}
              wishlist={wishlist}
              cart={cart}
              toggleWishlist={toggleWishlist}
              toggleCart={toggleCart}
              openQuickView={openQuickView}
              viewMode={activeView}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

