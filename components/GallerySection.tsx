"use client";

import React from "react";
import { AnimatedSection } from "./AnimatedSection";
import { ImageCarousel } from "./ImageCarousel";

export const GallerySection: React.FC = () => {
  const galleryImages = [
    {
      thumbnail: "/images/gallery/salade-italienne.jpg",
      fullRes: "/images/gallery/salade-italienne.jpg",
      alt: "Salade italienne fraîche - Le Seven Grenoble",
    },
    {
      thumbnail: "/images/gallery/burger-vege.jpg",
      fullRes: "/images/gallery/burger-vege.jpg",
      alt: "Burger végétarien maison - Le Seven Grenoble",
    },
    {
      thumbnail: "/images/gallery/camembert.jpg",
      fullRes: "/images/gallery/camembert.jpg",
      alt: "Camembert rôti au miel - Le Seven Grenoble",
    },
    {
      thumbnail: "/images/gallery/creme-brulee.jpg",
      fullRes: "/images/gallery/creme-brulee.jpg",
      alt: "Crème brûlée à la vanille - Le Seven Grenoble",
    },
    {
      thumbnail: "/images/gallery/entrecote.jpg",
      fullRes: "/images/gallery/entrecote.jpg",
      alt: "Entrecôte grillée - Le Seven Grenoble",
    },
    {
      thumbnail: "/images/gallery/mousse-au-chocolat.jpg",
      fullRes: "/images/gallery/mousse-au-chocolat.jpg",
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
