import sharp from "sharp";
import fs from "fs";
import path from "path";

async function generateBlurDataURL(imagePath: string): Promise<string> {
  const imageBuffer = fs.readFileSync(imagePath);

  const blurBuffer = await sharp(imageBuffer)
    .resize(10) // Très petite taille pour le placeholder
    .blur()
    .toBuffer();

  const base64 = blurBuffer.toString("base64");
  return `data:image/jpeg;base64,${base64}`;
}

async function main() {
  const heroPath = path.join(
    process.cwd(),
    "public",
    "images",
    "hero-restaurant.webp"
  );

  if (!fs.existsSync(heroPath)) {
    console.error("❌ Image hero introuvable:", heroPath);
    process.exit(1);
  }

  console.log("🔍 Génération du blurDataURL pour hero-restaurant.webp...");

  const blurDataURL = await generateBlurDataURL(heroPath);

  // Créer un fichier avec le blurDataURL
  const outputPath = path.join(process.cwd(), "lib", "blur-data.ts");
  const content = `// Auto-généré par scripts/generate-blur.ts
export const heroBlurDataURL = "${blurDataURL}";
`;

  // Créer le dossier lib s'il n'existe pas
  const libDir = path.join(process.cwd(), "lib");
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, content);

  console.log("✅ blurDataURL généré avec succès!");
  console.log("📁 Fichier créé:", outputPath);
  console.log("📏 Taille:", blurDataURL.length, "caractères");
}

main().catch(console.error);
