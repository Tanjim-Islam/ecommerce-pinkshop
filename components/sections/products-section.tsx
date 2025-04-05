"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types";

interface ProductsSectionProps {
  title?: string;
  products: Product[];
  wishlist: number[];
  cart: number[];
  toggleWishlist: (id: number) => void;
  toggleCart: (id: number) => void;
  openQuickView?: (product: Product) => void;
  bgColor?: string;
  showHeading?: boolean;
}

export function ProductsSection({
  title,
  products,
  wishlist,
  cart,
  toggleWishlist,
  toggleCart,
  openQuickView = () => {}, // Provide default no-op function
  bgColor = "bg-white",
  showHeading = true,
}: ProductsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className={`py-12 ${bgColor}`} ref={sectionRef}>
      <div className="container mx-auto px-4">
        {showHeading && (
          <div className="flex justify-between items-center mb-8">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              whileHover={{ x: 5 }}
            >
              <Link
                href="#"
                className="text-pink-400 hover:text-pink-500 flex items-center gap-1 text-sm font-medium"
              >
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        )}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {products.map((product) => (
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
        </motion.div>
      </div>
    </section>
  );
}
