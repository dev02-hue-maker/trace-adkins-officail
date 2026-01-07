"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ShoppingCart, 
  ArrowLeft, 
  Star, 
  Truck, 
  Shield, 
  RefreshCw, 
  Heart, 
  Share2,
  Check,
  Package
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { mockProducts } from "@/types/mockProducts";

export default function ProductDetailPage() {
  // Use useParams() to get params client-side
  const routerParams = useParams();
  const productId = routerParams?.id as string;
  
  const product = mockProducts.find(p => p.id === productId);
  const { addToCart } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // derive loading from product availability
  const loading = !!productId && !product;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
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
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Link
            href="/store"
            className="inline-flex items-center text-gray-600 hover:text-amber-600 transition-colors duration-300 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Store
          </Link>
        </div>
      </div>

      {/* Main Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="order-2 lg:order-1">
            {/* Main Image */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full mb-4 sm:mb-6 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-white p-4 shadow-lg">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                priority
              />
              
              {/* Sale Badge */}
              {product.originalPrice && (
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-sm sm:text-base md:text-lg">
                  SALE
                </div>
              )}
              
              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlist(!isWishlist)}
                className={`absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full ${
                  isWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-700'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
                aria-label={isWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${isWishlist ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto py-2 sm:py-4 scrollbar-hide">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`shrink-0 relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index 
                      ? 'border-amber-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  } transition-colors duration-300`}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} - View ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="order-1 lg:order-2">
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              {product.category.map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/store?category=${cat}`}
                  className="px-2.5 sm:px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300"
                >
                  {cat}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {product.title}
            </h1>

            {/* SKU & Stock */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
              <div className="text-gray-600 text-sm sm:text-base">
                SKU: <span className="font-semibold">{product.sku}</span>
              </div>
              <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold ${
                product.inStock 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? `${product.quantity} in stock` : 'Out of stock'}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-1 sm:mb-2">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl sm:text-2xl text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-700 px-2 sm:px-3 py-1 rounded-lg font-bold text-sm sm:text-base">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              <div className="text-gray-600 text-xs sm:text-sm">
                Price includes all applicable taxes
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {product.fullDescription}
              </p>
            </div>

            {/* Features */}
            {product.features && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Features</h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b pb-2">
                      <div className="text-gray-600 text-xs sm:text-sm">{key}</div>
                      <div className="font-semibold text-sm sm:text-base truncate" title={String(value)}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Section */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="text-base sm:text-lg font-semibold text-gray-900">Quantity</div>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full sm:w-auto">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors text-sm sm:text-base"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-12 sm:w-16 text-center font-bold text-base sm:text-lg py-2">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.quantity}
                    className="px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors text-sm sm:text-base"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                  className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 ${
                    product.inStock
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } ${isAdding ? 'animate-pulse' : ''}`}
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                  {isAdding ? 'Adding...' : 'Add to Cart'}
                </button>
                
                <button 
                  className="p-3 sm:p-4 border-2 border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600 rounded-lg sm:rounded-xl transition-colors duration-300 flex items-center justify-center"
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  {!isMobile && <span className="ml-2 text-sm sm:text-base">Share</span>}
                </button>
              </div>

              {/* Store Policies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t">
                <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mr-2 sm:mr-3 shrink-0" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Free Shipping</div>
                    <div className="text-xs sm:text-sm text-gray-600">Over $75</div>
                  </div>
                </div>
                <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 shrink-0" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Secure Payment</div>
                    <div className="text-xs sm:text-sm text-gray-600">100% Protected</div>
                  </div>
                </div>
                <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mr-2 sm:mr-3 shrink-0" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Easy Returns</div>
                    <div className="text-xs sm:text-sm text-gray-600">30 Days</div>
                  </div>
                </div>
                <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 mr-2 sm:mr-3 shrink-0" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Authentic</div>
                    <div className="text-xs sm:text-sm text-gray-600">Official Store</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 md:pt-16 border-t">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/store/${encodeURIComponent(relatedProduct.id)}`}
                  className="group block"
                >
                  <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative h-40 sm:h-48 md:h-56">
                      <Image
                        src={relatedProduct.featuredImage}
                        alt={relatedProduct.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 475px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2 mb-2 text-sm sm:text-base">
                        {relatedProduct.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-base sm:text-lg font-bold text-gray-900">
                          ${relatedProduct.price.toFixed(2)}
                        </span>
                        <span className={`text-xs sm:text-sm ${
                          relatedProduct.inStock ? 'text-green-600' : 'text-red-600'
                        }`}>
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