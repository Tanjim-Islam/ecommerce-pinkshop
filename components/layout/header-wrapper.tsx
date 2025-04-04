"use client";

import { useState } from "react";
import { Header } from "./header";
import { useCart } from "@/components/providers/cart-provider";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { allProducts } from "@/data";

export function HeaderWrapper() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist] = useState<number[]>([]);
  const { cart, toggleCart, clearCart } = useCart();

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <Header
        wishlist={wishlist}
        cart={cart}
        setIsMenuOpen={setIsMenuOpen}
        setIsCartOpen={handleCartToggle}
      />
      <CartSidebar
        isOpen={isCartOpen}
        cart={cart}
        products={allProducts}
        toggleCart={toggleCart}
        clearCart={clearCart}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}
