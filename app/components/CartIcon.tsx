// components/CartIcon.tsx
"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartIcon() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-amber-600 transition-colors duration-300" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </Link>
  );
}