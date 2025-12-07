'use client';

import React from "react";
import { AnimatedSection } from "./AnimatedSection";
import { ImageCarousel } from "./ImageCarousel";

// Configuration Cloudinary avec optimisations auto
const CLOUDINARY_BASE = "https://res.cloudinary.com/dtuwsi45y/image/upload";
const optimized = (filename: string, width = 800) =>
  `${CLOUDINARY_BASE}/f_auto,q_auto,w_${width},c_fill/${filename}`;

export const GallerySection: React.FC = () => {
  const galleryImages = [
    {
      thumbnail: optimized("galery-salade_italienne", 800),
      fullRes: optimized("galery-salade_italienne", 1920),
      alt: "Salade italienne fraîche - Le Seven Grenoble",
    },
    {
      thumbnail: optimized("galery-burger_vege", 800),
      fullRes: optimized("galery-burger_vege", 1920),
      alt: "Burger végétarien maison - Le Seven Grenoble",
    },
    {
      thumbnail: optimized("galery-camembert", 800),
      fullRes: optimized("galery-camembert", 1920),
      alt: "Camembert rôti au miel - Le Seven Grenoble",
    },
    {
      thumbnail: optimized("galery-creme_brulee", 800),
      fullRes: optimized("galery-creme_brulee", 1920),
      alt: "Crème brûlée à la vanille - Le Seven Grenoble",
    },
    {
      thumbnail: optimized("galery-entrecote", 800),
      fullRes: optimized("galery-entrecote", 1920),
      alt: "Entrecôte grillée - Le Seven Grenoble",
    },
    {
      thumbnail: optimized("galery-mousse_au_chocolat", 800),
      fullRes: optimized("galery-mousse_au_chocolat", 1920),
      alt: "Mousse au chocolat maison - Le Seven Grenoble",
    },
  ];

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-pacifico text-4xl md:text-5xl text-primary mb-4">
            Galerie
          </h2>
          <p className="font-montserrat text-lg text-text-light max-w-2xl mx-auto">
            Un voyage visuel à travers nos recettes délicieuses et notre
            ambiance bohème. Cliquez sur une image pour la voir en grand.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <ImageCarousel images={galleryImages} />
        </AnimatedSection>
      </div>
    </section>
  );
};
