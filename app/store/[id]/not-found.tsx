// app/store/[id]/not-found.tsx
import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function ProductNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md mx-auto">
        <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the product you&apos;re looking for. It may have been moved or no longer available.
        </p>
        <div className="space-y-4">
          <Link
            href="/store"
            className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Store
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Need help? <Link href="/contact" className="text-amber-600 hover:text-amber-700">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}