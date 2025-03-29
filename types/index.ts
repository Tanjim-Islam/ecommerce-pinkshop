import type React from "react"
export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  isNew?: boolean
  discount?: number
}

export interface Category {
  name: string
  image: string
}

export interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
}

