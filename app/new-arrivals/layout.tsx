import type React from "react"
import type { Metadata } from "next"
import { Footer } from "@/components/layout/footer"
import { HeaderWrapper } from "@/components/layout/header-wrapper"

export const metadata: Metadata = {
  title: "New Arrivals - PinkShop",
  description: "Check out our latest fashion arrivals",
}

export default function NewArrivalsLayout({
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

