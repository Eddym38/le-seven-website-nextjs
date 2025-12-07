# Le Seven - Site Web Next.js

Site web du restaurant Le Seven à Grenoble, migré de React vers Next.js pour améliorer le SEO et les performances.

## 🎯 Technologies utilisées

- **Next.js 16** - Framework React avec SSR/SSG
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icônes
- **Cloudinary** - Hébergement d'images optimisé

## 📁 Structure du projet

```
le_seven_website_next/
├── app/                          # App Router Next.js
│   ├── layout.tsx                # Layout global + SEO
│   ├── page.tsx                  # Page d'accueil (/)
│   ├── privatisation/
│   │   └── page.tsx              # Page privatisation
│   └── api/                      # API Routes
│       ├── send-reservation/
│       └── send-privatization/
├── components/                   # Composants réutilisables
│   ├── Navbar.tsx                # Navigation
│   ├── HeroSection.tsx           # Section hero
│   ├── MenuSection.tsx           # Section menu
│   ├── AboutSection.tsx          # À propos
│   ├── GallerySection.tsx        # Galerie photos
│   ├── OpeningHoursSection.tsx   # Horaires
│   ├── ReservationsSection.tsx   # Formulaire réservation
│   ├── ContactSection.tsx        # Contact + carte
│   ├── Footer.tsx                # Pied de page
│   ├── ScrollToTop.tsx           # Bouton scroll top
│   ├── AnimatedSection.tsx       # Wrapper animations
│   ├── ImageCarousel.tsx         # Carrousel d'images
│   └── ImageLightbox.tsx         # Lightbox images
├── public/
│   └── pdf/                      # Menus PDF
│       ├── menu_le_seven_vf.pdf
│       └── carte_boisson_le_seven_vf.pdf
└── old-react-site/               # Ancien site React (à supprimer après migration)
```

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000)

### Build de production

```bash
npm run build
npm start
```

## 📝 Différences React → Next.js

### ✅ Améliorations Next.js

1. **SEO optimisé** :

   - Server-Side Rendering (SSR)
   - Metadata API pour chaque page
   - Open Graph et Twitter Cards configurés
   - HTML complet dès le chargement (vs React SPA vide)

2. **Performance** :

   - `<Image>` de Next.js avec lazy loading automatique
   - Optimisation automatique des images (WebP/AVIF)
   - Code splitting automatique
   - Préchargement des routes

3. **Routing simplifié** :
   - Pas besoin de `react-router-dom`
   - Routing basé sur les dossiers
   - Navigation avec `<Link>` de Next.js

### 🔄 Changements clés

#### Composants Client vs Server

```tsx
// Composants avec interactivité → 'use client'
"use client";
import { useState } from "react";

export function InteractiveComponent() {
  const [state, setState] = useState();
  // ...
}
```

```tsx
// Composants statiques → Server Component (par défaut)
export function StaticComponent() {
  return <div>Contenu statique</div>;
}
```

#### Navigation

```tsx
// React Router ❌
import { Link } from "react-router-dom";
<Link to="/privatisation">Privatisation</Link>;

// Next.js ✅
import Link from "next/link";
<Link href="/privatisation">Privatisation</Link>;
```

#### Images

```tsx
// React ❌
<img src="..." alt="..." />;

// Next.js ✅
import Image from "next/image";
<Image src="..." alt="..." fill />;
```

## 🔧 Configuration

### Tailwind CSS

Les couleurs et thème de l'ancien site sont préservés dans `tailwind.config.ts` :

- **Primaire** : `#92C6C4` (aqua-green)
- **Secondaire** : `#F7C8C8` (soft-pink)
- **Background** : `#FAF6EF` (soft-beige)
- **Polices** : Pacifico (titres) + Montserrat (texte)

### Next.js Image Optimization

Toutes les images sont optimisées automatiquement par Next.js :

- Conversion automatique en **WebP** et **AVIF**
- **Lazy loading** natif pour de meilleures performances
- **Responsive sizing** avec srcset automatique
- **Compression intelligente** basée sur le device
- **Mise en cache** optimisée

Configuration dans `next.config.ts` :

```ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

Placez vos images dans `public/images/` - voir `IMAGES_REQUISES.md` pour la liste complète.

### API Routes

Deux endpoints pour les formulaires :

- `POST /api/send-reservation` - Réservations de table
- `POST /api/send-privatization` - Demandes de privatisation

**TODO** : Intégrer avec un service d'email (Resend recommandé)

## 🌐 Déploiement

### Vercel (recommandé)

1. Connectez votre repo GitHub
2. Vercel détecte automatiquement Next.js
3. Deploy en un clic

```bash
npm install -g vercel
vercel
```

### Variables d'environnement

À ajouter dans Vercel ou `.env.local` :

```env
# Pour l'envoi d'emails (optionnel)
RESEND_API_KEY=votre_clé_api
RESEND_FROM_EMAIL=noreply@leseven-grenoble.fr
RESEND_TO_EMAIL=restaurantleseven38@gmail.com

# Google Search Console (optionnel)
NEXT_PUBLIC_GOOGLE_VERIFICATION=votre_code
```

## 📊 SEO

### Métadonnées configurées

- **Title** : "Le Seven - Restaurant Grenoble | Cuisine Maison & Ambiance Bohème"
- **Description** : Optimisée avec mots-clés locaux
- **Keywords** : restaurant grenoble, cuisine libanaise, privatisation...
- **Open Graph** : Images et descriptions pour réseaux sociaux
- **Robots** : Indexation activée

### À faire

1. **Google Search Console** :

   - Ajouter le code de vérification dans `app/layout.tsx`
   - Soumettre le sitemap

2. **Google My Business** :

   - Vérifier que les informations correspondent

3. **Analytics** :
   - Ajouter Google Analytics 4

## 🎨 Personnalisation

### Modifier les couleurs

Éditez `tailwind.config.ts` :

```ts
colors: {
  primary: {
    DEFAULT: "#92C6C4", // Votre couleur
  }
}
```

### Ajouter une page

1. Créez `app/nouvelle-page/page.tsx`
2. Ajoutez le lien dans `components/Navbar.tsx`

```tsx
// app/nouvelle-page/page.tsx
export default function NouvellePage() {
  return <div>Contenu</div>;
}
```

## 📧 Configuration Email (TODO)

Pour activer l'envoi d'emails des formulaires :

1. Créez un compte sur [Resend](https://resend.com)
2. Ajoutez votre clé API dans `.env.local`
3. Modifiez les fichiers API :

```ts
// app/api/send-reservation/route.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();

  await resend.emails.send({
    from: "Le Seven <noreply@leseven-grenoble.fr>",
    to: "restaurantleseven38@gmail.com",
    subject: "Nouvelle réservation",
    html: `<p>Nom: ${body.name}</p>...`,
  });

  return Response.json({ success: true });
}
```

## 🐛 Problèmes courants

### Les PDF ne se chargent pas

Vérifiez que les fichiers sont dans `public/pdf/` :

- `menu_le_seven_vf.pdf`
- `carte_boisson_le_seven_vf.pdf`

### Les images ne s'affichent pas

Vérifiez que toutes les images sont présentes dans `public/images/` :

```bash
ls public/images/
ls public/images/gallery/
```

Consultez `IMAGES_REQUISES.md` pour la liste complète des 9 images nécessaires.

Les images seront automatiquement optimisées par Next.js au format WebP/AVIF.

### Erreur de compilation TypeScript

```bash
npm run build
```

Corrigez les erreurs affichées.

## 📚 Ressources Next.js

- [Documentation Next.js](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 🎯 Prochaines étapes

1. ✅ Migration complète vers Next.js
2. ⏳ Configurer Resend pour les emails
3. ⏳ Ajouter Google Analytics
4. ⏳ Soumettre à Google Search Console
5. ⏳ Déployer sur Vercel
6. ⏳ Configurer le domaine personnalisé
7. ⏳ Supprimer le dossier `old-react-site`

## 📞 Support

Pour toute question, contactez :

- Email : restaurantleseven38@gmail.com
- Tél : +33 9 53 46 81 28

---

**Développé avec ❤️ pour Le Seven Restaurant Grenoble**
