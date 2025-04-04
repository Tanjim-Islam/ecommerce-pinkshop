import type React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { setIsMenuOpen, setIsCartOpen } from "@/app/actions";

export const metadata: Metadata = {
  title: "Wishlist - PinkShop",
  description: "View and manage your favorite items",
};

export default function WishlistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header
        wishlist={[]}
        cart={[]}
        setIsMenuOpen={setIsMenuOpen}
        setIsCartOpen={setIsCartOpen}
      />
      {children}
      <Footer />
    </>
  );
}
