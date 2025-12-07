"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { Clock } from "lucide-react";

export const OpeningHoursSection: React.FC = () => {
  const openingHours = [
    { day: "Lundi", hours: "Fermé", isClosed: true },
    { day: "Mardi", hours: "12h00 - 13h30 / 19h00 - 21h30", isClosed: false },
    {
      day: "Mercredi",
      hours: "12h00 - 13h30 / 19h00 - 21h30",
      isClosed: false,
    },
    { day: "Jeudi", hours: "12h00 - 13h30 / 19h00 - 21h30", isClosed: false },
    {
      day: "Vendredi",
      hours: "12h00 - 13h30 / 19h00 - 21h30",
      isClosed: false,
    },
    { day: "Samedi", hours: "12h00 - 13h30 / 19h00 - 21h30", isClosed: false },
    { day: "Dimanche", hours: "12h00 - 13h30", isClosed: false },
  ];

  return (
    <section
      id="opening-hours"
      className="py-20 px-4 bg-gradient-to-b from-white to-background"
    >
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Clock size={32} className="text-primary" />
          </motion.div>
          <h2 className="font-pacifico text-4xl md:text-5xl text-primary mb-4">
            Horaires d&apos;ouverture
          </h2>
          <p className="font-montserrat text-lg text-text-light max-w-2xl mx-auto">
            Nous vous accueillons chaleureusement tout au long de la semaine
            pour des moments de convivialité
          </p>
        </AnimatedSection>

        <AnimatedSection
          delay={0.2}
          className="bg-white rounded-2xl shadow-soft overflow-hidden max-w-2xl mx-auto"
        >
          <div className="divide-y divide-primary/10">
            {openingHours.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between px-8 py-5 hover:bg-primary/5 transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="font-montserrat font-semibold text-text text-lg">
                  {item.day}
                </span>
                <span
                  className={`font-montserrat text-right ${
                    item.isClosed
                      ? "text-text-lighter italic"
                      : "text-text-light font-medium"
                  }`}
                >
                  {item.hours}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent-olive/10 px-8 py-6">
            <p className="font-montserrat text-sm text-text-light text-center">
              <span className="font-semibold">Note:</span> Les horaires peuvent
              varier lors des jours fériés. Nous vous recommandons de nous
              contacter pour confirmer.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
