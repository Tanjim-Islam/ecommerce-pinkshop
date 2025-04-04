"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Eye, Package, Truck, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Sample order data
const orders = [
  {
    id: "ORD-12345",
    date: "May 15, 2023",
    total: 129.99,
    status: "Delivered",
    items: [
      { id: 1, name: "Floral Summer Dress", price: 59.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
      { id: 2, name: "Classic White Blouse", price: 39.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
      { id: 3, name: "Leather Crossbody Bag", price: 79.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
    ],
    tracking: "1Z999AA10123456784",
  },
  {
    id: "ORD-12344",
    date: "April 28, 2023",
    total: 89.98,
    status: "Delivered",
    items: [
      { id: 4, name: "Strappy Sandals", price: 49.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
      { id: 5, name: "Pink Ruffle Blouse", price: 39.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
    ],
    tracking: "1Z999AA10123456783",
  },
  {
    id: "ORD-12343",
    date: "April 10, 2023",
    total: 65.99,
    status: "Delivered",
    items: [
      { id: 6, name: "Floral Maxi Skirt", price: 65.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
    ],
    tracking: "1Z999AA10123456782",
  },
]

export function OrderHistory() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleOrderExpand = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
    } else {
      setExpandedOrder(orderId)
    }
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Package className="h-4 w-4 text-blue-500" />
      case "Shipped":
        return <Truck className="h-4 w-4 text-orange-500" />
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Package className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-700"
      case "Shipped":
        return "bg-orange-100 text-orange-700"
      case "Delivered":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>

      <div className="mb-6">
        <Input
          placeholder="Search orders by ID or product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-full"
        />
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders found matching your search.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              className="border border-gray-200 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleOrderExpand(order.id)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="font-medium text-gray-900">{order.id}</div>
                  <div className="text-sm text-gray-500">{order.date}</div>
                  <Badge className={`${getStatusColor(order.status)} rounded-full px-3 py-1 flex items-center gap-1`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <div className="font-semibold text-gray-900">${order.total.toFixed(2)}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleOrderExpand(order.id)
                    }}
                  >
                    {expandedOrder === order.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              {expandedOrder === order.id && (
                <motion.div
                  className="border-t border-gray-200 p-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Order Items</h3>

                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden relative flex-shrink-0">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="object-cover w-full h-full"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </div>
                          </div>

                          <div className="font-semibold text-gray-900">${(item.quantity * item.price).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="text-gray-900">${order.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Shipping</span>
                        <span className="text-gray-900">Free</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">${order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {order.tracking && (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="text-gray-500 mr-2">Tracking Number:</span>
                            <span className="font-medium">{order.tracking}</span>
                          </div>

                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="bg-pink-400 hover:bg-pink-500 text-white rounded-full">
                              <Eye className="h-4 w-4 mr-2" />
                              Track Order
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200 flex justify-between">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          className="border-pink-400 text-pink-500 hover:bg-pink-50 rounded-full"
                        >
                          View Invoice
                        </Button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          className="border-pink-400 text-pink-500 hover:bg-pink-50 rounded-full"
                        >
                          Buy Again
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

