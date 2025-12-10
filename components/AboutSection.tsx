"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { Heart, ChefHat, Sparkles, X } from "lucide-react";

const aboutBg = "/images/about-serveuse.jpg";

export const AboutSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section
      id="about"
      className="py-20 px-4 bg-gradient-to-b from-white to-background"
    >
      <div className="max-w-6xl mx-auto">
        {/* Titre principal */}
        <AnimatedSection className="text-center mb-16">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Heart size={32} className="text-primary" />
          </motion.div>
          <h2 className="font-pacifico text-4xl md:text-5xl text-primary mb-4">
            Notre histoire
          </h2>
          <p className="font-montserrat text-lg text-text-light max-w-2xl mx-auto">
            Une aventure familiale portée par la passion et le goût du partage
          </p>
        </AnimatedSection>

        {/* Contenu principal en grille */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedSection delay={0.2}>
            <motion.div
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={aboutBg}
                alt="Service chaleureux au restaurant Le Seven Grenoble"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection
            delay={0.4}
            className="text-center lg:text-left space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <p className="font-montserrat text-xl text-primary font-semibold mb-3">
                Le Seven, c'est une histoire de famille.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border-l-4 border-primary"
            >
              <div className="flex items-start gap-3 mb-2">
                <ChefHat
                  size={24}
                  className="text-primary mt-1 flex-shrink-0"
                />
                <div className="font-montserrat text-lg text-text">
                  <p>
                    En cuisine, <strong className="text-primary">Issam</strong>,
                    franco-libanais passionné par la cuisine et le souci du
                    détail.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-secondary/5 to-primary/5 p-6 rounded-xl border-l-4 border-secondary"
            >
              <div className="flex items-start gap-3 mb-2">
                <Sparkles
                  size={24}
                  className="text-secondary mt-1 flex-shrink-0"
                />
                <div className="font-montserrat text-lg text-text">
                  <p>
                    En salle, <strong className="text-secondary">Nadia</strong>,
                    le sourire, la bienveillance et cette chaleur qui donne
                    l'impression de venir dîner chez des amis.
                  </p>
                </div>
              </div>
              <p className="font-montserrat text-sm text-text-light italic mt-3 pl-9">
                (Parfois, vous aurez la chance d'apercevoir Rayan et sa bonne
                humeur, qui pourrait vous vendre un cure-dent)
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Section valeurs en cartes */}
        <AnimatedSection delay={0.6}>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-soft text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={24} className="text-primary" />
              </div>
              <h3 className="font-montserrat font-bold text-primary mb-2">
                Fait Maison
              </h3>
              <p className="font-montserrat text-sm text-text-light">
                Nous avons imaginé un lieu à notre image : gourmand et
                entièrement fait maison. Ici, rien de superflu.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-soft text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat size={24} className="text-primary" />
              </div>
              <h3 className="font-montserrat font-bold text-primary mb-2">
                Qualité avant tout
              </h3>
              <p className="font-montserrat text-sm text-text-light">
                Nous avons choisi de proposer une carte volontairement réduite,
                parce que nous préférons cuisiner peu… mais cuisiner bien.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-soft text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={24} className="text-primary" />
              </div>
              <h3 className="font-montserrat font-bold text-primary mb-2">
                Pour tous
              </h3>
              <p className="font-montserrat text-sm text-text-light">
                Nous voulons que chacun puisse profiter de notre cuisine, c'est
                pourquoi plusieurs de nos plats sont naturellement sans gluten
                ou végétarien.
              </p>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Spécialités */}
        <AnimatedSection delay={0.8}>
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent-olive/10 rounded-2xl p-8">
            <h3 className="font-pacifico text-3xl text-primary text-center mb-8">
              Nos spécialités
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-soft overflow-hidden cursor-pointer"
                onClick={() =>
                  setSelectedImage("/images/gallery/souris-d-agneau.jpg")
                }
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/gallery/souris-d-agneau.jpg"
                    alt="Souris d'agneau cuite 7 heures"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: "center 60%" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-montserrat opacity-0 hover:opacity-100 transition-opacity">
                      Cliquez pour agrandir
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-montserrat font-bold text-primary text-xl mb-2">
                    🍖 Souris d'agneau - 7 heures
                  </h4>
                  <p className="font-montserrat text-text-light">
                    Notre fierté : fondante, parfumée, celle qui se découpe à la
                    cuillère{" "}
                    <span className="italic text-sm">
                      (ou avec le cure-dent acheté précédemment)
                    </span>
                    .
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-soft overflow-hidden cursor-pointer"
                onClick={() =>
                  setSelectedImage("/images/gallery/foie-de-veau.jpg")
                }
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/gallery/foie-de-veau.jpg"
                    alt="Foie de veau persillé"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: "center 30%" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-montserrat opacity-0 hover:opacity-100 transition-opacity">
                      Cliquez pour agrandir
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-montserrat font-bold text-primary text-xl mb-2">
                    🥩 Foie de veau persillé
                  </h4>
                  <p className="font-montserrat text-text-light">
                    Travaillé pour réconcilier ceux qui pensaient ne pas aimer
                    le foie… et surprendre ceux qui l'adorent déjà.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedImage(null)}
              aria-label="Fermer"
            >
              <X size={32} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Spécialité Le Seven"
                width={1200}
                height={800}
                className="rounded-xl object-contain w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
