"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useCart } from "@/components/providers/cart-provider"

import { CategoryHeader } from "@/components/categories/category-header"
import { CategoryGrid } from "@/components/categories/category-grid"
import { FeaturedCategorySection } from "@/components/categories/featured-category-section"
import { MobileMenu } from "@/components/navigation/mobile-menu"
import { QuickView } from "@/components/products/quick-view"
import { ScrollToTop } from "@/components/ui/scroll-to-top"

import type { Product } from "@/types"
import { allProducts, categories } from "@/data"

export default function CategoriesPage() {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const { cart, toggleCart } = useCart()
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

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

  // Get products by category
  const getProductsByCategory = (category: string) => {
    return allProducts.filter((product) => product.category === category).slice(0, 4)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} wishlist={wishlist} cart={cart} onClose={() => setIsMenuOpen(false)} />


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

      <main>
        {/* Category Header */}
        <CategoryHeader activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        {/* Category Grid */}
        <div className="container mx-auto px-4 py-12">
          <CategoryGrid categories={categories} onCategoryClick={(category) => setActiveCategory(category)} />
        </div>

        {/* Featured Categories Sections */}
        {categories.map((category) => (
          <FeaturedCategorySection
            key={category.name}
            category={category}
            products={getProductsByCategory(category.name)}
            wishlist={wishlist}
            cart={cart}
            toggleWishlist={toggleWishlist}
            toggleCart={toggleCart}
            openQuickView={openQuickView}
          />
        ))}
      </main>
    </div>
  )
}

