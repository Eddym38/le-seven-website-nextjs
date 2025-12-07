import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accueil",
  description: "Bienvenue au Seven - Restaurant & Bar d'exception",
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold text-center pt-20">
        Le Seven - Page d&apos;accueil
      </h1>
      <p className="text-center mt-4 text-gray-600">
        En cours de migration depuis React vers Next.js
      </p>
    </main>
  );
}
