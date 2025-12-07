"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import {
  Calendar,
  Users,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

export const ReservationsSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    date: "",
    time: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de la réservation");
      }

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            guests: "2",
            date: "",
            time: "",
            message: "",
          });
        }, 5000);
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert(
        "Une erreur est survenue lors de l'envoi de votre réservation. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reservations" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-pacifico text-4xl md:text-5xl text-primary mb-4">
            Réserver une table
          </h2>
          <p className="font-montserrat text-lg text-text-light max-w-2xl mx-auto">
            Réservez votre table dès maintenant et laissez-nous vous accueillir
            dans notre ambiance chaleureuse
          </p>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-12 text-center shadow-soft">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle
                    size={64}
                    className="text-primary mx-auto mb-6"
                  />
                </motion.div>
                <h3 className="font-pacifico text-3xl text-primary mb-4">
                  Réservation confirmée !
                </h3>
                <p className="font-montserrat text-text-light text-lg mb-4">
                  Merci {formData.name} ! Nous avons bien reçu votre demande de
                  réservation.
                </p>
                <p className="font-montserrat text-text-lighter">
                  Nous vous contacterons très prochainement au {formData.phone}{" "}
                  pour confirmer les détails.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnimatedSection delay={0.2}>
                <form
                  onSubmit={handleSubmit}
                  className="bg-gradient-to-br from-background to-background-light rounded-2xl shadow-large p-8 md:p-12 border border-primary/10"
                >
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-montserrat font-medium text-text mb-2"
                        >
                          Nom complet *
                        </label>
                        <div className="relative">
                          <User
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary transition-colors"
                            size={20}
                          />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 font-montserrat bg-white"
                            placeholder="Jean Dupont"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block font-montserrat font-medium text-text mb-2"
                        >
                          Email *
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary transition-colors"
                            size={20}
                          />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 font-montserrat bg-white"
                            placeholder="jean.dupont@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block font-montserrat font-medium text-text mb-2"
                        >
                          Téléphone *
                        </label>
                        <div className="relative">
                          <Phone
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary transition-colors"
                            size={20}
                          />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 font-montserrat bg-white"
                            placeholder="+33 6 12 34 56 78"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="guests"
                          className="block font-montserrat font-medium text-text mb-2"
                        >
                          Nombre de personnes *
                        </label>
                        <div className="relative">
                          <Users
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary transition-colors"
                            size={20}
                          />
                          <select
                            id="guests"
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 font-montserrat bg-white appearance-none cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? "personne" : "personnes"}
                              </option>
                            ))}
                            <option value="10+">Plus de 10 personnes</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="date"
                          className="block font-montserrat font-medium text-text mb-2"
                        >
                          Date souhaitée *
                        </label>
                        <div className="relative">
                          <Calendar
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary transition-colors"
                            size={20}
                          />
                          <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 font-montserrat bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="time"
                          className="block font-montserrat font-medium text-text mb-2"
                        >
                          Heure souhaitée *
                        </label>
                        <div className="relative">
                          <Clock
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary transition-colors"
                            size={20}
                          />
                          <select
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 font-montserrat bg-white appearance-none cursor-pointer"
                          >
                            <option value="">Choisir une heure</option>
                            <optgroup label="Service du midi">
                              <option value="12:00">12h00</option>
                              <option value="12:30">12h30</option>
                              <option value="13:00">13h00</option>
                              <option value="13:30">13h30</option>
                            </optgroup>
                            <optgroup label="Service du soir">
                              <option value="20:00">20h00</option>
                              <option value="20:30">20h30</option>
                              <option value="21:00">21h00</option>
                              <option value="21:30">21h30</option>
                            </optgroup>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block font-montserrat font-medium text-text mb-2"
                      >
                        Message ou demande spéciale (optionnel)
                      </label>
                      <div className="relative">
                        <MessageSquare
                          className="absolute left-4 top-4 text-primary transition-colors"
                          size={20}
                        />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 font-montserrat bg-white resize-none"
                          placeholder="Allergies, régimes spéciaux, occasion particulière..."
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-gradient-to-r from-primary to-accent-olive text-white px-8 py-5 rounded-xl font-montserrat font-semibold text-lg hover:shadow-glow transition-all duration-400 ease-smooth-out ${
                          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                        whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      >
                        {isSubmitting
                          ? "Envoi en cours..."
                          : "Confirmer la réservation"}
                      </motion.button>
                    </div>
                  </div>
                </form>
              </AnimatedSection>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
