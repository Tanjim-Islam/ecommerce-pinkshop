import type React from "react";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { HeaderWrapper } from "@/components/layout/header-wrapper";

export const metadata: Metadata = {
  title: "Sale - PinkShop",
  description: "Shop our latest sale items and get the best deals",
};

export default function SaleLayout({
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
