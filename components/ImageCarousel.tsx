"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ImageLightbox } from "./ImageLightbox";
import Image from "next/image";

interface ImageCarouselProps {
  images: Array<{
    thumbnail: string;
    fullRes: string;
    alt: string;
  }>;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-soft group cursor-pointer h-80"
            onClick={() => openLightbox(index)}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            role="button"
            tabIndex={0}
            aria-label={`Voir ${image.alt}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(index);
              }
            }}
          >
            <Image
              src={image.thumbnail}
              alt={image.alt}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-600 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-montserrat font-semibold text-lg">
                Voir en grand
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <ImageLightbox
        images={images.map((img) => img.fullRes)}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </>
  );
};
