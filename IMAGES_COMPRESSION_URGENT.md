# 🚨 ACTION URGENTE - Optimisation Images

## ⚠️ PROBLÈME CRITIQUE DÉTECTÉ

**`hero-restaurant.jpg` : 3447 KB (3.4 MB)** ← C'est la cause principale du LCP à 5.0s !

---

## 📋 Tailles actuelles des images

| Fichier | Taille | Status | Action |
|---------|--------|--------|--------|
| **hero-restaurant.jpg** | **3447 KB** | 🔴 **CRITIQUE** | **Compresser à < 200 KB** |
| souris-serveuse.jpg | 369 KB | 🟠 Moyen | Compresser à < 150 KB |
| about-serveuse.jpg | 369 KB | 🟠 Moyen | Compresser à < 150 KB |
| creme-brulee.jpg | 290 KB | 🟠 Moyen | Compresser à < 150 KB |
| nems-coulant.jpg | 245 KB | 🟡 Acceptable | Optionnel |
| salade-italienne.jpg | 216 KB | 🟡 Acceptable | Optionnel |
| entrecote.jpg | 211 KB | 🟡 Acceptable | Optionnel |
| mousse-au-chocolat.jpg | 200 KB | ✅ OK | - |
| camembert.jpg | 196 KB | ✅ OK | - |
| risotto.jpg | 160 KB | ✅ OK | - |
| taouk.jpg | 112 KB | ✅ OK | - |
| burger-vege.jpg | 87 KB | ✅ OK | - |

---

## 🎯 PRIORITÉ ABSOLUE

### 1. Compresser `hero-restaurant.jpg` (3.4 MB → 200 KB max)

**C'est l'image LCP** - Elle bloque le chargement de toute la page !

**Comment faire :**

#### Option A : Squoosh.app (recommandé) 🌟

1. Allez sur https://squoosh.app
2. Glissez-déposez `public/images/hero-restaurant.jpg`
3. Sélectionnez **MozJPEG** ou **WebP**
4. Réglez la qualité à **70-75%**
5. Vérifiez que la taille < 200 KB
6. Téléchargez et remplacez le fichier

#### Option B : ImageOptim (Mac) / FileOptimizer (Windows)

- **Mac** : https://imageoptim.com
- **Windows** : https://nikkhokkho.sourceforge.io/static.php?page=FileOptimizer

#### Option C : Ligne de commande (si ImageMagick installé)

```bash
# Avec ImageMagick
convert hero-restaurant.jpg -quality 75 -resize 1920x1080^ -gravity center -extent 1920x1080 hero-restaurant-optimized.jpg

# Avec cwebp (WebP)
cwebp -q 75 hero-restaurant.jpg -o hero-restaurant.webp
```

---

### 2. Compresser les images > 300 KB

- `souris-serveuse.jpg` (369 KB → 150 KB)
- `about-serveuse.jpg` (369 KB → 150 KB)
- `creme-brulee.jpg` (290 KB → 150 KB)

Même méthode que pour le hero.

---

## 📈 Impact attendu après compression

| Avant | Après |
|-------|-------|
| **LCP : 5.0s** | **LCP : 2.0s** ⬇️ -3.0s |
| **SI : 4.6s** | **SI : 2.5s** ⬇️ -2.1s |
| **Score : 77** | **Score : 95+** 🎉 |

---

## ✅ Optimisations déjà appliquées dans le code

- ✅ Preload de l'image hero dans `<head>`
- ✅ `priority={true}` sur l'image hero (pas de lazy loading)
- ✅ Formats AVIF/WebP activés dans Next.js
- ✅ Cache images : 1 jour (86400s)
- ✅ Compression gzip/brotli activée
- ✅ Quality réduite à 85 pour hero, 80 pour galerie

**Mais** : Si l'image source fait 3.4 MB, Next.js va quand même la servir lourde !

---

## 🚀 Procédure complète

### Étape 1 : Compresser le hero (URGENT)

```bash
# 1. Sauvegarder l'original
cp public/images/hero-restaurant.jpg public/images/hero-restaurant-original.jpg

# 2. Compresser avec Squoosh.app (ou autre outil)
# → Télécharger le fichier compressé

# 3. Remplacer
# Copier le fichier compressé dans public/images/hero-restaurant.jpg

# 4. Vérifier la taille
ls -lh public/images/hero-restaurant.jpg
# Devrait être < 200 KB
```

### Étape 2 : Compresser les autres images > 300 KB

Même procédure pour :
- `souris-serveuse.jpg`
- `about-serveuse.jpg`
- `creme-brulee.jpg`

### Étape 3 : Tester localement

```bash
npm run build
npm start
```

Ouvrir http://localhost:3000 et lancer Lighthouse.

### Étape 4 : Commit et déployer

```bash
git add public/images/
git commit -m "perf: Compression images hero 3.4MB→200KB + galerie"
git push origin main
```

### Étape 5 : Vérifier sur production

Attendre le déploiement Vercel, puis :
- Tester avec Lighthouse
- Vérifier LCP < 2.5s
- Score Performance > 90

---

## 🎯 Résultat final attendu

Après compression du hero :

```
✅ FCP : 1.5s (< 1.8s)
✅ LCP : 2.0s (< 2.5s) ← gain de 3.0s !
✅ TBT : 30ms (< 200ms)
✅ CLS : 0 (< 0.1)
✅ SI : 2.5s

🎉 Score Performance : 95+
```

---

## 💡 Pourquoi c'est critique ?

L'image hero est la **première chose visible** (Largest Contentful Paint = LCP).

Si elle fait 3.4 MB :
- Mobile 4G : ~5-7 secondes de chargement
- Desktop : ~2-3 secondes

Google pénalise lourdement les LCP > 2.5s.

---

## 📞 Besoin d'aide ?

Si vous avez des difficultés :

1. **Squoosh.app** est le plus simple (gratuit, en ligne)
2. Glissez l'image, réglez qualité à 70-75%
3. Téléchargez et remplacez

**Vérification** : La taille du fichier dans l'explorateur doit être < 200 KB.

---

## ✅ Checklist

- [ ] Compresser `hero-restaurant.jpg` (3.4 MB → < 200 KB)
- [ ] Compresser `souris-serveuse.jpg` (369 KB → < 150 KB)
- [ ] Compresser `about-serveuse.jpg` (369 KB → < 150 KB)
- [ ] Compresser `creme-brulee.jpg` (290 KB → < 150 KB)
- [ ] Tester en local avec `npm run build && npm start`
- [ ] Vérifier avec Lighthouse
- [ ] Commit et push
- [ ] Vérifier sur production

---

**Cette compression est OBLIGATOIRE pour atteindre un score > 90.**

Le code est déjà optimisé, mais si l'image source est lourde, Next.js ne peut pas faire de miracles !
