"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useCart } from "@/components/providers/cart-provider"

import { NewArrivalsHeader } from "@/components/new-arrivals/new-arrivals-header"
import { NewArrivalsGrid } from "@/components/new-arrivals/new-arrivals-grid"
import { NewArrivalsFeatured } from "@/components/new-arrivals/new-arrivals-featured"
import { MobileSortFilter } from "@/components/shop/mobile-sort-filter"
import { QuickView } from "@/components/products/quick-view"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { MobileMenu } from "@/components/navigation/mobile-menu"
import { CartSidebar } from "@/components/cart/cart-sidebar"
import { NewsletterSection } from "@/components/sections/newsletter-section"

import type { Product } from "@/types"
import { allProducts, newArrivals } from "@/data"

export default function NewArrivalsPage() {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const { cart, toggleCart } = useCart()
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [activeSort, setActiveSort] = useState("newest")
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 500] as [number, number],
    colors: [] as string[],
    sizes: [] as string[],
    onSale: false,
    inStock: true,
  })

  // Toggle wishlist
  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id))
    } else {
      setWishlist([...wishlist, id])
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

  // Get all new arrivals
  // In a real app, you might filter by date added or a "new" flag
  const allNewArrivals = allProducts.filter(
    (product) => product.isNew || newArrivals.some((item) => item.id === product.id),
  )

  // Apply filters
  const filteredProducts = allNewArrivals.filter((product) => {
    // Filter by price range
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false
    }

    // Filter by categories
    if (filters.categories.length > 0 && !filters.categories.includes(product.category || "")) {
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
      default:
        return (b.id || 0) - (a.id || 0)
    }
  })

  // Featured new arrivals (first 3 products)
  const featuredNewArrivals = sortedProducts.slice(0, 3)

  // Regular new arrivals (rest of the products)
  const regularNewArrivals = sortedProducts.slice(3)

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

      <main>
        {/* New Arrivals Header */}
        <NewArrivalsHeader
          productCount={filteredProducts.length}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          openMobileFilter={() => setIsMobileFilterOpen(true)}
        />

        {/* Featured New Arrivals */}
        <NewArrivalsFeatured
          products={featuredNewArrivals}
          wishlist={wishlist}
          cart={cart}
          toggleWishlist={toggleWishlist}
          toggleCart={toggleCart}
          openQuickView={openQuickView}
        />

        {/* New Arrivals Grid */}
        <NewArrivalsGrid
          products={regularNewArrivals}
          wishlist={wishlist}
          cart={cart}
          toggleWishlist={toggleWishlist}
          toggleCart={toggleCart}
          openQuickView={openQuickView}
          filters={filters}
          setFilters={setFilters}
        />

        {/* Newsletter Section */}
        <NewsletterSection />
      </main>
    </div>
  )
}

