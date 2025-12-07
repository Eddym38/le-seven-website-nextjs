"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import {
  Users,
  Calendar,
  Utensils,
  Sparkles,
  Mail,
  User,
  Phone,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PrivatizationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guests: "",
    date: "",
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
      const response = await fetch("/api/send-privatization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de la demande");
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
            eventType: "",
            guests: "",
            date: "",
            message: "",
          });
        }, 5000);
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert(
        "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; // Hauteur de la navbar (h-16 = 64px)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;

      window.scrollTo({
        top: sectionId === "home" ? 0 : offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar scrollToSection={scrollToSection} />

      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-white to-[#FAF6EF]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#92C6C4]/10 rounded-full mb-6">
            <Sparkles size={40} className="text-[#92C6C4]" />
          </div>
          <h1 className="font-pacifico text-5xl md:text-6xl text-[#92C6C4] mb-6">
            Privatisation
          </h1>
          <p className="font-montserrat text-xl text-[#4C4C4C]/80 leading-relaxed max-w-3xl mx-auto">
            Créez des moments inoubliables dans l&apos;ambiance chaleureuse et
            conviviale du Seven. Notre restaurant se transforme pour accueillir
            vos événements les plus précieux.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#92C6C4]/10 rounded-full flex items-center justify-center mb-6">
                <Users size={32} className="text-[#92C6C4]" />
              </div>
              <h2 className="font-pacifico text-3xl text-[#92C6C4] mb-4">
                Capacité
              </h2>
              <div className="space-y-3 font-montserrat text-[#4C4C4C]/80">
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-[#92C6C4] rounded-full mr-3"></span>
                  Minimum: 20 personnes
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-[#92C6C4] rounded-full mr-3"></span>
                  Maximum: 50 couverts
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-[#92C6C4] rounded-full mr-3"></span>
                  Configuration flexible selon vos besoins
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#F7C8C8]/20 rounded-full flex items-center justify-center mb-6">
                <Calendar size={32} className="text-[#F7C8C8]" />
              </div>
              <h2 className="font-pacifico text-3xl text-[#92C6C4] mb-4">
                Événements
              </h2>
              <div className="space-y-3 font-montserrat text-[#4C4C4C]/80">
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-[#F7C8C8] rounded-full mr-3"></span>
                  Mariages et fiançailles
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-[#F7C8C8] rounded-full mr-3"></span>
                  Anniversaires et fêtes familiales
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-[#F7C8C8] rounded-full mr-3"></span>
                  Dîners d&apos;entreprise et séminaires
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-[#F7C8C8] rounded-full mr-3"></span>
                  Pots de départ et célébrations
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#92C6C4]/10 via-[#F7C8C8]/10 to-[#98A88B]/10 rounded-2xl p-8 md:p-12 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <Utensils size={48} className="text-[#92C6C4] mx-auto mb-6" />
              <h2 className="font-pacifico text-3xl md:text-4xl text-[#92C6C4] mb-6">
                Formules disponibles
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="font-montserrat font-bold text-xl text-[#4C4C4C] mb-3">
                    Buffet
                  </h3>
                  <p className="font-montserrat text-[#4C4C4C]/80 text-sm">
                    Une sélection variée de plats méditerranéens présentés en
                    buffet. Idéal pour les événements conviviaux et
                    décontractés.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="font-montserrat font-bold text-xl text-[#4C4C4C] mb-3">
                    Dîner cocktail
                  </h3>
                  <p className="font-montserrat text-[#4C4C4C]/80 text-sm">
                    Canapés raffinés et bouchées savoureuses pour un cocktail
                    élégant. Parfait pour les réceptions debout.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="font-montserrat font-bold text-xl text-[#4C4C4C] mb-3">
                    Mezzé libanais
                  </h3>
                  <p className="font-montserrat text-[#4C4C4C]/80 text-sm">
                    Découverte authentique des saveurs du Liban avec nos mezzés
                    traditionnels. Une expérience culinaire unique.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-pacifico text-4xl md:text-5xl text-[#92C6C4] mb-4">
              Demande de privatisation
            </h2>
            <p className="font-montserrat text-lg text-[#4C4C4C]/80 max-w-2xl mx-auto">
              Remplissez ce formulaire et nous vous contacterons dans les plus
              brefs délais pour concrétiser votre projet
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-gradient-to-br from-[#92C6C4]/10 to-[#F7C8C8]/10 rounded-2xl p-12 text-center shadow-xl">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle
                      size={64}
                      className="text-[#92C6C4] mx-auto mb-6"
                    />
                  </motion.div>
                  <h3 className="font-pacifico text-3xl text-[#92C6C4] mb-4">
                    Demande envoyée avec succès ! 🎉
                  </h3>
                  <p className="font-montserrat text-[#4C4C4C] text-lg mb-4">
                    Merci {formData.name} ! Nous avons bien reçu votre demande
                    de privatisation.
                  </p>
                  <p className="font-montserrat text-[#4C4C4C]/80">
                    Notre équipe vous contactera dans les{" "}
                    <strong>24 à 48 heures</strong> au {formData.phone} pour
                    discuter des détails de votre événement.
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
                <form
                  onSubmit={handleSubmit}
                  className="bg-gradient-to-br from-[#FAF6EF] to-white rounded-2xl shadow-xl p-8 md:p-12 border border-[#92C6C4]/10"
                >
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-montserrat font-medium text-[#4C4C4C] mb-2"
                        >
                          Nom complet *
                        </label>
                        <div className="relative">
                          <User
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92C6C4]"
                            size={20}
                          />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#92C6C4]/20 focus:border-[#92C6C4] focus:outline-none transition-colors font-montserrat bg-white"
                            placeholder="Jean Dupont"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block font-montserrat font-medium text-[#4C4C4C] mb-2"
                        >
                          Email *
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92C6C4]"
                            size={20}
                          />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#92C6C4]/20 focus:border-[#92C6C4] focus:outline-none transition-colors font-montserrat bg-white"
                            placeholder="jean.dupont@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block font-montserrat font-medium text-[#4C4C4C] mb-2"
                        >
                          Téléphone *
                        </label>
                        <div className="relative">
                          <Phone
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92C6C4]"
                            size={20}
                          />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#92C6C4]/20 focus:border-[#92C6C4] focus:outline-none transition-colors font-montserrat bg-white"
                            placeholder="+33 6 12 34 56 78"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="eventType"
                          className="block font-montserrat font-medium text-[#4C4C4C] mb-2"
                        >
                          Type d&apos;événement *
                        </label>
                        <div className="relative">
                          <Sparkles
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92C6C4] pointer-events-none z-10"
                            size={20}
                          />
                          <select
                            id="eventType"
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-10 py-3 rounded-xl border-2 border-[#92C6C4]/20 focus:border-[#92C6C4] focus:ring-2 focus:ring-[#92C6C4]/20 focus:outline-none transition-all duration-300 font-montserrat bg-white cursor-pointer appearance-none"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2392C6C4'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 0.75rem center",
                              backgroundSize: "1.5em 1.5em",
                            }}
                          >
                            <option value="">Sélectionner un type</option>
                            <option value="Mariage">Mariage</option>
                            <option value="Fiançailles">Fiançailles</option>
                            <option value="Anniversaire">Anniversaire</option>
                            <option value="Dîner d'entreprise">
                              Dîner d&apos;entreprise
                            </option>
                            <option value="Séminaire">Séminaire</option>
                            <option value="Pot de départ">Pot de départ</option>
                            <option value="Autre">Autre célébration</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="guests"
                          className="block font-montserrat font-medium text-[#4C4C4C] mb-2"
                        >
                          Nombre d&apos;invités *
                        </label>
                        <div className="relative">
                          <Users
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92C6C4] pointer-events-none z-10"
                            size={20}
                          />
                          <input
                            type="number"
                            id="guests"
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            required
                            min="20"
                            max="50"
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#92C6C4]/20 focus:border-[#92C6C4] focus:ring-2 focus:ring-[#92C6C4]/20 focus:outline-none transition-all duration-300 font-montserrat bg-white"
                            placeholder="30"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="date"
                          className="block font-montserrat font-medium text-[#4C4C4C] mb-2"
                        >
                          Date souhaitée *
                        </label>
                        <div className="relative">
                          <Calendar
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92C6C4] pointer-events-none z-10"
                            size={20}
                          />
                          <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#92C6C4]/20 focus:border-[#92C6C4] focus:ring-2 focus:ring-[#92C6C4]/20 focus:outline-none transition-all duration-300 font-montserrat bg-white cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:transition-opacity"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block font-montserrat font-medium text-[#4C4C4C] mb-2"
                      >
                        Détails de votre événement *
                      </label>
                      <div className="relative">
                        <MessageSquare
                          className="absolute left-4 top-4 text-[#92C6C4]"
                          size={20}
                        />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#92C6C4]/20 focus:border-[#92C6C4] focus:outline-none transition-colors font-montserrat bg-white resize-none"
                          placeholder="Décrivez votre projet: formule souhaitée (buffet, cocktail, mezzé), budget estimé, attentes particulières, allergies ou régimes spéciaux..."
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-gradient-to-r from-[#92C6C4] to-[#98A88B] text-white px-8 py-5 rounded-xl font-montserrat font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSubmitting
                          ? "Envoi en cours..."
                          : "Envoyer ma demande"}
                      </button>
                      <p className="text-center font-montserrat text-sm text-[#4C4C4C]/60 mt-4">
                        Nous vous répondrons dans les 24 à 48 heures
                      </p>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-[#FAF6EF] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-pacifico text-3xl md:text-4xl text-[#92C6C4] mb-6">
            Pourquoi choisir Le Seven ?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="font-montserrat font-bold text-xl text-[#4C4C4C] mb-4">
                Cuisine authentique
              </h3>
              <p className="font-montserrat text-[#4C4C4C]/80">
                Tous nos plats sont préparés maison avec des ingrédients frais
                et de qualité. Une cuisine méditerranéenne généreuse qui ravira
                tous vos invités.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="font-montserrat font-bold text-xl text-[#4C4C4C] mb-4">
                Ambiance chaleureuse
              </h3>
              <p className="font-montserrat text-[#4C4C4C]/80">
                Notre décor bohème et notre atmosphère conviviale créent le
                cadre idéal pour vos événements intimes et chaleureux.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="font-montserrat font-bold text-xl text-[#4C4C4C] mb-4">
                Service personnalisé
              </h3>
              <p className="font-montserrat text-[#4C4C4C]/80">
                Notre équipe s&apos;adapte à vos besoins spécifiques et vous
                accompagne dans l&apos;organisation de votre événement de A à Z.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="font-montserrat font-bold text-xl text-[#4C4C4C] mb-4">
                Emplacement central
              </h3>
              <p className="font-montserrat text-[#4C4C4C]/80">
                Situé au cœur de Grenoble, Le Seven est facilement accessible
                pour tous vos invités.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer scrollToSection={scrollToSection} />
      <ScrollToTop />
    </div>
  );
}
