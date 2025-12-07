# Images requises pour Le Seven

## 📋 Liste des images à télécharger depuis Cloudinary

Vous devez placer ces images dans les dossiers indiqués :

### 🖼️ Images principales (`public/images/`)

1. **hero-restaurant.jpg**
   - Source Cloudinary : `hero-restaurant_l5gjgr`
   - Taille recommandée : 1920x1080px
   - Utilisation : Image hero de la page d'accueil

2. **about-serveuse.jpg**
   - Source Cloudinary : `galery-souris_serveuse`
   - Taille recommandée : 1200x800px
   - Utilisation : Section "Notre histoire"

3. **og-image.jpg**
   - Source Cloudinary : `hero-restaurant_l5gjgr` (même image que hero)
   - Taille recommandée : 1200x630px
   - Utilisation : Partages sur réseaux sociaux (Open Graph)

### 🍽️ Images de la galerie (`public/images/gallery/`)

4. **salade-italienne.jpg**
   - Source Cloudinary : `galery-salade_italienne`
   - Taille recommandée : 800x600px

5. **burger-vege.jpg**
   - Source Cloudinary : `galery-burger_vege`
   - Taille recommandée : 800x600px

6. **camembert.jpg**
   - Source Cloudinary : `galery-camembert`
   - Taille recommandée : 800x600px

7. **creme-brulee.jpg**
   - Source Cloudinary : `galery-creme_brulee`
   - Taille recommandée : 800x600px

8. **entrecote.jpg**
   - Source Cloudinary : `galery-entrecote`
   - Taille recommandée : 800x600px

9. **mousse-au-chocolat.jpg**
   - Source Cloudinary : `galery-mousse_au_chocolat`
   - Taille recommandée : 800x600px

## 📥 Comment télécharger depuis Cloudinary

1. Connectez-vous à votre compte Cloudinary : https://cloudinary.com/console
2. Allez dans "Media Library"
3. Recherchez chaque image par son nom (ex: `hero-restaurant_l5gjgr`)
4. Cliquez sur l'image → "Download" → Choisissez la qualité maximale
5. Renommez le fichier selon le nom indiqué ci-dessus
6. Placez-le dans le bon dossier

## 🎯 Structure finale attendue

```
public/
├── images/
│   ├── hero-restaurant.jpg
│   ├── about-serveuse.jpg
│   ├── og-image.jpg
│   └── gallery/
│       ├── salade-italienne.jpg
│       ├── burger-vege.jpg
│       ├── camembert.jpg
│       ├── creme-brulee.jpg
│       ├── entrecote.jpg
│       └── mousse-au-chocolat.jpg
└── pdf/
    ├── menu_le_seven_vf.pdf
    └── carte_boisson_le_seven_vf.pdf
```

## ✅ Vérification

Après avoir placé toutes les images :

```bash
npm run dev
```

Visitez http://localhost:3000 et vérifiez que :
- ✅ L'image hero s'affiche correctement
- ✅ La section "Notre histoire" a son image
- ✅ Les 6 images de la galerie s'affichent
- ✅ Le partage sur réseaux sociaux fonctionne (testez avec https://www.opengraph.xyz/)

## 📊 Optimisation automatique de Next.js

Une fois les images en place, Next.js s'occupera automatiquement de :
- ✨ Conversion en WebP et AVIF
- 📏 Redimensionnement responsive
- ⚡ Lazy loading
- 🎨 Optimisation de la qualité
- 💾 Mise en cache intelligente

**Plus besoin de Cloudinary !** 🎉
