import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Le Seven - Restaurant Grenoble | Cuisine Maison & Ambiance Bohème",
    template: "%s | Le Seven Restaurant Grenoble"
  },
  description: "Restaurant Le Seven à Grenoble : cuisine maison aux inspirations franco-libanaises, ambiance bohème et chaleureuse. Terrasse conviviale et privatisation disponible.",
  keywords: [
    "restaurant grenoble",
    "cuisine libanaise grenoble",
    "restaurant bohème",
    "privatisation restaurant grenoble",
    "terrasse grenoble",
    "le seven grenoble",
    "restaurant esplanade grenoble"
  ],
  authors: [{ name: "Le Seven Restaurant" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.leseven-grenoble.fr",
    siteName: "Le Seven Restaurant Grenoble",
    title: "Le Seven - Restaurant Grenoble | Cuisine Maison & Ambiance Bohème",
    description: "Restaurant Le Seven à Grenoble : cuisine maison aux inspirations franco-libanaises, ambiance bohème et chaleureuse.",
    images: [
      {
        url: "https://res.cloudinary.com/dtuwsi45y/image/upload/f_auto,q_auto,w_1200/hero-restaurant_l5gjgr",
        width: 1200,
        height: 630,
        alt: "Le Seven Restaurant Grenoble"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Seven - Restaurant Grenoble",
    description: "Cuisine maison aux inspirations franco-libanaises, ambiance bohème et chaleureuse",
    images: ["https://res.cloudinary.com/dtuwsi45y/image/upload/f_auto,q_auto,w_1200/hero-restaurant_l5gjgr"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "votre-code-google-search-console", // À remplacer
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
