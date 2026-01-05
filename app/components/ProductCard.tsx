// components/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart,Star } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const productUrl = `/store/${product.id}`;
console.log("Product ID:", product.id, "URL:", productUrl);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    addToCart(product, quantity);
    
    // Reset animation
    setTimeout(() => setIsAdding(false), 500);
    
    // Reset quantity
    setQuantity(1);
  };

  const handleQuantityChange = (e: React.MouseEvent, change: number) => {
    e.preventDefault();
    e.stopPropagation();
    const newQuantity = Math.max(1, Math.min(product.quantity, quantity + change));
    setQuantity(newQuantity);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/store/${encodeURIComponent(product.id)}`}>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          {/* Product Image */}
          <div className="relative h-64 w-full">
            <Image
              src={product.featuredImage}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Sale Badge */}
            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                SALE
              </div>
            )}

            {/* Stock Status */}
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold ${
              product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.inStock ? `${product.quantity} in stock` : 'Out of stock'}
            </div>

            {/* Quick Add Button */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  product.inStock
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                } ${isAdding ? 'animate-pulse' : ''}`}
              >
                <ShoppingCart className="w-5 h-5" />
                {isAdding ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6">
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {product.category.slice(0, 2).map((cat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300 mb-2 line-clamp-2">
              {product.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-bold">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="flex gap-3">
              <div className="flex-1">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={(e) => handleQuantityChange(e, -1)}
                    disabled={quantity <= 1}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={(e) => handleQuantityChange(e, 1)}
                    disabled={quantity >= product.quantity}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  product.inStock
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } ${isAdding ? 'animate-pulse' : ''}`}
              >
                <ShoppingCart className="w-5 h-5" />
                Add
              </button>
            </div>

            {/* Features */}
            {product.features && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center text-gray-700 text-sm">
                  <Star className="w-4 h-4 mr-2 text-amber-500" />
                  <span className="line-clamp-1">
                    {product.features[0]}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}