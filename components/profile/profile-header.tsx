"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Mail, Calendar } from "lucide-react"

interface ProfileHeaderProps {
  user: {
    name: string
    email: string
    avatar: string
    joinDate: string
  }
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-center gap-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-pink-100">
        <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 text-gray-500">
          <div className="flex items-center justify-center md:justify-start gap-1">
            <Mail className="h-4 w-4 text-pink-400" />
            <span>{user.email}</span>
          </div>
          <span className="hidden md:inline-block">•</span>
          <div className="flex items-center justify-center md:justify-start gap-1">
            <Calendar className="h-4 w-4 text-pink-400" />
            <span>Member since {user.joinDate}</span>
          </div>
        </div>
      </div>

      <motion.div
        className="bg-pink-50 text-pink-500 px-4 py-2 rounded-full text-sm font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Gold Member
      </motion.div>
    </motion.div>
  )
}

