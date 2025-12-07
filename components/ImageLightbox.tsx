"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate("prev");
      if (e.key === "ArrowRight") onNavigate("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.button
            className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Fermer"
          >
            <X size={28} />
          </motion.button>

          {images.length > 1 && (
            <>
              <motion.button
                className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 hidden md:block"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("prev");
                }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Image précédente"
              >
                <ChevronLeft size={32} />
              </motion.button>

              <motion.button
                className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 hidden md:block"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("next");
                }}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Image suivante"
              >
                <ChevronRight size={32} />
              </motion.button>
            </>
          )}

          <motion.div
            className="relative max-w-7xl max-h-[90vh] w-full px-4"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="relative w-full h-[80vh]"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={images[currentIndex]}
                  alt={`Image de galerie ${currentIndex + 1}`}
                  fill
                  className="object-contain rounded-lg"
                  sizes="90vw"
                  quality={95}
                />
              </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full font-montserrat text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </motion.div>

          <div className="absolute bottom-4 left-4 right-4 flex md:hidden justify-between gap-4">
            <motion.button
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("prev");
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Image précédente"
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("next");
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Image suivante"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
