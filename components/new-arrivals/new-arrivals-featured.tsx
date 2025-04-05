"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Heart, ShoppingCart, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types"

interface NewArrivalsFeaturedProps {
  products: Product[]
  wishlist: number[]
  cart: number[]
  toggleWishlist: (id: number) => void
  toggleCart: (id: number) => void
  openQuickView: (product: Product) => void
}

export function NewArrivalsFeatured({
  products,
  wishlist,
  cart,
  toggleWishlist,
  toggleCart,
  openQuickView,
}: NewArrivalsFeaturedProps) {
  if (products.length === 0) return null

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured New Arrivals
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="group relative rounded-2xl overflow-hidden bg-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link href={`/product/${product.id}`} className="block">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-semibold mb-2">{product.name}</h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-gray-300 text-sm line-through">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>

                      <div className="text-white text-sm font-medium flex items-center hover:text-pink-300 transition-colors">
                        <span className="mr-1">View</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {product.isNew && (
                    <Badge className="absolute top-4 left-4 bg-pink-400 text-white rounded-full px-3">New</Badge>
                  )}
                  {product.discount && (
                    <Badge className="absolute top-4 left-4 bg-pink-400 text-white rounded-full px-3">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>
              </Link>

              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="icon"
                    variant="secondary"
                    className={`rounded-full bg-white shadow-sm ${
                      wishlist.includes(product.id) ? "text-pink-400" : "text-gray-400"
                    }`}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-pink-400" : ""}`} />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-white shadow-sm text-gray-400"
                    onClick={() => openQuickView(product)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="icon"
                    variant="secondary"
                    className={`rounded-full bg-white shadow-sm ${
                      cart.includes(product.id) ? "text-pink-400" : "text-gray-400"
                    }`}
                    onClick={() => toggleCart(product.id)}
                  >
                    <ShoppingCart className={`h-4 w-4 ${cart.includes(product.id) ? "fill-pink-400" : ""}`} />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
