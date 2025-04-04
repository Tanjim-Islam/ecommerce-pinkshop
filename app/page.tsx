"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { HeaderWrapper } from "@/components/layout/header-wrapper";
import { Footer } from "@/components/layout/footer";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { QuickView } from "@/components/products/quick-view";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { HeroSection } from "@/components/sections/hero-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { CategoriesSection } from "@/components/sections/categories-section";
import { ProductsSection } from "@/components/sections/products-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { useCart } from "@/components/providers/cart-provider";

import type { Product } from "@/types";
import { featuredProducts, newArrivals } from "@/data";

export default function HomePage() {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { cart, toggleCart, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );

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

  // All products for cart
  const allProducts = [...featuredProducts, ...newArrivals];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Scroll to Top Button */}
      <ScrollToTop />

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

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        wishlist={wishlist}
        cart={cart}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Header */}
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Categories */}
        <CategoriesSection />

        {/* Featured Products */}
        <ProductsSection
          title="Featured Products"
          products={featuredProducts}
          wishlist={wishlist}
          cart={cart}
          toggleWishlist={toggleWishlist}
          toggleCart={toggleCart}
          openQuickView={openQuickView}
          bgColor="bg-pink-50"
        />

        {/* New Arrivals */}
        <ProductsSection
          title="New Arrivals"
          products={newArrivals}
          wishlist={wishlist}
          cart={cart}
          toggleWishlist={toggleWishlist}
          toggleCart={toggleCart}
          openQuickView={openQuickView}
        />

        {/* Newsletter */}
        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
