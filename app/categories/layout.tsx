import type React from "react";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { HeaderWrapper } from "@/components/layout/header-wrapper";

export const metadata: Metadata = {
  title: "Categories - PinkShop",
  description: "Browse our fashion categories and find your perfect style",
};

export default function CategoriesLayout({
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
