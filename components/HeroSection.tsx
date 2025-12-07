"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  scrollToSection,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          transform: `scale(${1 + scrollY * 0.0005})`,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src="/images/hero-restaurant.jpg"
          alt="Le Seven Restaurant"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </motion.div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.h1
          className="font-pacifico text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Le Seven
        </motion.h1>
        <motion.p
          className="font-montserrat text-xl md:text-2xl lg:text-3xl mb-8 font-light leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Une cuisine maison haute en couleurs
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <motion.button
            onClick={() => scrollToSection("reservations")}
            className="bg-primary text-white px-8 py-4 rounded-full font-montserrat font-semibold text-lg hover:bg-secondary transition-all duration-400 ease-smooth-out shadow-lg hover:shadow-glow"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Réserver une table
          </motion.button>
          <motion.button
            onClick={() => scrollToSection("menu")}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-montserrat font-semibold text-lg hover:bg-white hover:text-text-dark transition-all duration-400 ease-smooth-out"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Voir le menu
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
