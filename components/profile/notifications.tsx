"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function Notifications() {
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    shipping: true,
    promotions: false,
    newArrivals: true,
    backInStock: true,
    priceDrops: false,
    newsletter: true,
    reviews: false,
    accountActivity: true,
  })

  const handleToggle = (key: string, checked: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: checked }))
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Order Notifications</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="orderUpdates">Order Updates</Label>
                <p className="text-sm text-gray-500">Receive notifications about your order status</p>
              </div>
              <Switch
                id="orderUpdates"
                checked={notifications.orderUpdates}
                onCheckedChange={(checked) => handleToggle("orderUpdates", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="shipping">Shipping Updates</Label>
                <p className="text-sm text-gray-500">Receive notifications about shipping and delivery</p>
              </div>
              <Switch
                id="shipping"
                checked={notifications.shipping}
                onCheckedChange={(checked) => handleToggle("shipping", checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Product Notifications</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="newArrivals">New Arrivals</Label>
                <p className="text-sm text-gray-500">Be the first to know about new products</p>
              </div>
              <Switch
                id="newArrivals"
                checked={notifications.newArrivals}
                onCheckedChange={(checked) => handleToggle("newArrivals", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="backInStock">Back in Stock</Label>
                <p className="text-sm text-gray-500">Get notified when out-of-stock items are available again</p>
              </div>
              <Switch
                id="backInStock"
                checked={notifications.backInStock}
                onCheckedChange={(checked) => handleToggle("backInStock", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="priceDrops">Price Drops</Label>
                <p className="text-sm text-gray-500">Get notified when items in your wishlist go on sale</p>
              </div>
              <Switch
                id="priceDrops"
                checked={notifications.priceDrops}
                onCheckedChange={(checked) => handleToggle("priceDrops", checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Marketing Notifications</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="promotions">Promotions & Discounts</Label>
                <p className="text-sm text-gray-500">Receive notifications about sales and special offers</p>
              </div>
              <Switch
                id="promotions"
                checked={notifications.promotions}
                onCheckedChange={(checked) => handleToggle("promotions", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="newsletter">Newsletter</Label>
                <p className="text-sm text-gray-500">Receive our weekly newsletter with fashion tips and trends</p>
              </div>
              <Switch
                id="newsletter"
                checked={notifications.newsletter}
                onCheckedChange={(checked) => handleToggle("newsletter", checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Other Notifications</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reviews">Reviews & Feedback</Label>
                <p className="text-sm text-gray-500">Receive requests to review purchased products</p>
              </div>
              <Switch
                id="reviews"
                checked={notifications.reviews}
                onCheckedChange={(checked) => handleToggle("reviews", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="accountActivity">Account Activity</Label>
                <p className="text-sm text-gray-500">Get notified about important account updates</p>
              </div>
              <Switch
                id="accountActivity"
                checked={notifications.accountActivity}
                onCheckedChange={(checked) => handleToggle("accountActivity", checked)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-pink-400 hover:bg-pink-500 text-white rounded-full">
              <Save className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

