import React from "react";
import { Instagram, Facebook } from "lucide-react";

interface FooterProps {
  scrollToSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#4C4C4C] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-pacifico text-2xl text-[#92C6C4] mb-4">
              Le Seven
            </h3>
            <p className="font-montserrat text-white/80 leading-relaxed">
              Une cuisine maison haute en couleurs, à partager dans une ambiance
              bohème et chaleureuse.
            </p>
          </div>

          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-4">
              Suivez-nous
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/leseven_grenoble/?hl=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-[#92C6C4] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/p/Le-Seven-Restaurant-100063636580125/?locale=fr_FR"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-[#92C6C4] transition-colors"
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
