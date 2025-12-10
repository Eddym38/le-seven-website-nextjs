import React from "react";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

interface FooterProps {
  scrollToSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-primary text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Coordonnées */}
          <div>
            <h3 className="font-pacifico text-2xl text-white mb-4">Le Seven</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin
                  size={20}
                  className="text-white/80 mt-1 flex-shrink-0"
                />
                <p className="font-montserrat text-white/80 text-sm">
                  2 Bd de l&apos;Esplanade
                  <br />
                  38000 Grenoble, France
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-white/80 flex-shrink-0" />
                <a
                  href="tel:+33953468128"
                  className="font-montserrat text-white/80 text-sm hover:text-white transition-colors"
                >
                  +33 9 53 46 81 28
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-white/80 flex-shrink-0" />
                <a
                  href="mailto:restaurantleseven38@gmail.com"
                  className="font-montserrat text-white/80 text-sm hover:text-white transition-colors"
                >
                  restaurantleseven38@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-4">
              Suivez-nous
            </h4>
            <p className="font-montserrat text-white/80 text-sm mb-4 leading-relaxed">
              Une cuisine maison haute en couleurs, à partager dans une ambiance
              bohème et chaleureuse.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/leseven_grenoble/?hl=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/p/Le-Seven-Restaurant-100063636580125/?locale=fr_FR"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-montserrat text-white/60 text-sm">
            © 2025 Le Seven Restaurant. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};
