"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ShoppingCart, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Product } from "@/types"

interface CartSidebarProps {
  isOpen: boolean
  cart: number[]
  products: Product[]
  toggleCart: (id: number) => void
  onClose: () => void
}

export function CartSidebar({ isOpen, cart, products, toggleCart, onClose }: CartSidebarProps) {
  const cartProducts = products.filter((product) => cart.includes(product.id))

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white z-50 shadow-xl"
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Shopping Cart ({cart.length})</h2>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-pink-400 rounded-full"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                  </motion.div>
                  <motion.h3
                    className="text-lg font-medium text-gray-900 mb-1"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Your cart is empty
                  </motion.h3>
                  <motion.p
                    className="text-gray-500 mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Looks like you haven't added any products to your cart yet.
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-pink-400 hover:bg-pink-500 text-white rounded-full" onClick={onClose}>
                      Continue Shopping
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <motion.ul variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
                  {cartProducts.map((product) => (
                    <motion.li key={product.id} variants={slideUp} className="flex gap-4 border-b pb-4" layout>
                      <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-gray-800 font-semibold">${product.price.toFixed(2)}</div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-pink-400 p-0 h-auto"
                            onClick={() => toggleCart(product.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal</span>
                  <motion.span
                    className="font-semibold"
                    key={cart.length} // Force animation on cart changes
                    initial={{ scale: 1.2, color: "#ec4899" }}
                    animate={{ scale: 1, color: "#111827" }}
                    transition={{ duration: 0.3 }}
                  >
                    ${cartProducts.reduce((total, product) => total + product.price, 0).toFixed(2)}
                  </motion.span>
                </div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button className="w-full bg-pink-400 hover:bg-pink-500 text-white rounded-full">Checkout</Button>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

