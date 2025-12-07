import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Le Seven - Restaurant & Bar",
    template: "%s | Le Seven"
  },
  description: "Découvrez Le Seven, restaurant et bar d'exception",
  keywords: ["restaurant", "bar", "Le Seven", "gastronomie"],
  authors: [{ name: "Le Seven" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.leseven.com",
    siteName: "Le Seven",
    title: "Le Seven - Restaurant & Bar",
    description: "Découvrez Le Seven, restaurant et bar d'exception",
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Seven - Restaurant & Bar",
    description: "Découvrez Le Seven, restaurant et bar d'exception",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
