// app/store/[id]/page.tsx
"use client";

import { useState } from "react"; // Removed useEffect
import { notFound, useParams } from "next/navigation"; // Added useParams
import Image from "next/image";
import Link from "next/link";
 
import { ShoppingCart, ArrowLeft, Star, Truck, Shield, RefreshCw, Heart, Share2 } from "lucide-react";
 
import { useCart } from "@/context/CartContext";
import { mockProducts } from "@/types/mockProducts"; // This should match your actual path

interface PageProps {
  params: { id: string };
}

export default function ProductDetailPage({ params }: PageProps) {
  // Add fallback to useParams for client-side access
  const routerParams = useParams();
  const productId = params?.id || routerParams?.id;
  
  const product = mockProducts.find(p => p.id === productId);
  const { addToCart } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  // derive loading from product availability to avoid setState inside useEffect
  const loading = !!productId && !product;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    console.log("Product not found for ID:", productId);
    console.log("Available IDs:", mockProducts.map(p => p.id));
    notFound();
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    
    // Reset animation
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, Math.min(product.quantity, quantity + change));
    setQuantity(newQuantity);
  };

  const relatedProducts = mockProducts
    .filter(p => p.id !== product.id && p.category.some(cat => product.category.includes(cat)))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/store"
            className="inline-flex items-center text-gray-600 hover:text-amber-600 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Store
          </Link>
        </div>
      </div>

      {/* Main Product Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="relative h-96 md:h-125 w-full mb-6 rounded-2xl overflow-hidden bg-white p-4 shadow-lg">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              {/* Sale Badge */}
              {product.originalPrice && (
                <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                  SALE
                </div>
              )}
              
              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlist(!isWishlist)}
                className={`absolute top-6 right-6 p-3 rounded-full ${
                  isWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-700'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <Heart className={`w-6 h-6 ${isWishlist ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-4 overflow-x-auto py-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`shrink-0 relative h-24 w-24 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index 
                      ? 'border-amber-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  } transition-colors duration-300`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} - View ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.category.map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/store?category=${cat}`}
                  className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors duration-300"
                >
                  {cat}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            {/* SKU & Stock */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-600">
                SKU: <span className="font-semibold">{product.sku}</span>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                product.inStock 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? `${product.quantity} in stock` : 'Out of stock'}
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-center mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="ml-4 text-2xl text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="ml-4 bg-red-100 text-red-700 px-3 py-1 rounded-lg font-bold">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              <div className="text-gray-600">
                Price includes all applicable taxes
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            {/* Features */}
            {product.features && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Star className="w-5 h-5 text-amber-500 mr-3 mt-0.5 shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b pb-2">
                      <div className="text-gray-600 text-sm">{key}</div>
                      <div className="font-semibold">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border">
              <div className="flex items-center justify-between mb-6">
                <div className="text-lg font-semibold text-gray-900">Quantity</div>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-bold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.quantity}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    product.inStock
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } ${isAdding ? 'animate-pulse' : ''}`}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {isAdding ? 'Adding...' : 'Add to Cart'}
                </button>
                
                <button className="p-4 border-2 border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600 rounded-xl transition-colors duration-300">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              {/* Store Policies */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t">
                <div className="flex items-center">
                  <Truck className="w-5 h-5 text-blue-500 mr-3" />
                  <div>
                    <div className="font-semibold">Free Shipping</div>
                    <div className="text-sm text-gray-600">Over $75</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <div className="font-semibold">Secure Payment</div>
                    <div className="text-sm text-gray-600">100% Protected</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="w-5 h-5 text-purple-500 mr-3" />
                  <div>
                    <div className="font-semibold">Easy Returns</div>
                    <div className="text-sm text-gray-600">30 Days</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-amber-500 mr-3" />
                  <div>
                    <div className="font-semibold">Official Store</div>
                    <div className="text-sm text-gray-600">Authentic Products</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-16 border-t">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/store/${encodeURIComponent(relatedProduct.id)}`}
                  className="group block"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48">
                      <Image
                        src={relatedProduct.featuredImage}
                        alt={relatedProduct.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2 mb-2">
                        {relatedProduct.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                          ${relatedProduct.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-600">
                          {relatedProduct.inStock ? 'In stock' : 'Out of stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}