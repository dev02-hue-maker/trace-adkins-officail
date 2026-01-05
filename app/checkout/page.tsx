/* eslint-disable @typescript-eslint/no-explicit-any */
// app/checkout/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Lock, 
  Shield, 
  Truck, 
  CreditCard, 
  Wallet, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  ChevronRight
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  
  // Form states
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'applepay'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    saveInfo: false
  });

  const subtotal = getTotalPrice();
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handlePlaceOrder();
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      const newOrderNumber = `TA-${Date.now().toString().slice(-8)}`;
      setOrderNumber(newOrderNumber);
      setOrderComplete(true);
      setIsProcessing(false);
      clearCart();
    }, 2000);
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <CreditCard className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Add items to your cart before proceeding to checkout.
            </p>
            <Link
              href="/store"
              className="inline-flex items-center px-6 py-3 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-semibold transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <Shield className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 mb-2">
              Thank you for your purchase. Your order has been received.
            </p>
            <div className="text-lg font-bold text-amber-600 mb-8">
              Order #{orderNumber}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Details</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">${shipping.toFixed(2)}</span>
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
                </div>
              </div>

              {/* Items */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Items</h4>
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4">
                          <Image
                            src={item.featuredImage}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{item.title}</div>
                          <div className="text-gray-600 text-sm">Qty: {item.cartQuantity}</div>
                        </div>
                      </div>
                      <div className="font-semibold">
                        ${(item.price * item.cartQuantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-blue-50 rounded-xl p-6">
                <Truck className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Shipping Information</h4>
                <p className="text-gray-600 text-sm">
                  You will receive a shipping confirmation email with tracking details within 24 hours.
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <Mail className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Order Confirmation</h4>
                <p className="text-gray-600 text-sm">
                  A confirmation email has been sent to {formData.email || 'your email'}.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/store"
                className="inline-flex items-center px-6 py-3 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-semibold transition-colors duration-300 mr-4"
              >
                Continue Shopping
              </Link>
              <Link
                href="/orders"
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600 rounded-lg font-semibold transition-colors duration-300"
              >
                View Order History
              </Link>
            </div>
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
            href="/cart"
            className="inline-flex items-center text-gray-600 hover:text-amber-600 transition-colors duration-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Checkout
          </h1>
          <p className="text-gray-600">
            Complete your purchase in a few simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { number: 1, label: 'Shipping', icon: MapPin },
              { number: 2, label: 'Payment', icon: CreditCard },
              { number: 3, label: 'Confirm', icon: Shield }
            ].map((stepItem, index) => {
              const Icon = stepItem.icon;
              const isActive = step === stepItem.number;
              const isCompleted = step > stepItem.number;
              
              return (
                <div key={stepItem.number} className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    isActive 
                      ? 'border-amber-500 bg-amber-500 text-white' 
                      : isCompleted
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-gray-300 bg-white text-gray-400'
                  } transition-all duration-300`}>
                    {isCompleted ? (
                      <Shield className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className={`font-semibold ${
                      isActive ? 'text-amber-600' : 
                      isCompleted ? 'text-green-600' : 
                      'text-gray-400'
                    }`}>
                      Step {stepItem.number}
                    </div>
                    <div className="text-sm">{stepItem.label}</div>
                  </div>
                  {index < 2 && (
                    <div className={`h-1 w-16 mx-4 ${
                      step > stepItem.number ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {step === 1 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500"
                      id="saveInfo"
                    />
                    <label htmlFor="saveInfo" className="ml-2 text-gray-700">
                      Save this information for next time
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
                  
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {[
                      { id: 'card', label: 'Credit Card', icon: CreditCard },
                      { id: 'paypal', label: 'PayPal', icon: Wallet },
                      { id: 'applepay', label: 'Apple Pay', icon: CreditCard }
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          paymentMethod === method.id
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <method.icon className={`w-6 h-6 mb-2 ${
                          paymentMethod === method.id ? 'text-amber-600' : 'text-gray-600'
                        }`} />
                        <div className={`font-semibold ${
                          paymentMethod === method.id ? 'text-amber-600' : 'text-gray-900'
                        }`}>
                          {method.label}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Credit Card Form */}
                  {paymentMethod === 'card' && (
                    <>
                      <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Name on Card</label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-gray-700 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                      <div className="flex items-center mb-4">
                        <Wallet className="w-8 h-8 text-yellow-600 mr-3" />
                        <h3 className="font-bold text-gray-900">PayPal Checkout</h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        You will be redirected to PayPal to complete your payment securely.
                      </p>
                      <button className="w-full py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-lg font-semibold transition-colors duration-300">
                        Continue with PayPal
                      </button>
                    </div>
                  )}

                  {paymentMethod === 'applepay' && (
                    <div className="bg-black text-white rounded-xl p-6 mb-6">
                      <div className="flex items-center mb-4">
                        <CreditCard className="w-8 h-8 mr-3" />
                        <h3 className="font-bold">Apple Pay</h3>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Complete your purchase quickly and securely with Apple Pay.
                      </p>
                      <button className="w-full py-3 bg-white text-black hover:bg-gray-100 rounded-lg font-semibold transition-colors duration-300">
                        Pay with Apple Pay
                      </button>
                    </div>
                  )}

                  {/* Security Badge */}
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                    <Lock className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-gray-700">Secure encrypted payment</span>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Review</h2>
                  
                  {/* Shipping Info Review */}
                  <div className="mb-8">
                    <h3 className="font-bold text-gray-900 mb-4">Shipping Address</h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="text-gray-700">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.state} {formData.zipCode}<br />
                        {formData.email}<br />
                        {formData.phone}
                      </p>
                    </div>
                  </div>

                  {/* Payment Method Review */}
                  <div className="mb-8">
                    <h3 className="font-bold text-gray-900 mb-4">Payment Method</h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center">
                        {paymentMethod === 'card' && (
                          <>
                            <CreditCard className="w-6 h-6 text-gray-600 mr-3" />
                            <div>
                              <div className="font-semibold text-gray-900">Credit Card</div>
                              <div className="text-gray-600 text-sm">
                                Ending in {formData.cardNumber.slice(-4) || '••••'}
                              </div>
                            </div>
                          </>
                        )}
                        {paymentMethod === 'paypal' && (
                          <>
                            <Wallet className="w-6 h-6 text-blue-600 mr-3" />
                            <div className="font-semibold text-gray-900">PayPal</div>
                          </>
                        )}
                        {paymentMethod === 'applepay' && (
                          <>
                            <CreditCard className="w-6 h-6 mr-3" />
                            <div className="font-semibold text-gray-900">Apple Pay</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="mb-6">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms"
                        className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500 mt-1"
                        required
                      />
                      <label htmlFor="terms" className="ml-2 text-gray-700">
                        I agree to the Terms of Service and Privacy Policy. I understand that my order is subject to availability and confirmation.
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Previous Step
                  </button>
                )}
                <button
                  onClick={handleNextStep}
                  disabled={isProcessing}
                  className={`ml-auto px-8 py-3 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-bold transition-colors duration-300 flex items-center ${
                    isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? (
                    'Processing...'
                  ) : step === 3 ? (
                    <>
                      Place Order
                      <Lock className="w-5 h-5 ml-2" />
                    </>
                  ) : (
                    <>
                      Continue to {step === 1 ? 'Payment' : 'Review'}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Items List */}
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex items-center">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4">
                      <Image
                        src={item.featuredImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                      <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {item.cartQuantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm line-clamp-1">
                        {item.title}
                      </div>
                      <div className="text-gray-600 text-sm">
                        ${item.price.toFixed(2)} each
                      </div>
                    </div>
                    <div className="font-semibold">
                      ${(item.price * item.cartQuantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t pt-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-semibold text-green-800">Secure Checkout</div>
                    <div className="text-green-700 text-sm">Your information is protected</div>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Need help? <a href="mailto:support@traceadkins.com" className="text-amber-600 hover:text-amber-700">Contact Support</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}