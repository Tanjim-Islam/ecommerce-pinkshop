"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductDetail } from "@/components/products/product-detail";
import { ProductsSection } from "@/components/sections/products-section";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { allProducts } from "@/data";
import type { Product } from "@/types";
import { Footer } from "@/components/layout/footer";

export default function ProductPage() {
  // Get product ID from URL
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);

  // State for product, cart, and wishlist
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Find the product based on ID
  useEffect(() => {
    const foundProduct = allProducts.find((p) => p.id === productId);
    setProduct(foundProduct || null);
    setIsLoading(false);

    // Load cart and wishlist from localStorage
    const savedCart = localStorage.getItem("cart");
    const savedWishlist = localStorage.getItem("wishlist");

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, [productId]);

  // Toggle cart function
  const toggleCart = (id: number) => {
    setCart((prevCart) => {
      const newCart = prevCart.includes(id)
        ? prevCart.filter((itemId) => itemId !== id)
        : [...prevCart, id];

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });

    // Open cart sidebar when adding to cart
    if (!cart.includes(id)) {
      setIsCartOpen(true);
    }
  };

  // Clear cart function
  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  // Toggle wishlist function
  const toggleWishlist = (id: number) => {
    setWishlist((prevWishlist) => {
      const newWishlist = prevWishlist.includes(id)
        ? prevWishlist.filter((itemId) => itemId !== id)
        : [...prevWishlist, id];

      // Save to localStorage
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  // Get related products (same category)
  const relatedProducts = product
    ? allProducts
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  // Handle back button click
  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded-full mb-8"></div>
          <div className="h-64 w-full max-w-md bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Product Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The product you are looking for does not exist or has been removed.
        </p>
        <Button
          onClick={handleBack}
          className="bg-pink-400 hover:bg-pink-500 text-white rounded-full"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        cart={cart}
        products={allProducts}
        toggleCart={toggleCart}
        clearCart={clearCart}
        onClose={() => setIsCartOpen(false)}
      />

      <div className="container mx-auto py-8 px-4">
        {/* Back button */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            className="flex items-center text-gray-600 hover:text-pink-500 rounded-full"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </motion.div>

        {/* Product Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProductDetail
            product={product}
            wishlist={wishlist}
            cart={cart}
            toggleWishlist={toggleWishlist}
            toggleCart={toggleCart}
          />
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              You May Also Like
            </h2>
            <ProductsSection
              products={relatedProducts}
              wishlist={wishlist}
              cart={cart}
              toggleWishlist={toggleWishlist}
              toggleCart={toggleCart}
              showHeading={false}
            />
          </motion.div>
        )}
      </div>
      {/* === CHANGE 2: Add footer to product page === */}
      {/* Import and include the Footer component */}
      <div className="mt-16">
        <Footer />
      </div>

      {/* Cart sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        cart={cart}
        products={allProducts}
        toggleCart={toggleCart}
        clearCart={clearCart}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}
