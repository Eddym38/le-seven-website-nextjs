"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  activeSection?: string;
  scrollToSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  scrollToSection,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { id: "home", label: "Accueil", path: "/" },
    { id: "reservations", label: "Réservations", path: "/#reservations" },
    { id: "gallery", label: "Galerie", path: "/#gallery" },
    { id: "opening-hours", label: "Horaires", path: "/#opening-hours" },
    { id: "about", label: "Notre histoire", path: "/#about" },
    { id: "contact", label: "Contact", path: "/#contact" },
    { id: "privatization", label: "Privatisation", path: "/privatisation" },
  ];

  const handleNavigation = (e: React.MouseEvent, item: any) => {
    if (item.id === "privatization") {
      setIsMenuOpen(false);
      return;
    }

    // Si on est sur la page d'accueil, empêcher la navigation par défaut
    if (pathname === "/") {
      e.preventDefault();
      scrollToSection?.(item.id);
    }
    // Sinon, laisser Next.js naviguer vers /#section

    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-smooth-out ${
        scrolled
          ? "bg-background/98 backdrop-blur-md shadow-medium"
          : "bg-background/95 backdrop-blur-sm shadow-soft"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-pacifico text-2xl text-primary group">
          <motion.span
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Le Seven
          </motion.span>
        </Link>

        <div className="hidden md:flex space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              onClick={(e) => handleNavigation(e, item)}
              className="relative group"
            >
              <span
                className={`font-montserrat font-medium transition-colors duration-300 ${
                  (activeSection === item.id && pathname === "/") ||
                  (item.id === "privatization" &&
                    pathname === "/privatisation") ||
                  (item.id === "home" && pathname === "/")
                    ? "text-primary"
                    : "text-text hover:text-primary"
                }`}
              >
                {item.label}
              </span>
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-smooth-out group-hover:w-full ${
                  (activeSection === item.id && pathname === "/") ||
                  (item.id === "privatization" &&
                    pathname === "/privatisation") ||
                  (item.id === "home" && pathname === "/")
                    ? "w-full"
                    : ""
                }`}
              />
            </Link>
          ))}
        </div>

        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-text"
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-background border-t border-primary/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-2 space-y-2">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.path}
                    onClick={(e) => handleNavigation(e, item)}
                    className="block w-full text-left py-2 px-4 font-montserrat font-medium text-text hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
