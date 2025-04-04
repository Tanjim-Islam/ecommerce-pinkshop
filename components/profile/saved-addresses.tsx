"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash, Home, Briefcase, MapPin, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Sample address data
const addresses = [
  {
    id: 1,
    name: "Home",
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    phone: "+1 (555) 123-4567",
    isDefault: true,
    type: "home",
  },
  {
    id: 2,
    name: "Work",
    street: "456 Business Ave",
    city: "New York",
    state: "NY",
    zip: "10002",
    country: "United States",
    phone: "+1 (555) 987-6543",
    isDefault: false,
    type: "work",
  },
]

export function SavedAddresses() {
  const [addressList, setAddressList] = useState(addresses)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingAddress, setEditingAddress] = useState<(typeof addresses)[0] | null>(null)

  const handleDeleteAddress = (id: number) => {
    setAddressList(addressList.filter((address) => address.id !== id))
  }

  const handleSetDefaultAddress = (id: number) => {
    setAddressList(
      addressList.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    )
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="h-4 w-4" />
      case "work":
        return <Briefcase className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
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
        <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>

        <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-pink-400 hover:bg-pink-500 text-white rounded-full">
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <AddressForm
              onClose={() => setIsAddingAddress(false)}
              onSave={(address) => {
                setAddressList([...addressList, { ...address, id: Date.now() }])
                setIsAddingAddress(false)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {addressList.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">You don't have any saved addresses yet.</p>
          </div>
        ) : (
          addressList.map((address) => (
            <motion.div
              key={address.id}
              className="border border-gray-200 rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${address.isDefault ? "bg-pink-100 text-pink-500" : "bg-gray-100 text-gray-500"}`}
                  >
                    {getAddressIcon(address.type)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{address.name}</h3>
                      {address.isDefault && (
                        <span className="text-xs bg-pink-100 text-pink-500 px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>

                    <p className="text-gray-500 text-sm mt-1">{address.street}</p>
                    <p className="text-gray-500 text-sm">
                      {address.city}, {address.state} {address.zip}
                    </p>
                    <p className="text-gray-500 text-sm">{address.country}</p>
                    <p className="text-gray-500 text-sm mt-1">{address.phone}</p>
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
                        <DialogTitle>Edit Address</DialogTitle>
                      </DialogHeader>
                      <AddressForm
                        initialData={address}
                        onClose={() => {}}
                        onSave={(updatedAddress) => {
                          setAddressList(
                            addressList.map((addr) =>
                              addr.id === address.id ? { ...updatedAddress, id: address.id } : addr,
                            ),
                          )
                        }}
                      />
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {!address.isDefault && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    className="text-pink-500 hover:text-pink-600 hover:bg-pink-50 p-0 h-auto text-sm"
                    onClick={() => handleSetDefaultAddress(address.id)}
                  >
                    Set as default address
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

interface AddressFormProps {
  initialData?: any
  onClose: () => void
  onSave: (address: any) => void
}

function AddressForm({ initialData, onClose, onSave }: AddressFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    street: initialData?.street || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    zip: initialData?.zip || "",
    country: initialData?.country || "United States",
    phone: initialData?.phone || "",
    isDefault: initialData?.isDefault || false,
    type: initialData?.type || "home",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Address Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Home, Work, etc."
              required
              className="rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Address Type</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="home" id="home" />
                <Label htmlFor="home" className="cursor-pointer">
                  Home
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="work" id="work" />
                <Label htmlFor="work" className="cursor-pointer">
                  Work
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="cursor-pointer">
                  Other
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">Street Address</Label>
          <Textarea
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="123 Main St, Apt 4B"
            required
            className="rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State/Province</Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP/Postal Code</Label>
            <Input id="zip" name="zip" value={formData.zip} onChange={handleChange} required className="rounded-lg" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
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
            Set as default address
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
            Save Address
          </Button>
        </motion.div>
      </div>
    </form>
  )
}

