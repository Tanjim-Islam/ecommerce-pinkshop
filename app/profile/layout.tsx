import type React from "react";
import type { Metadata } from "next";
import { HeaderWrapper } from "@/components/layout/header-wrapper";
import { Footer } from "@/components/layout/footer";

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
      <HeaderWrapper />
      {children}
      <Footer />
    </>
  );
}
