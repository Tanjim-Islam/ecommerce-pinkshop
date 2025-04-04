import type React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { setIsMenuOpen, setIsCartOpen } from "@/app/actions";

export const metadata: Metadata = {
  title: "My Profile - PinkShop",
  description: "Manage your account, orders, wishlist and more",
};

export default function ProfileLayout({
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
