"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import type { Category } from "@/types"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden bg-white shadow-sm"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/categories/${category.name.toLowerCase()}`}>
        <div className="aspect-square relative">
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-semibold mb-2">{category.name}</h3>
            <div className="flex items-center text-white text-sm font-medium">
              <span className="mr-2">Shop Now</span>
              <motion.div initial={{ x: 0 }} whileHover={{ x: 5 }} className="bg-pink-400 rounded-full p-1">
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

