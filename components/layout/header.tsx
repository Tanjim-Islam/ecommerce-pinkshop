"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Heart, Search, Menu, User, X } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { navigationItems } from "@/data";

interface HeaderProps {
  wishlist: number[];
  cart: number[];
  setIsMenuOpen: (isOpen: boolean) => void;
  setIsCartOpen: (isOpen: boolean) => void;
}

export function Header({
  wishlist,
  cart,
  setIsMenuOpen,
  setIsCartOpen,
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Scroll animations
  const { scrollY } = useScroll();
  const scrollYSpring = useSpring(scrollY);

  const headerOpacity = useTransform(scrollYSpring, [0, 50], [1, 0.98]);
  const headerBlur = useTransform(scrollYSpring, [0, 50], [0, 8]);
  const headerBackground = useMotionTemplate`rgba(255, 255, 255, ${headerOpacity})`;
  const headerBackdropBlur = useMotionTemplate`blur(${headerBlur}px)`;

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              <div className="relative w-full flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-300 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="pl-10 pr-10 py-2 w-full border-pink-100 focus:border-pink-200 focus:ring focus:ring-pink-100 focus:ring-opacity-50 rounded-full"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-400 rounded-full"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="hidden md:flex items-center flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-300 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="pl-10 pr-4 py-2 w-full border-pink-100 focus:border-pink-200 focus:ring focus:ring-pink-100 focus:ring-opacity-50 rounded-full"
                />
              </div>
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
                  className="text-gray-700 hover:text-pink-400 rounded-full"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-pink-400 rounded-full relative"
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
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-pink-400 rounded-full relative"
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
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
