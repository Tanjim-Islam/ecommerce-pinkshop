"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useCart } from "@/components/providers/cart-provider";

import { ShopHeader } from "@/components/shop/shop-header";
import { ProductGrid } from "@/components/shop/product-grid";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { MobileSortFilter } from "@/components/shop/mobile-sort-filter";
import { QuickView } from "@/components/products/quick-view";
import { Pagination } from "@/components/shop/pagination";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { CartSidebar } from "@/components/cart/cart-sidebar";

import type { Product } from "@/types";
import { allProducts } from "@/data";

export default function ShopPage() {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { cart, toggleCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const [activeSort, setActiveSort] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 500] as [number, number],
    colors: [] as string[],
    sizes: [] as string[],
    onSale: false,
    inStock: false,
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

  // Apply filters
  const filteredProducts = allProducts.filter((product) => {
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

    // Filter by sale
    if (filters.onSale && !product.discount) {
      return false;
    }

    // Filter by stock
    if (filters.inStock && !product.inStock) {
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
      case "newest":
        return (b.id || 0) - (a.id || 0);
      default:
        return 0;
    }
  });

  // Pagination
  const productsPerPage = 12;
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
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

      <div className="container mx-auto px-4 py-8">
        {/* Shop Header */}
        <ShopHeader
          totalProducts={filteredProducts.length}
          activeView={activeView}
          setActiveView={setActiveView}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          openMobileFilter={() => setIsMobileFilterOpen(true)}
        />

        <div className="flex flex-col md:flex-row gap-8 mt-6">
          {/* Filter Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
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
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
