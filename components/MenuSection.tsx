import React from "react";

export const MenuSection: React.FC = () => {
  return (
    <section id="menu" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-pacifico text-4xl md:text-5xl text-[#92C6C4] mb-4">
            Notre menu
          </h2>
          <p className="font-montserrat text-lg text-[#4C4C4C]/80 max-w-2xl mx-auto">
            Découvrez notre menu méditerranéen avec des inspirations libanaises
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a
              href="/pdf/menu_le_seven_vf.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#92C6C4] text-white px-12 py-5 rounded-full font-montserrat font-semibold text-xl hover:bg-[#F7C8C8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Carte Menu
            </a>
            <a
              href="/pdf/carte_boisson_le_seven_vf.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#92C6C4] text-white px-12 py-5 rounded-full font-montserrat font-semibold text-xl hover:bg-[#F7C8C8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Carte Boissons
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
