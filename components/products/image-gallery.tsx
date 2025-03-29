"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullScreen, setIsFullScreen] = useState(false)

  // Generate placeholder images if none provided
  const galleryImages = images.length > 0 ? images : Array(4).fill("/placeholder.svg?height=600&width=500")

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1))
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  const openFullScreen = () => {
    setIsFullScreen(true)
    document.body.style.overflow = "hidden"
  }

  const closeFullScreen = () => {
    setIsFullScreen(false)
    document.body.style.overflow = "auto"
  }

  return (
    <>
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3">
        {/* Main Image */}
        <Image
          src={galleryImages[currentIndex] || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover transition-all duration-300"
        />

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Zoom Button */}
        <motion.div className="absolute bottom-4 right-4" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
            onClick={openFullScreen}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-2 mb-4">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            className={`relative w-16 h-16 rounded-lg overflow-hidden cursor-pointer ${
              currentIndex === index ? "ring-2 ring-pink-400" : "opacity-70"
            }`}
            whileHover={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goToImage(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${alt} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Full Screen View */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullScreen}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-full h-full p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={galleryImages[currentIndex] || "/placeholder.svg"}
                  alt={alt}
                  fill
                  className="object-contain rounded-2xl"
                />
              </div>

              {/* Close Button */}
              <motion.div className="absolute top-4 right-4 z-50" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white/20 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    closeFullScreen()
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </motion.div>

              {/* Navigation Arrows */}
              <div className="absolute inset-0 flex items-center justify-between p-4 z-40">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-white/20 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-white/20 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </motion.div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full ${currentIndex === index ? "bg-white" : "bg-white/50"}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      goToImage(index)
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

