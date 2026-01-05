"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Ticket, Camera, Package, Mail } from "lucide-react";

export default function VIPPackages() {
  const [activeTab, setActiveTab] = useState<"photo" | "merch">("photo");

  const packages = {
    photo: {
      title: "Trace Adkins VIP Photo Op Package",
      icon: Camera,
      price: null, // Add price if available
      features: [
        { icon: Ticket, text: "Premium Ticket" },
        { icon: Camera, text: "Preshow Photo Op with Trace" },
        { text: "Exclusive Foil Litho Autographed by Trace" },
        { text: "One personal item autographed by Trace" },
        { text: "Special VIP T-Shirt" },
        { text: "Exclusive VIP Merchandise" },
        { text: "Commemorative Laminate and Lanyard" },
        { text: "Early Entry + Pre-doors Merch Shopping (where available)" },
        { text: "Dedicated VIP Check-in Area" },
        { text: "Onsite VIP Host" }
      ]
    },
    merch: {
      title: "Trace Adkins VIP Merch Package",
      icon: Package,
      price: null, // Add price if available
      features: [
        { icon: Ticket, text: "Premium Ticket" },
        { text: "Exclusive Foil Litho, Autographed by Trace" },
        { text: "Special VIP T-Shirt" },
        { text: "Exclusive VIP Merchandise" }
      ]
    }
  };

  const faqs = [
    {
      question: "VIP Photo Op Instructions",
      answer: "Instructions are emailed 2-3 days prior to the event to the email address listed on the order. Plan to arrive 1-2 hours before doors open. For personal autographed item, large items not permitted. The artist reserves the right to refuse to sign any item at their discretion."
    },
    {
      question: "Package Fulfillment Details",
      answer: "All VIP Package buyers: You will receive an email from ONELIVE with further details regarding your package fulfillment and requesting your T-Shirt size. Merchandise is shipped the week of the show to the address provided at checkout and may arrive shortly before or after the event date."
    },
    {
      question: "Need to Update Your Information?",
      answer: "If you need to update your shipping address, or have a question related to your package, please email VIP@ONELIVE.COM"
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trace Adkins <span className="text-amber-600">VIP Experiences</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Exclusive packages offering premium access, memorabilia, and unforgettable experiences
          </p>
        </motion.div>

        {/* Package Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-white p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab("photo")}
              className={`px-6 py-3 text-sm font-medium rounded-md transition-all duration-300 ${
                activeTab === "photo"
                  ? "bg-amber-600 text-white shadow"
                  : "text-gray-700 hover:text-amber-600"
              }`}
            >
              VIP Photo Op Package
            </button>
            <button
              onClick={() => setActiveTab("merch")}
              className={`px-6 py-3 text-sm font-medium rounded-md transition-all duration-300 ${
                activeTab === "merch"
                  ? "bg-amber-600 text-white shadow"
                  : "text-gray-700 hover:text-amber-600"
              }`}
            >
              VIP Merch Package
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Package Details Card */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-amber-100 rounded-xl mr-4">
                  {(() => {
                    const Icon = packages[activeTab].icon;
                    return <Icon className="w-8 h-8 text-amber-600" />;
                  })()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {packages[activeTab].title}
                  </h2>
                  {/* Uncomment if you have prices */}
                  {/* {packages[activeTab].price && (
                    <p className="text-amber-600 font-semibold text-xl mt-1">
                      ${packages[activeTab].price}
                    </p>
                  )} */}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Package Includes:</h3>
                <ul className="space-y-3">
                  {packages[activeTab].features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                      <span className="text-gray-700">{feature.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-8 border-t"
              >
                <button className="w-full bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold py-4 px-6 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Select This Package
                </button>
                <p className="text-center text-gray-500 text-sm mt-3">
                  Limited availability • Secure your spot today
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Important Information</h3>
            
            <AnimatePresence>
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-5 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-4"
                      >
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100"
            >
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Contact our VIP support team for assistance with your package.
                  </p>
                  <a
                    href="mailto:VIP@ONELIVE.COM"
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
                  >
                    VIP@ONELIVE.COM
                    <ChevronDown className="w-4 h-4 ml-1 rotate-270" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 p-6 bg-gray-800 text-gray-300 rounded-xl"
        >
          <p className="text-sm text-center">
            All VIP packages are subject to availability. Prices, inclusions, and terms are subject to change without notice. 
            The artist reserves the right to modify or cancel any VIP package at their discretion. 
            All sales are final - no refunds or exchanges except as required by law.
          </p>
        </motion.div>
      </div>
    </div>
  );
}