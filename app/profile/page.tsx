"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { AccountDetails } from "@/components/profile/account-details";
import { OrderHistory } from "@/components/profile/order-history";
import { SavedAddresses } from "@/components/profile/saved-addresses";
import { PaymentMethods } from "@/components/profile/payment-methods";
import { ProfileWishlist } from "@/components/profile/profile-wishlist";
import { Notifications } from "@/components/profile/notifications";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { useCart } from "@/components/providers/cart-provider";
import { allProducts } from "@/data";

// Sample user data
const userData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  avatar: "/placeholder.svg?height=200&width=200",
  joinDate: "January 2023",
};

export default function ProfilePage() {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([1, 3, 5]);
  const { cart, toggleCart, clearCart } = useCart();
  const [activeSection, setActiveSection] = useState("account");

  // Toggle wishlist
  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  // Get wishlist products
  const wishlistProducts = allProducts.filter((product) =>
    wishlist.includes(product.id)
  );

  // Render active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case "account":
        return <AccountDetails user={userData} />;
      case "orders":
        return <OrderHistory />;
      case "addresses":
        return <SavedAddresses />;
      case "payment":
        return <PaymentMethods />;
      case "wishlist":
        return (
          <ProfileWishlist
            products={wishlistProducts}
            wishlist={wishlist}
            cart={cart}
            toggleWishlist={toggleWishlist}
            toggleCart={toggleCart}
          />
        );
      case "notifications":
        return <Notifications />;
      default:
        return <AccountDetails user={userData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        wishlist={wishlist}
        cart={cart}
        onClose={() => setIsMenuOpen(false)}
      />

      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <ProfileHeader user={userData} />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Profile Sidebar */}
            <ProfileSidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              wishlistCount={wishlist.length}
            />

            {/* Main Content */}
            <div className="md:col-span-3">
              <AnimatePresence mode="wait">
                {renderActiveSection()}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
