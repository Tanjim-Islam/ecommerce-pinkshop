"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useCart } from "@/components/providers/cart-provider";

import { SaleHeader } from "@/components/sale/sale-header";
import { SaleBanner } from "@/components/sale/sale-banner";
import { SaleGrid } from "@/components/sale/sale-grid";
import { SaleCategories } from "@/components/sale/sale-categories";
import { MobileSortFilter } from "@/components/shop/mobile-sort-filter";
import { QuickView } from "@/components/products/quick-view";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { NewsletterSection } from "@/components/sections/newsletter-section";

import type { Product } from "@/types";
import { allProducts } from "@/data";

export default function SalePage() {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { cart, toggleCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("discount-high-low");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 500] as [number, number],
    colors: [] as string[],
    sizes: [] as string[],
    onSale: true,
    inStock: true,
  });

  // Toggle wishlist
  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  // Open quick view
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    document.body.style.overflow = "hidden";
  };

  // Close quick view
  const closeQuickView = () => {
    setQuickViewProduct(null);
    document.body.style.overflow = "auto";
  };

  // Get all sale products
  const saleProducts = allProducts.filter(
    (product) => product.discount || product.originalPrice
  );

  // Apply filters
  const filteredProducts = saleProducts.filter((product) => {
    // Filter by price range
    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    ) {
      return false;
    }

    // Filter by categories
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category || "")
    ) {
      return false;
    }

    // Filter by colors
    if (
      filters.colors.length > 0 &&
      !filters.colors.includes(product.color || "")
    ) {
      return false;
    }

    // Filter by sizes
    if (
      filters.sizes.length > 0 &&
      !filters.sizes.includes(product.size || "")
    ) {
      return false;
    }

    // Filter by stock
    if (filters.inStock && !product.inStock) {
      return false;
    }

    // Filter by active category
    if (activeCategory && product.category !== activeCategory) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (activeSort) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "discount-high-low":
        const discountA = a.discount || 0;
        const discountB = b.discount || 0;
        return discountB - discountA;
      default:
        return 0;
    }
  });

  // Get products by category for the category section
  const getProductsByCategory = (category: string) => {
    return saleProducts.filter((product) => product.category === category);
  };

  // Get unique categories from sale products
  const saleCategories = Array.from(
    new Set(saleProducts.map((product) => product.category))
  ).filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        wishlist={wishlist}
        cart={cart}
        onClose={() => setIsMenuOpen(false)}
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
        {/* Sale Header */}
        <SaleHeader
          productCount={filteredProducts.length}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          openMobileFilter={() => setIsMobileFilterOpen(true)}
        />

        {/* Sale Banner */}
        <SaleBanner />

        {/* Sale Categories */}
        <SaleCategories
          categories={saleCategories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Sale Grid */}
        <SaleGrid
          products={sortedProducts}
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
  );
}
