"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageGallery } from "@/components/products/image-gallery";
import type { Product } from "@/types";
import { productColors, productSizes } from "@/data";

interface ProductDetailProps {
  product: Product;
  wishlist: number[];
  cart: number[];
  toggleWishlist: (id: number) => void;
  toggleCart: (id: number) => void;
}

export function ProductDetail({
  product,
  wishlist,
  cart,
  toggleWishlist,
  toggleCart,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);

  // Generate product images (in a real app, these would come from the product data)
  const productImages = product.images || [product.image];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <ImageGallery images={productImages} alt={product.name} />
      </div>

      <div className="space-y-6">
        <div>
          {product.isNew && (
            <Badge className="bg-pink-400 text-white rounded-full px-3 mb-2">
              New
            </Badge>
          )}
          {product.discount && (
            <Badge className="bg-pink-400 text-white rounded-full px-3 mb-2">
              -{product.discount}%
            </Badge>
          )}

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

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
            <span className="text-sm text-gray-500 ml-2">4.0 (24 reviews)</span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            {product.description ||
              `${product.name} is a stylish addition to your wardrobe. Perfect for any occasion, this piece
              combines comfort with elegance. The high-quality material ensures durability and a perfect fit.`}
          </p>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Color</h3>
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
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Size</h3>
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
            <h3 className="text-sm font-medium text-gray-700 mb-2">Quantity</h3>
            <div className="flex items-center border border-gray-300 rounded-full w-fit">
              <button
                className="px-3 py-2 text-gray-500 hover:text-pink-500 disabled:opacity-50"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-3 py-2 text-gray-700 min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                className="px-3 py-2 text-gray-500 hover:text-pink-500"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
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
              onClick={() => toggleCart(product.id)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {cart.includes(product.id) ? "Remove from Cart" : "Add to Cart"}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
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
              {wishlist.includes(product.id) ? "Wishlisted" : "Add to Wishlist"}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="ghost"
              className="w-full text-gray-600 hover:text-pink-500 rounded-full"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </motion.div>
        </div>

        <div className="border-t pt-4">
          <Tabs defaultValue="description">
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
            <TabsContent value="description" className="pt-4 text-gray-600">
              <p>
                {product.description ||
                  `${product.name} is a stylish addition to your wardrobe. Perfect for any occasion, this piece
                  combines comfort with elegance. The high-quality material ensures durability and a perfect fit.`}
              </p>
            </TabsContent>
            <TabsContent value="details" className="pt-4 text-gray-600">
              <ul className="list-disc pl-5 space-y-1">
                <li>Material: 95% Cotton, 5% Elastane</li>
                <li>Care: Machine wash cold</li>
                <li>Made in Portugal</li>
                <li>Model is 5'9" and wearing size S</li>
              </ul>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4 text-gray-600">
              <p>
                Free standard shipping on all orders over $50. Expedited and
                international shipping options available at checkout. Returns
                accepted within 30 days of delivery.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
