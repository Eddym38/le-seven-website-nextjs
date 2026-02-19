"use client";

import { useState, useEffect } from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { GallerySection } from "@/components/GallerySection";
import { OpeningHoursSection } from "@/components/OpeningHoursSection";
import { ReservationsSection } from "@/components/ReservationsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");

  // Gérer le scroll au chargement de la page si un hash est présent dans l'URL
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // Attendre que la page soit complètement chargée
      setTimeout(() => {
        scrollToSection(hash);
      }, 100);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "gallery",
        "reservations",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />
      <ReservationsSection />
      <GallerySection />
      <OpeningHoursSection />
      <AboutSection />
      <ContactSection />
      <Footer scrollToSection={scrollToSection} />
      <ScrollToTop />
    </div>
  );
}
