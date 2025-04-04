"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash, CreditCard, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample payment methods data
const paymentMethods = [
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    expMonth: "12",
    expYear: "2025",
    name: "Sarah Johnson",
    isDefault: true,
  },
  {
    id: 2,
    type: "Mastercard",
    last4: "5555",
    expMonth: "08",
    expYear: "2024",
    name: "Sarah Johnson",
    isDefault: false,
  },
]

export function PaymentMethods() {
  const [methods, setMethods] = useState(paymentMethods)
  const [isAddingMethod, setIsAddingMethod] = useState(false)
  const [editingMethod, setEditingMethod] = useState<(typeof paymentMethods)[0] | null>(null)

  const handleDeleteMethod = (id: number) => {
    setMethods(methods.filter((method) => method.id !== id))
  }

  const handleSetDefaultMethod = (id: number) => {
    setMethods(
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  const getCardIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "visa":
        return "💳 Visa"
      case "mastercard":
        return "💳 Mastercard"
      case "amex":
        return "💳 Amex"
      case "discover":
        return "💳 Discover"
      default:
        return "💳 Card"
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>

        <Dialog open={isAddingMethod} onOpenChange={setIsAddingMethod}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-pink-400 hover:bg-pink-500 text-white rounded-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
            </DialogHeader>
            <PaymentMethodForm
              onClose={() => setIsAddingMethod(false)}
              onSave={(method) => {
                setMethods([...methods, { ...method, id: Date.now() }])
                setIsAddingMethod(false)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {methods.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">You don't have any saved payment methods yet.</p>
          </div>
        ) : (
          methods.map((method) => (
            <motion.div
              key={method.id}
              className="border border-gray-200 rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${method.isDefault ? "bg-pink-100 text-pink-500" : "bg-gray-100 text-gray-500"}`}
                  >
                    <CreditCard className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{getCardIcon(method.type)}</h3>
                      {method.isDefault && (
                        <span className="text-xs bg-pink-100 text-pink-500 px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>

                    <p className="text-gray-500 text-sm mt-1">•••• •••• •••• {method.last4}</p>
                    <p className="text-gray-500 text-sm">
                      Expires {method.expMonth}/{method.expYear}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">{method.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-pink-500">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] rounded-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Payment Method</DialogTitle>
                      </DialogHeader>
                      <PaymentMethodForm
                        initialData={method}
                        onClose={() => {}}
                        onSave={(updatedMethod) => {
                          setMethods(methods.map((m) => (m.id === method.id ? { ...updatedMethod, id: method.id } : m)))
                        }}
                      />
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => handleDeleteMethod(method.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {!method.isDefault && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    className="text-pink-500 hover:text-pink-600 hover:bg-pink-50 p-0 h-auto text-sm"
                    onClick={() => handleSetDefaultMethod(method.id)}
                  >
                    Set as default payment method
                  </Button>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}

interface PaymentMethodFormProps {
  initialData?: any
  onClose: () => void
  onSave: (method: any) => void
}

function PaymentMethodForm({ initialData, onClose, onSave }: PaymentMethodFormProps) {
  const [formData, setFormData] = useState({
    type: initialData?.type || "Visa",
    cardNumber: initialData ? `•••• •••• •••• ${initialData.last4}` : "",
    last4: initialData?.last4 || "",
    expMonth: initialData?.expMonth || "",
    expYear: initialData?.expYear || "",
    cvv: "",
    name: initialData?.name || "",
    isDefault: initialData?.isDefault || false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would process the card info securely
    // For this demo, we'll just extract the last 4 digits
    const last4 = formData.cardNumber.replace(/\D/g, "").slice(-4)

    onSave({
      type: formData.type,
      last4,
      expMonth: formData.expMonth,
      expYear: formData.expYear,
      name: formData.name,
      isDefault: formData.isDefault,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="type">Card Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="Select card type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Visa">Visa</SelectItem>
              <SelectItem value="Mastercard">Mastercard</SelectItem>
              <SelectItem value="Amex">American Express</SelectItem>
              <SelectItem value="Discover">Discover</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            required
            className="rounded-lg"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expMonth">Exp. Month</Label>
            <Select
              value={formData.expMonth}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, expMonth: value }))}
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => {
                  const month = (i + 1).toString().padStart(2, "0")
                  return (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expYear">Exp. Year</Label>
            <Select
              value={formData.expYear}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, expYear: value }))}
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="YYYY" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = (new Date().getFullYear() + i).toString()
                  return (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              required
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Cardholder Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="rounded-lg"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isDefault"
            checked={formData.isDefault}
            onChange={(e) => setFormData((prev) => ({ ...prev, isDefault: e.target.checked }))}
            className="rounded text-pink-500 focus:ring-pink-500"
          />
          <Label htmlFor="isDefault" className="cursor-pointer">
            Set as default payment method
          </Label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
          Cancel
        </Button>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button type="submit" className="bg-pink-400 hover:bg-pink-500 text-white rounded-full">
            <Check className="h-4 w-4 mr-2" />
            Save Payment Method
          </Button>
        </motion.div>
      </div>
    </form>
  )
}

