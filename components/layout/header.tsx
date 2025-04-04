"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Heart, Search, Menu, User, X } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { navigationItems } from "@/data";
import { searchProducts } from "@/lib/search";
import { allProducts } from "@/data";

interface HeaderProps {
  wishlist: number[];
  cart: number[];
  setIsMenuOpen: (isOpen: boolean) => void;
  setIsCartOpen: (isOpen: boolean) => void;
}

// Update the Header component to include search suggestions
export function Header({
  wishlist,
  cart,
  setIsMenuOpen,
  setIsCartOpen,
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [isCartOpen, setIsCartOpenState] = useState(false);

  // Scroll animations
  const { scrollY } = useScroll();
  const scrollYSpring = useSpring(scrollY);

  const headerOpacity = useTransform(scrollYSpring, [0, 50], [1, 0.98]);
  const headerBlur = useTransform(scrollYSpring, [0, 50], [0, 8]);
  const headerBackground = useMotionTemplate`rgba(255, 255, 255, ${headerOpacity})`;
  const headerBackdropBlur = useMotionTemplate`blur(${headerBlur}px)`;

  // Generate search suggestions based on input
  useEffect(() => {
    if (searchQuery.trim()) {
      // Get search results
      const results = searchProducts(allProducts, searchQuery);

      // Get unique categories from results
      const categories = Array.from(
        new Set(
          results
            .slice(0, 10)
            .map((p) => p.category)
            .filter(Boolean)
        )
      );

      // Prepare suggestions
      const suggestions = [
        ...results.slice(0, 5).map((product) => ({
          type: "product",
          id: product.id,
          name: product.name,
          category: product.category,
          image: product.image,
        })),
        ...categories.slice(0, 3).map((category) => ({
          type: "category",
          name: category,
          query: `category:${category}`,
        })),
      ];

      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Close search and suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search submission
  const handleSearch = (e?: React.FormEvent, query?: string) => {
    if (e) e.preventDefault();

    const searchTerm = query || searchQuery;
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setShowSuggestions(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setIsSearchOpen(false);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === "product") {
      handleSearch(undefined, suggestion.name);
    } else if (suggestion.type === "category") {
      handleSearch(undefined, suggestion.name);
    }
  };

  return (
    <motion.header
      className="sticky top-0 z-10 border-b"
      style={{
        backgroundColor: headerBackground,
        backdropFilter: headerBackdropBlur,
      }}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2 lg:hidden">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="text-pink-400 rounded-full hover:bg-pink-50"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </motion.div>
          </div>
          <Link href="/">
            <motion.div
              className="text-2xl font-bold text-pink-400"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              PinkShop
            </motion.div>
          </Link>
          <nav className="hidden lg:flex items-center space-x-6 mx-6">
            {navigationItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors relative ${
                      isActive
                        ? "text-pink-400"
                        : "hover:text-pink-400 text-gray-700"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-400 rounded-full"
                        layoutId="activeNavIndicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {isSearchOpen ? (
            <motion.div
              ref={searchRef}
              className="absolute inset-x-0 top-0 bg-white p-4 z-20 shadow-md"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <form
                onSubmit={handleSearch}
                className="relative w-full flex items-center"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-300 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="pl-10 pr-10 py-2 w-full border-pink-100 focus:border-pink-200 focus:ring focus:ring-pink-100 focus:ring-opacity-50 rounded-full"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-400 rounded-full"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setShowSuggestions(false);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>

              {/* Search Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && searchSuggestions.length > 0 && (
                  <motion.div
                    ref={suggestionRef}
                    className="absolute left-0 right-0 mt-2 mx-4 bg-white rounded-xl shadow-lg z-30 overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="max-h-80 overflow-y-auto py-2 custom-scrollbar">
                      {searchSuggestions.map((suggestion, index) => (
                        <div
                          key={
                            suggestion.type === "product"
                              ? `product-${suggestion.id}`
                              : `category-${index}`
                          }
                          className="px-4 py-2 hover:bg-pink-50 cursor-pointer transition-colors"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion.type === "product" ? (
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden relative flex-shrink-0">
                                <img
                                  src={suggestion.image || "/placeholder.svg"}
                                  alt={suggestion.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {suggestion.name}
                                </div>
                                {suggestion.category && (
                                  <div className="text-xs text-gray-500">
                                    {suggestion.category}
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Search className="h-4 w-4 text-gray-400" />
                              <span>
                                <span className="font-medium">Category:</span>{" "}
                                {suggestion.name}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}

                      <div className="px-4 py-2 border-t border-gray-100 mt-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-center text-pink-500 hover:text-pink-600 hover:bg-pink-50"
                          onClick={() => handleSearch()}
                        >
                          See all results for "{searchQuery}"
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="hidden md:flex items-center flex-1 max-w-md relative">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-300 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="pl-10 pr-4 py-2 w-full border-pink-100 focus:border-pink-200 focus:ring focus:ring-pink-100 focus:ring-opacity-50 rounded-full"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => {
                    if (searchQuery.trim()) {
                      setShowSuggestions(true);
                    }
                  }}
                />
              </form>

              {/* Search Suggestions Dropdown */}

              <AnimatePresence>
                {showSuggestions && searchSuggestions.length > 0 && (
                  <motion.div
                    ref={suggestionRef}
                    className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-lg z-30 overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="max-h-80 overflow-y-auto py-2 custom-scrollbar">
                      {searchSuggestions.map((suggestion, index) => (
                        <div
                          key={
                            suggestion.type === "product"
                              ? `product-${suggestion.id}`
                              : `category-${index}`
                          }
                          className="px-4 py-2 hover:bg-pink-50 cursor-pointer transition-colors"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion.type === "product" ? (
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden relative flex-shrink-0">
                                <img
                                  src={suggestion.image || "/placeholder.svg"}
                                  alt={suggestion.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {suggestion.name}
                                </div>
                                {suggestion.category && (
                                  <div className="text-xs text-gray-500">
                                    {suggestion.category}
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Search className="h-4 w-4 text-gray-400" />
                              <span>
                                <span className="font-medium">Category:</span>{" "}
                                {suggestion.name}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}

                      <div className="px-4 py-2 border-t border-gray-100 mt-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-center text-pink-500 hover:text-pink-600 hover:bg-pink-50"
                          onClick={() => handleSearch()}
                        >
                          See all results for "{searchQuery}"
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-pink-400 rounded-full md:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full relative ${
                    pathname?.startsWith("/profile")
                      ? "text-pink-400 bg-pink-50"
                      : "text-gray-700 hover:text-pink-400"
                  }`}
                >
                  <User className="h-5 w-5" />
                  {pathname?.startsWith("/profile") && (
                    <motion.span
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full"
                      layoutId="activeIconIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full relative ${
                    pathname?.startsWith("/wishlist")
                      ? "text-pink-400 bg-pink-50"
                      : "text-gray-700 hover:text-pink-400"
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      <Badge className="absolute -top-1 -right-1 bg-pink-400 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                        {wishlist.length}
                      </Badge>
                    </motion.div>
                  )}
                  {pathname?.startsWith("/wishlist") && (
                    <motion.span
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full"
                      layoutId="activeIconIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full relative ${
                  isCartOpen
                    ? "text-pink-400 bg-pink-50"
                    : "text-gray-700 hover:text-pink-400"
                }`}
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <Badge className="absolute -top-1 -right-1 bg-pink-400 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                      {cart.length}
                    </Badge>
                  </motion.div>
                )}
                {isCartOpen && (
                  <motion.span
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full"
                    layoutId="activeIconIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
