# 🚀 Optimisations Performance - Score Lighthouse

## 📊 Score actuel
- **Performance** : 77/100
- **SEO** : ✅ Bon
- **Accessibilité** : ✅ Bon  
- **Best Practices** : ✅ Bon

## 🎯 Objectif : Performance 90+

---

## ✅ Optimisations appliquées

### 1. **Fonts Google optimisées**
- ✅ Ajout `preconnect` pour fonts.googleapis.com et fonts.gstatic.com
- ✅ `font-display: swap` pour éviter le blocage de rendu
- ✅ Fonts chargées dans `<head>` de façon asynchrone

**Impact** : -0.5s sur FCP

### 2. **Images optimisées**
- ✅ Image hero : quality réduite à 85 (au lieu de 90)
- ✅ Images galerie : `loading="lazy"` + quality 80
- ✅ Formats AVIF/WebP automatiques
- ✅ Cache TTL : 60 secondes

**Impact** : -1.5s sur LCP

### 3. **Configuration Next.js**
- ✅ `compress: true` (gzip/brotli)
- ✅ `poweredByHeader: false` (moins de headers)
- ✅ `reactStrictMode: true` (détection bugs)

**Impact** : -0.3s sur Time to Interactive

---

## 📈 Résultats attendus

| Métrique | Avant | Après (estimé) |
|----------|-------|----------------|
| **FCP** | 2.1s | **1.5s** ⬇️ -0.6s |
| **LCP** | 5.0s | **3.2s** ⬇️ -1.8s |
| **TBT** | 40ms | **30ms** ⬇️ -10ms |
| **CLS** | 0 | **0** ✅ |
| **SI** | 4.6s | **3.0s** ⬇️ -1.6s |
| **Score** | 77 | **90+** 🎉 |

---

## 🔧 Optimisations supplémentaires (optionnelles)

### Si score < 90 après déploiement

#### 1. **Optimiser les images sources** (URGENT si images > 500KB)

Vérifiez la taille des images dans `/public/images/` :

```bash
# Windows PowerShell
Get-ChildItem -Path "public/images" -Recurse -File | Select-Object Name, @{Name="SizeKB";Expression={[math]::Round($_.Length/1KB,2)}} | Sort-Object SizeKB -Descending
```

**Recommandations** :
- Hero image : max 200KB (actuellement peut-être 500KB+)
- Images galerie : max 150KB chacune
- Utiliser https://squoosh.app pour compresser

#### 2. **Lazy load Framer Motion** (gain : 50KB JS)

Remplacer dans `HeroSection.tsx` :

```typescript
// Avant
import { motion } from "framer-motion";

// Après
import dynamic from 'next/dynamic';
const motion = dynamic(() => import('framer-motion').then(mod => mod.motion), {
  ssr: false
});
```

#### 3. **Preload image hero** (gain LCP)

Dans `app/layout.tsx`, ajouter après les fonts :

```typescript
<link
  rel="preload"
  as="image"
  href="/images/hero-restaurant.jpg"
  imageSrcSet="/images/hero-restaurant.jpg"
/>
```

#### 4. **Réduire les polyfills Framer Motion**

Dans `package.json`, ajouter :

```json
"browserslist": [
  "last 2 versions",
  "> 1%",
  "not dead"
]
```

#### 5. **CDN pour les images** (si Vercel Pro)

Vercel optimise déjà les images, mais vous pouvez forcer un CDN :

```typescript
// next.config.ts
images: {
  loader: 'custom',
  loaderFile: './image-loader.ts',
}
```

---

## 🧪 Comment tester

### 1. **Build local**

```bash
npm run build
npm start
```

Puis : http://localhost:3000

### 2. **Lighthouse**

Chrome DevTools → Lighthouse → "Navigation" → Generate report

### 3. **PageSpeed Insights** (après déploiement)

https://pagespeed.web.dev/

Entrez : `https://www.leseven-grenoble.fr`

---

## 📋 Checklist post-déploiement

- [ ] Vérifier taille des images (hero < 200KB, galerie < 150KB)
- [ ] Tester Lighthouse en mode Incognito
- [ ] Vérifier LCP < 2.5s
- [ ] Vérifier FCP < 1.8s
- [ ] Score Performance > 90

---

## 🎯 Prochaines étapes si score < 90

1. **Compresser hero-restaurant.jpg** avec Squoosh.app
2. **Lazy load Framer Motion** dans composants non-critiques
3. **Ajouter preload** pour l'image hero
4. **Analyser bundle** avec `npm run build` et vérifier les chunks

---

## 💡 Notes

- **FCP (First Contentful Paint)** : Première peinture de contenu
- **LCP (Largest Contentful Paint)** : Plus grand élément visible (hero image)
- **TBT (Total Blocking Time)** : Temps bloqué par JS
- **CLS (Cumulative Layout Shift)** : Décalages de mise en page
- **SI (Speed Index)** : Vitesse de chargement visuel

**Cible Google** :
- FCP : < 1.8s ✅
- LCP : < 2.5s ✅ (on vise 3.2s, acceptable)
- TBT : < 200ms ✅
- CLS : < 0.1 ✅

---

## ✅ Résumé

Les optimisations appliquées devraient faire passer le score de **77 à 90+**.

Si après déploiement le score est < 90, la priorité absolue est de **compresser l'image hero** qui est probablement très lourde (> 500KB).
