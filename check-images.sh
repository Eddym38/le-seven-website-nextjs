#!/bin/bash

# Script de vérification des images pour Le Seven

echo "🔍 Vérification des images requises..."
echo ""

MISSING=0

# Fonction pour vérifier l'existence d'un fichier
check_file() {
    if [ -f "$1" ]; then
        echo "✅ $1"
    else
        echo "❌ MANQUANT: $1"
        ((MISSING++))
    fi
}

echo "📂 Images principales (public/images/):"
check_file "public/images/hero-restaurant.jpg"
check_file "public/images/about-serveuse.jpg"
check_file "public/images/og-image.jpg"

echo ""
echo "📂 Galerie (public/images/gallery/):"
check_file "public/images/gallery/salade-italienne.jpg"
check_file "public/images/gallery/burger-vege.jpg"
check_file "public/images/gallery/camembert.jpg"
check_file "public/images/gallery/creme-brulee.jpg"
check_file "public/images/gallery/entrecote.jpg"
check_file "public/images/gallery/mousse-au-chocolat.jpg"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $MISSING -eq 0 ]; then
    echo "✨ Toutes les images sont présentes ! Vous pouvez lancer:"
    echo "   npm run dev"
else
    echo "⚠️  $MISSING image(s) manquante(s)"
    echo "📖 Consultez IMAGES_REQUISES.md pour télécharger les images depuis Cloudinary"
fi

echo ""
