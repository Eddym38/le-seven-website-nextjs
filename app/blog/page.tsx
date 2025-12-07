import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Actualités et articles du restaurant Le Seven",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold text-center pt-20">
        Blog
      </h1>
    </main>
  );
}
