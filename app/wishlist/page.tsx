"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { QuickView } from "@/components/products/quick-view";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { useCart } from "@/components/providers/cart-provider";

import type { Product } from "@/types";
import { allProducts } from "@/data";

export default function WishlistPage() {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([1, 3, 5, 7]); // Sample wishlist items
  const { cart, toggleCart, clearCart } = useCart();
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

  // Get wishlist products
  const wishlistProducts = allProducts.filter((product) =>
    wishlist.includes(product.id)
  );

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

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        cart={cart}
        products={allProducts}
        toggleCart={toggleCart}
        clearCart={clearCart}
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

      <main className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-white rounded-2xl shadow-sm p-6 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                My Wishlist
              </h1>

              {wishlistProducts.length > 0 && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="border-pink-400 text-pink-500 hover:bg-pink-50 rounded-full"
                    onClick={() =>
                      wishlistProducts.forEach((product) =>
                        toggleCart(product.id)
                      )
                    }
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add All to Cart
                  </Button>
                </motion.div>
              )}
            </div>

            {wishlistProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-pink-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Save items you love to your wishlist and they'll appear here.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/shop">
                    <Button className="bg-pink-400 hover:bg-pink-500 text-white rounded-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </motion.div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistProducts.map((product) => (
                  <ProductCard
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
            )}
          </motion.div>

          {wishlistProducts.length > 0 && (
            <motion.div
              className="bg-white rounded-2xl shadow-sm p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Wishlist Tips
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 font-bold">•</span>
                  <span>
                    Items in your wishlist will be saved for future visits
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 font-bold">•</span>
                  <span>You'll be notified when wishlist items go on sale</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 font-bold">•</span>
                  <span>
                    Share your wishlist with friends and family for gift ideas
                  </span>
                </li>
              </ul>
            </motion.div>
          )}
        </div>

        {/* Newsletter Section */}
        <NewsletterSection />
      </main>
    </div>
  );
}
