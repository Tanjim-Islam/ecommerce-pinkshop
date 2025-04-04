"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface CartContextType {
  cart: number[]
  toggleCart: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<number[]>([])

  const toggleCart = (id: number) => {
    if (cart.includes(id)) {
      setCart(cart.filter((item) => item !== id))
    } else {
      setCart([...cart, id])
    }
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, toggleCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}