"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Plus, Minus, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageGallery } from "@/components/products/image-gallery";
import type { Product } from "@/types";
import { productColors, productSizes } from "@/data";

interface QuickViewProps {
  product: Product | null;
  wishlist: number[];
  cart: number[];
  toggleWishlist: (id: number) => void;
  toggleCart: (id: number) => void;
  closeQuickView: () => void;
}

export function QuickView({
  product,
  wishlist,
  cart,
  toggleWishlist,
  toggleCart,
  closeQuickView,
}: QuickViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedTab, setSelectedTab] = useState("description");

  if (!product) return null;

  // Generate product images (in a real app, these would come from the product data)
  const productImages = product.images || [product.image];

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeQuickView}
    >
      <motion.div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">
          <button
            className="absolute top-4 right-4 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors"
            onClick={closeQuickView}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ImageGallery images={productImages} alt={product.name} />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xl font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-400 text-sm line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex items-center mt-2">
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
                  <span className="text-sm text-gray-500 ml-2">
                    4.0 (24 reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Color
                  </h3>
                  <div className="flex gap-2">
                    {productColors.map((color, index) => (
                      <button
                        key={color.name}
                        className={`w-8 h-8 rounded-full ${
                          color.value
                        } flex items-center justify-center ${
                          selectedColor === index
                            ? "ring-2 ring-pink-400 ring-offset-2"
                            : ""
                        }`}
                        onClick={() => setSelectedColor(index)}
                        aria-label={`Select ${color.name} color`}
                      >
                        {selectedColor === index && (
                          <Sparkles className="h-4 w-4 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Size
                  </h3>
                  <div className="flex gap-2">
                    {productSizes.map((size, index) => (
                      <button
                        key={size}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                          selectedSize === index
                            ? "bg-pink-400 text-white border-pink-400"
                            : "border-gray-300 text-gray-700 hover:border-pink-300"
                        }`}
                        onClick={() => setSelectedSize(index)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </h3>
                  <div className="flex items-center border border-gray-300 rounded-full w-fit">
                    <button
                      className="px-3 py-2 text-gray-500 hover:text-pink-500 disabled:opacity-50"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-3 py-2 text-gray-700 min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      className="px-3 py-2 text-gray-500 hover:text-pink-500"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    className="w-full bg-pink-400 hover:bg-pink-500 text-white rounded-full"
                    onClick={() => {
                      toggleCart(product.id);
                      closeQuickView();
                    }}
                  >
                    {cart.includes(product.id)
                      ? "Remove from Cart"
                      : "Add to Cart"}
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    variant="outline"
                    className="w-full border-pink-400 text-pink-500 hover:bg-pink-50 rounded-full"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart
                      className={`h-4 w-4 mr-2 ${
                        wishlist.includes(product.id) ? "fill-pink-400" : ""
                      }`}
                    />
                    {wishlist.includes(product.id)
                      ? "Wishlisted"
                      : "Add to Wishlist"}
                  </Button>
                </motion.div>
              </div>

              <div className="border-t pt-4">
                <Tabs defaultValue="description" onValueChange={setSelectedTab}>
                  <TabsList className="w-full bg-gray-100 rounded-full p-1">
                    <TabsTrigger value="description" className="rounded-full">
                      Description
                    </TabsTrigger>
                    <TabsTrigger value="details" className="rounded-full">
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="shipping" className="rounded-full">
                      Shipping
                    </TabsTrigger>
                  </TabsList>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TabsContent
                        value="description"
                        className="pt-4 text-gray-600"
                      >
                        <p>
                          {product.description ||
                            `${product.name} is a stylish addition to your wardrobe. Perfect for any occasion, this piece
                            combines comfort with elegance. The high-quality material ensures durability and a perfect fit.`}
                        </p>
                      </TabsContent>
                      <TabsContent
                        value="details"
                        className="pt-4 text-gray-600"
                      >
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Material: 95% Cotton, 5% Elastane</li>
                          <li>Care: Machine wash cold</li>
                          <li>Made in Portugal</li>
                          <li>Model is 5'9" and wearing size S</li>
                        </ul>
                      </TabsContent>
                      <TabsContent
                        value="shipping"
                        className="pt-4 text-gray-600"
                      >
                        <p>
                          Free standard shipping on all orders over $50.
                          Expedited and international shipping options available
                          at checkout. Returns accepted within 30 days of
                          delivery.
                        </p>
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
