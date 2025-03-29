"use client";

import { useState } from "react";
import { Header } from "./header";

export function HeaderWrapper() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist] = useState<number[]>([]);
  const [cart] = useState<number[]>([]);

  return (
    <Header
      wishlist={wishlist}
      cart={cart}
      setIsMenuOpen={setIsMenuOpen}
      setIsCartOpen={setIsCartOpen}
    />
  );
}