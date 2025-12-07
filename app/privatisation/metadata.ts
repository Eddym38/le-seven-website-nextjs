import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privatisation Événements",
  description:
    "Privatisez Le Seven pour vos événements à Grenoble : mariages, anniversaires, séminaires. Capacité 20-50 personnes. Menus buffet, cocktail et mezzé libanais disponibles.",
  keywords: [
    "privatisation restaurant grenoble",
    "location salle grenoble",
    "événement restaurant grenoble",
    "mariage restaurant grenoble",
    "séminaire grenoble",
    "anniversaire restaurant",
    "privatisation le seven",
  ],
  alternates: {
    canonical: "/privatisation",
  },
  openGraph: {
    title: "Privatisation - Le Seven Restaurant Grenoble",
    description:
      "Privatisez notre restaurant pour vos événements : mariages, anniversaires, séminaires. Capacité 20-50 personnes.",
    url: "https://www.leseven-grenoble.fr/privatisation",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Privatisation Le Seven Restaurant Grenoble",
      },
    ],
  },
};
