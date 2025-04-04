import type React from "react"
import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Search Results - PinkShop",
  description: "Find your perfect style with our search",
}

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header wishlist={[]} cart={[]} setIsMenuOpen={() => {}} setIsCartOpen={() => {}} />
      {children}
      <Footer />
    </>
  )
}

