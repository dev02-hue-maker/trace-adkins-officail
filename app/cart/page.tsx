// app/cart/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, ArrowLeft, Plus, Minus, ShoppingBag, Truck, Shield, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [isRemoving, setIsRemoving] = useState<string | null>(null);

  const handleRemove = (productId: string) => {
    setIsRemoving(productId);
    setTimeout(() => {
      removeFromCart(productId);
      setIsRemoving(null);
    }, 300);
  };

  const handleQuantityChange = (productId: string, change: number) => {
    const item = items.find(item => item.id === productId);
    if (item) {
      const newQuantity = Math.max(1, item.cartQuantity + change);
      updateQuantity(productId, newQuantity);
    }
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 75 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <ShoppingCart className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link
              href="/store"
              className="inline-flex items-center px-6 py-3 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-semibold transition-colors duration-300"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/store"
            className="inline-flex items-center text-gray-600 hover:text-amber-600 transition-colors duration-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <div className="flex items-center text-gray-600">
            <ShoppingCart className="w-5 h-5 mr-2" />
            <span>{getTotalItems()} items in your cart</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Items in Cart</h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-semibold transition-colors duration-300"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-6">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex flex-col sm:flex-row gap-6 p-4 rounded-xl border ${
                      isRemoving === item.id ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                    } transition-all duration-300`}
                  >
                    {/* Product Image */}
                    <Link
                      href={`/store/${item.id}`}
                      className="relative h-40 w-40 shrink-0 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={item.featuredImage}
                        alt={item.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="160px"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <Link
                            href={`/store/${item.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-amber-600 transition-colors duration-300"
                          >
                            {item.title}
                          </Link>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {item.description}
                          </p>
                          
                          <div className="flex items-center mt-2">
                            {item.tags.slice(0, 2).map((tag, idx) => (
                              <span
                                key={idx}
                                className="mr-2 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-900">
                            ${(item.price * item.cartQuantity).toFixed(2)}
                          </div>
                          <div className="text-gray-600">
                            ${item.price.toFixed(2)} each
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex items-center justify-between mt-6 pt-6 border-t">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="p-2 rounded-lg border border-gray-300 hover:border-amber-500 hover:text-amber-600 transition-colors duration-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="mx-4 w-12 text-center font-bold">
                            {item.cartQuantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="p-2 rounded-lg border border-gray-300 hover:border-amber-500 hover:text-amber-600 transition-colors duration-300"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          disabled={isRemoving === item.id}
                          className="flex items-center text-red-600 hover:text-red-700 disabled:opacity-50 transition-colors duration-300"
                        >
                          <Trash2 className="w-5 h-5 mr-2" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cart Policies */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  icon: Truck,
                  title: "Free Shipping",
                  description: "Free on orders over $75",
                  color: "text-blue-600 bg-blue-50"
                },
                {
                  icon: Shield,
                  title: "Secure Checkout",
                  description: "100% secure payment",
                  color: "text-green-600 bg-green-50"
                },
                {
                  icon: CreditCard,
                  title: "Easy Returns",
                  description: "30-day return policy",
                  color: "text-purple-600 bg-purple-50"
                }
              ].map((policy, index) => {
                const Icon = policy.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center">
                      <div className={`${policy.color} p-3 rounded-lg mr-4`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{policy.title}</div>
                        <div className="text-gray-600 text-sm">{policy.description}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Summary Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                  {shipping > 0 && (
                    <div className="text-green-600 text-sm mt-2">
                      Add ${(75 - subtotal).toFixed(2)} more for free shipping!
                    </div>
                  )}
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="block w-full py-3 bg-amber-500 text-white hover:bg-amber-600 rounded-xl font-bold text-center transition-colors duration-300 mb-4"
              >
                Proceed to Checkout
              </Link>

              {/* Continue Shopping */}
              <Link
                href="/store"
                className="block w-full py-3 border-2 border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600 rounded-xl font-semibold text-center transition-colors duration-300"
              >
                Continue Shopping
              </Link>

              {/* Payment Methods */}
              <div className="mt-8 pt-8 border-t">
                <div className="text-gray-600 text-sm mb-3">We accept</div>
                <div className="flex gap-3">
                  {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((method, idx) => (
                    <div
                      key={idx}
                      className="flex-1 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 font-semibold"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-semibold text-green-800">Secure Checkout</div>
                    <div className="text-green-700 text-sm">Your payment information is encrypted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}