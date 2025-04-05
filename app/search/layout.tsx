import type React from "react"
import type { Metadata } from "next"
import { HeaderWrapper } from "@/components/layout/header-wrapper"
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
      <HeaderWrapper />
      {children}
      <Footer />
    </>
  )
}

