"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set video playback speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5; // Increase playback speed
    }
  }, []);

  // Parallax effects
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);

  return (
    // Change the section positioning to make it start from the top of the page
    // and extend the video background to be visible through the navbar
    <section
      className="relative overflow-hidden min-h-screen"
      ref={heroRef}
      style={{ marginTop: "-72px", paddingTop: "72px" }} // Adjust for navbar height
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: "100%", height: "100%" }}
        >
          <source src="hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Semi-transparent overlay to ensure text readability */}
        <div className="absolute inset-0 bg-pink-50/30"></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10 h-full flex items-center">
        <div className="grid md:grid-cols-2 gap-8 items-center w-full md:mt-20">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Badge className="bg-pink-100 text-pink-500 hover:bg-pink-200 rounded-full px-4 py-1">
                New Collection
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Spring Fashion <span className="text-pink-400">Collection</span>
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Discover our new spring collection with the latest trends and
              styles for the season.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-pink-400 hover:bg-pink-500 text-white rounded-full px-8">
                  Shop Now
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border-pink-400 text-pink-500 hover:bg-pink-50 rounded-full px-8"
                >
                  Explore Collection
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="Spring Collection"
              fill
              className="object-cover"
              priority
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-pink-400/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            />

            <motion.div
              className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.1 }}
            >
              <Sparkles className="h-6 w-6 text-pink-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />
    </section>
  );
}
