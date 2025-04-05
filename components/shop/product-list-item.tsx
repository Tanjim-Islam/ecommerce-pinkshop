"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Link from "next/link"; // Added import for Link

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";

interface ProductListItemProps {
  product: Product;
  wishlist: number[];
  cart: number[];
  toggleWishlist: (id: number) => void;
  toggleCart: (id: number) => void;
}

export function ProductListItem({
  product,
  wishlist,
  cart,
  toggleWishlist,
  toggleCart,
  // openQuickView,
}: ProductListItemProps) {
  return (
    <motion.div
      className="flex flex-col md:flex-row gap-4 p-4 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      {/* Added Link component to wrap the product image */}
      <Link href={`/product/${product.id}`} className="block md:w-1/4">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
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
            <Badge className="absolute top-2 left-2 bg-pink-400 text-white rounded-full px-3">
              -{product.discount}%
            </Badge>
          )}
        </div>
      </Link>

      <div className="md:w-3/4 flex flex-col justify-between">
        <div>
          {/* Added Link component to wrap the product name */}
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-medium text-lg text-gray-900">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center mt-1 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= 4
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">4.0 (24 reviews)</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description ||
              `${product.name} is a stylish addition to your wardrobe. Perfect for any occasion, this piece combines comfort with elegance.`}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-800 font-semibold">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 text-sm line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="bg-pink-400 hover:bg-pink-500 text-white rounded-full"
              onClick={() => toggleCart(product.id)}
            >
              {cart.includes(product.id) ? (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Remove from Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </motion.div>

          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
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
                size="sm"
                className="bg-pink-400 hover:bg-pink-500 text-white rounded-full"
                onClick={() => toggleCart(product.id)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {cart.includes(product.id) ? "Remove" : "Add to Cart"}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}