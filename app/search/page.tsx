"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon, Filter, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductGrid } from "@/components/shop/product-grid";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { MobileSortFilter } from "@/components/shop/mobile-sort-filter";
import { QuickView } from "@/components/products/quick-view";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { MobileMenu } from "@/components/navigation/mobile-menu";

import { searchProducts } from "@/lib/search";
import { useCart } from "@/components/providers/cart-provider";

import type { Product } from "@/types";
import { allProducts } from "@/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { cart, toggleCart, clearCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const [activeSort, setActiveSort] = useState("relevance");
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 500] as [number, number],
    colors: [] as string[],
    sizes: [] as string[],
    onSale: false,
    inStock: true,
  });

  // Perform search when query changes
  useEffect(() => {
    if (queryParam) {
      const results = searchProducts(allProducts, queryParam);
      setSearchResults(results);
      setSearchQuery(queryParam); // Update search query state when URL parameter changes
    } else {
      setSearchResults([]);
      setSearchQuery(""); // Clear search query when URL parameter is empty
    }
  }, [queryParam]);

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
  const filteredProducts = searchResults.filter((product) => {
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
      case "relevance":
      default:
        return 0; // Already sorted by relevance from the search algorithm
    }
  });

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(
        searchQuery.trim()
      )}`;
    }
  };

  // Get search suggestions based on categories
  const getSearchSuggestions = () => {
    const categories = Array.from(
      new Set(allProducts.map((p) => p.category).filter(Boolean))
    );
    return categories.slice(0, 5);
  };

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

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Search Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <motion.h1
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Search Results
            </motion.h1>

            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-300 h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="pl-10 pr-4 py-3 w-full border-pink-100 focus:border-pink-200 focus:ring focus:ring-pink-100 focus:ring-opacity-50 rounded-full text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-400 rounded-full"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  type="submit"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-pink-400 hover:bg-pink-500 text-white rounded-full"
                >
                  Search
                </Button>
              </div>
            </form>

            {queryParam ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-gray-600 mb-2">
                  {`Showing ${sortedProducts.length} results for "${queryParam}"`}
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-gray-600">
                  Enter a search term to find products
                </p>
              </motion.div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-pink-400 hover:text-pink-500 p-0 h-auto"
                    onClick={() =>
                      setFilters({
                        categories: [],
                        priceRange: [0, 500],
                        colors: [],
                        sizes: [],
                        onSale: false,
                        inStock: true,
                      })
                    }
                  >
                    Clear All
                  </Button>
                </div>
                <FilterSidebar filters={filters} setFilters={setFilters} />
              </div>
            </div>

            {/* Product Grid or No Results Message */}
            <div className="flex-1">
              {sortedProducts.length > 0 ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden flex items-center gap-1"
                        onClick={() => setIsMobileFilterOpen(true)}
                      >
                        <Filter className="h-4 w-4" />
                        Filter & Sort
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Sort by:</span>
                      <Select value={activeSort} onValueChange={setActiveSort}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Relevance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Relevance</SelectItem>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="price-low-high">
                            Price: Low to High
                          </SelectItem>
                          <SelectItem value="price-high-low">
                            Price: High to Low
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <ProductGrid
                    products={sortedProducts}
                    wishlist={wishlist}
                    cart={cart}
                    toggleWishlist={toggleWishlist}
                    toggleCart={toggleCart}
                    openQuickView={openQuickView}
                    viewMode={activeView}
                  />
                </>
              ) : (
                queryParam && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <p className="text-gray-600 mb-4">
                      No results found for "{queryParam}"
                    </p>

                    {/* Show applied filters if any */}
                    {(filters.categories.length > 0 ||
                      filters.colors.length > 0 ||
                      filters.sizes.length > 0 ||
                      filters.onSale ||
                      filters.priceRange[0] > 0 ||
                      filters.priceRange[1] < 500) && (
                      <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Applied filters:
                        </h3>
                        <ul className="text-gray-600 list-disc pl-5 space-y-1">
                          {filters.categories.length > 0 && (
                            <li>Categories: {filters.categories.join(", ")}</li>
                          )}
                          {filters.colors.length > 0 && (
                            <li>
                              Colors:{" "}
                              {filters.colors
                                .map(
                                  (color) =>
                                    color.charAt(0).toUpperCase() +
                                    color.slice(1)
                                )
                                .join(", ")}
                            </li>
                          )}
                          {filters.sizes.length > 0 && (
                            <li>Sizes: {filters.sizes.join(", ")}</li>
                          )}
                          {(filters.priceRange[0] > 0 ||
                            filters.priceRange[1] < 500) && (
                            <li>
                              Price range: ${filters.priceRange[0]} - $
                              {filters.priceRange[1]}
                            </li>
                          )}
                          {filters.onSale && <li>On sale items only</li>}
                          {filters.inStock && <li>In stock items only</li>}
                        </ul>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 text-pink-400 hover:text-pink-500 border-pink-200"
                          onClick={() =>
                            setFilters({
                              categories: [],
                              priceRange: [0, 500],
                              colors: [],
                              sizes: [],
                              onSale: false,
                              inStock: true,
                            })
                          }
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}

                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Search suggestions:
                    </h3>
                    <ul className="text-gray-600 list-disc pl-5 space-y-1">
                      <li>Check the spelling of your search term</li>
                      <li>Try using more general keywords</li>
                      <li>Try searching for related terms</li>
                    </ul>

                    <div className="mt-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Browse by category:
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {getSearchSuggestions().map((category) => (
                          <Button
                            key={category}
                            variant="outline"
                            className="rounded-full border-pink-200 text-pink-500 hover:bg-pink-50"
                            onClick={() => {
                              window.location.href = `/search?q=${encodeURIComponent(
                                category || ""
                              )}`;
                            }}
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
