import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.leseven-grenoble.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Le Seven - Restaurant Grenoble | Cuisine Franco-Libanaise, Vegan & Sans Lactose",
    template: "%s | Le Seven Restaurant Grenoble",
  },
  description:
    "Restaurant Le Seven à Grenoble : cuisine maison aux inspirations franco-libanaises, ambiance bohème et chaleureuse. Options vegan, végétarien et sans lactose. Terrasse conviviale, réservation et privatisation disponible.",
  keywords: [
    "restaurant grenoble",
    "cuisine libanaise grenoble",
    "restaurant bohème grenoble",
    "privatisation restaurant grenoble",
    "terrasse grenoble",
    "le seven grenoble",
    "restaurant esplanade grenoble",
    "réservation restaurant grenoble",
    "restaurant franco-libanais",
    "cuisine méditerranéenne grenoble",
    "restaurant vegan grenoble",
    "restaurant végétarien grenoble",
    "sans lactose grenoble",
    "options vegan grenoble",
    "cuisine végétarienne grenoble",
    "restaurant allergie lactose",
  ],
  authors: [{ name: "Le Seven Restaurant" }],
  creator: "Le Seven",
  publisher: "Le Seven Restaurant Grenoble",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Le Seven Restaurant Grenoble",
    title: "Le Seven - Restaurant Grenoble | Cuisine Franco-Libanaise, Vegan & Sans Lactose",
    description:
      "Restaurant Le Seven à Grenoble : cuisine maison aux inspirations franco-libanaises, ambiance bohème et chaleureuse. Options vegan, végétarien et sans lactose. Terrasse, réservation et privatisation.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Le Seven Restaurant Grenoble - Cuisine Franco-Libanaise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Seven - Restaurant Grenoble",
    description:
      "Cuisine maison franco-libanaise, options vegan et sans lactose, ambiance bohème",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "67239e80917c0489",
  },
  other: {
    "geo.region": "FR-38",
    "geo.placename": "Grenoble",
    "geo.position": "45.188529;5.724524",
    "ICBM": "45.188529, 5.724524",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Le Seven",
    image: "https://www.leseven-grenoble.fr/images/og-image.jpg",
    "@id": "https://www.leseven-grenoble.fr",
    url: "https://www.leseven-grenoble.fr",
    telephone: "+33476873310",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "7 Esplanade",
      addressLocality: "Grenoble",
      postalCode: "38000",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.188529,
      longitude: 5.724524,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "12:00",
        closes: "14:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
        opens: "20:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "20:00",
        closes: "23:00",
      },
    ],
    servesCuisine: ["French", "Lebanese", "Mediterranean"],
    acceptsReservations: "True",
    menu: "https://www.leseven-grenoble.fr/#menu",
    hasMenu: "https://www.leseven-grenoble.fr/#menu",
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Options véganes disponibles",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Options végétariennes disponibles",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Options sans lactose disponibles",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Terrasse extérieure",
        value: true,
      },
    ],
    menuAvailability: "Vegan, Vegetarian, Lactose-Free options available",
  };

  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#92C6C4" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
