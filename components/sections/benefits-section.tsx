"use client"

import { motion } from "framer-motion"
import { benefits } from "@/data"

export function BenefitsSection() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={slideUp}
              className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-pink-50 transition-colors"
              whileHover={{ y: -5 }}
            >
              <motion.div className="text-pink-400 mb-3" whileHover={{ scale: 1.1, rotate: 5 }}>
                {benefit.icon}
              </motion.div>
              <h3 className="font-medium text-gray-900 mb-1">{benefit.title}</h3>
              <p className="text-sm text-gray-500">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

