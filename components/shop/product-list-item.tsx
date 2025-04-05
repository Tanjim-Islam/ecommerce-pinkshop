"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";

interface ProductListItemProps {
  product: Product;
  wishlist: number[];
  cart: number[];
  toggleWishlist: (id: number) => void;
  toggleCart: (id: number) => void;
  openQuickView: (product: Product) => void;
}

export function ProductListItem({
  product,
  wishlist,
  cart,
  toggleWishlist,
  toggleCart,
  openQuickView,
}: ProductListItemProps) {
  return (
    <motion.div
      className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      <Link href={`/product/${product.id}`} className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 block">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        {product.isNew && (
          <Badge className="absolute top-2 left-2 bg-pink-400 text-white rounded-full px-3">
            New
          </Badge>
        )}
        {product.discount && (
          <Badge className="absolute top-2 left-2 mt-8 bg-pink-400 text-white rounded-full px-3">
            -{product.discount}%
          </Badge>
        )}
      </Link>

      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-medium text-gray-900 text-lg hover:text-pink-400 transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center mt-1 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">(24 reviews)</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description ||
              "This stylish product combines comfort with elegance. Perfect for any occasion, the high-quality material ensures durability and a perfect fit."}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 text-sm line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.discount && (
              <Badge variant="outline" className="text-pink-500 border-pink-200 rounded-full">
                Save {product.discount}%
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="bg-pink-400 hover:bg-pink-500 text-white rounded-full"
              onClick={() => toggleCart(product.id)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {cart.includes(product.id) ? "Remove from Cart" : "Add to Cart"}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className={`rounded-full ${
                wishlist.includes(product.id)
                  ? "text-pink-400 border-pink-400"
                  : "text-gray-500 border-gray-200"
              }`}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart
                className={`h-4 w-4 mr-2 ${
                  wishlist.includes(product.id) ? "fill-pink-400" : ""
                }`}
              />
              {wishlist.includes(product.id) ? "Wishlisted" : "Wishlist"}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-pink-400 rounded-full"
              onClick={() => openQuickView(product)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Quick View
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
