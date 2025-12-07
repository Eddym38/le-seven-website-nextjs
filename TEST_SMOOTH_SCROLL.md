# Test du Smooth Scroll

## ✅ Correction appliquée

Le problème de l'animation de scroll qui "téléportait" parfois au lieu de scroller doucement a été corrigé.

## 🔧 Changements effectués

1. **Empêcher le comportement par défaut** des liens `<Link>` de Next.js sur la même page
2. **Offset de 64px** ajouté pour compenser la navbar fixe
3. **Gestion du hash dans l'URL** au chargement de la page (ex: `/#menu`)
4. **Utilisation de `window.scrollTo`** avec `behavior: "smooth"` pour un scroll fiable

## 🧪 Comment tester

### Test 1: Navigation depuis le menu
1. Ouvrez http://localhost:3000
2. Cliquez sur "Menu" dans la navbar → doit scroller doucement
3. Cliquez sur "À propos" → doit scroller doucement
4. Cliquez sur "Galerie" → doit scroller doucement
5. Répétez plusieurs fois pour vérifier la cohérence

### Test 2: Navigation depuis la section hero
1. Cliquez sur "Réserver une table" → doit scroller vers Réservations
2. Cliquez sur "Voir le menu" → doit scroller vers Menu

### Test 3: URL avec hash
1. Ouvrez directement http://localhost:3000/#contact
2. La page doit charger et scroller doucement vers Contact
3. Testez avec d'autres sections: `/#menu`, `/#about`, `/#gallery`

### Test 4: Menu mobile
1. Réduisez la fenêtre pour afficher le menu mobile (< 768px)
2. Ouvrez le menu hamburger
3. Cliquez sur différentes sections
4. Le scroll doit être smooth et le menu doit se fermer

### Test 5: Navigation entre pages
1. Allez sur http://localhost:3000/privatisation
2. Cliquez sur "Menu" dans la navbar
3. Doit naviguer vers `/#menu` et scroller

## ✨ Résultat attendu

- ✅ Le scroll est toujours fluide et animé
- ✅ Pas de "téléportation" instantanée
- ✅ La navbar ne cache pas le titre de la section (offset de 64px)
- ✅ Fonctionne de manière cohérente à chaque clic
- ✅ Fonctionne sur desktop et mobile

## 🐛 Si le problème persiste

Videz le cache du navigateur :
- **Chrome/Edge**: Ctrl + Shift + R
- **Firefox**: Ctrl + F5
- **Safari**: Cmd + Option + R

Ou ouvrez en navigation privée pour tester.
