import React from "react";
import Image from "next/image";

const aboutBg =
  "https://res.cloudinary.com/dtuwsi45y/image/upload/f_auto,q_auto,w_1200,c_fill/galery-souris_serveuse";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-pacifico text-4xl md:text-5xl text-[#92C6C4] mb-6">
              Notre histoire
            </h2>
            <div className="space-y-6 font-montserrat text-lg leading-relaxed text-[#4C4C4C]">
              <p>
                Depuis près de 10 ans, Le Seven fait vibrer Grenoble avec une
                cuisine maison colorée, inspirée par les racines
                franco-libanaises de notre chef. Entre assiettes généreuses,
                ambiance bohème et terrasse conviviale, nous cultivons un esprit
                chaleureux où l&apos;on vient autant pour se régaler que pour
                partager.
              </p>
            </div>
          </div>
          <div className="relative h-[500px]">
            <Image
              src={aboutBg}
              alt="Service chaleureux au restaurant Le Seven Grenoble"
              fill
              className="rounded-2xl shadow-lg object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
