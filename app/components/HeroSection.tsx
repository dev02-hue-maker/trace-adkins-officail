"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

interface HeroSectionProps {
  title: string;
  imageUrl: string;
}

export default function HeroSection({ title, imageUrl }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative h-screen w-full min-h-95 overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          className="object-cover"
          onLoad={() => setIsLoaded(true)}
          sizes="100vw"
        />
      </motion.div>

      {/* Dark Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-black"
      />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h1 className="px-4 text-center text-4xl font-extrabold tracking-wide text-white md:text-6xl">
          {title}
        </h1>
      </motion.div>
    </motion.section>
  );
}