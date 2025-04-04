import type React from "react";
import type { Metadata } from "next";
import { HeaderWrapper } from "@/components/layout/header-wrapper";
import { Footer } from "@/components/layout/footer";

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
      <HeaderWrapper />
      {children}
      <Footer />
    </>
  );
}
