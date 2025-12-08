import sharp from "sharp";
import { join } from "path";

const inputPath = join(process.cwd(), "public/images/hero-restaurant.webp");
const outputPath = join(process.cwd(), "public/images/og-image.jpg");

async function createOgImage() {
  try {
    await sharp(inputPath)
      .resize(1200, 630, {
        fit: "cover",
        position: "center",
      })
      .jpeg({ quality: 85 })
      .toFile(outputPath);

    console.log("✅ og-image.jpg créé avec succès (1200x630px)");
  } catch (error) {
    console.error("❌ Erreur:", error);
  }
}

createOgImage();
