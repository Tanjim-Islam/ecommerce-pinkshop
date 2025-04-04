"use client"

import { motion } from "framer-motion"
import { User, ShoppingBag, MapPin, CreditCard, Heart, Bell, LogOut, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ProfileSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  wishlistCount: number
}

export function ProfileSidebar({ activeSection, setActiveSection, wishlistCount }: ProfileSidebarProps) {
  const menuItems = [
    { id: "account", label: "Account Details", icon: <User className="h-4 w-4" /> },
    { id: "orders", label: "Order History", icon: <ShoppingBag className="h-4 w-4" /> },
    { id: "addresses", label: "Saved Addresses", icon: <MapPin className="h-4 w-4" /> },
    { id: "payment", label: "Payment Methods", icon: <CreditCard className="h-4 w-4" /> },
    { id: "wishlist", label: "Wishlist", icon: <Heart className="h-4 w-4" />, count: wishlistCount },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
  ]

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm p-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav>
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <button
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left ${
                  activeSection === item.id ? "bg-pink-50 text-pink-500" : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>

                {item.count !== undefined ? (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      activeSection === item.id ? "bg-pink-200 text-pink-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.count}
                  </span>
                ) : (
                  <ChevronRight
                    className={`h-4 w-4 ${activeSection === item.id ? "text-pink-400" : "text-gray-400"}`}
                  />
                )}
              </button>
            </motion.li>
          ))}
        </ul>

        <Separator className="my-4" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-500 hover:bg-red-50">
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </motion.div>
      </nav>
    </motion.div>
  )
}

