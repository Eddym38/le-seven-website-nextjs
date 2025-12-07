# Instructions pour créer le repository GitHub

## Étape 1 : Créer le repository sur GitHub

1. Allez sur https://github.com/new
2. Nom du repository : `le-seven-website-nextjs`
3. Description : "Site web du restaurant Le Seven à Grenoble - Next.js avec SEO optimisé"
4. Visibilité : **Privé** (ou Public selon votre choix)
5. **NE PAS** initialiser avec README, .gitignore ou license (déjà présents)
6. Cliquez sur "Create repository"

## Étape 2 : Connecter votre repository local

Copiez et exécutez ces commandes dans votre terminal :

```bash
cd /d/Documents/Projects/le_seven_website_next

# Ajouter le remote GitHub (remplacez VOTRE_USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/VOTRE_USERNAME/le-seven-website-nextjs.git

# Vérifier que le remote est bien ajouté
git remote -v

# Pousser votre code
git branch -M main
git push -u origin main
```

## Étape 3 : Déployer sur Vercel (recommandé)

1. Allez sur https://vercel.com
2. Connectez-vous avec GitHub
3. Cliquez sur "Add New Project"
4. Sélectionnez `le-seven-website-nextjs`
5. Vercel détecte automatiquement Next.js
6. Cliquez sur "Deploy"

✅ Votre site sera live en 2 minutes !

### Configurer le domaine personnalisé sur Vercel

1. Dans votre projet Vercel, allez dans "Settings" > "Domains"
2. Ajoutez votre domaine (ex: leseven-grenoble.fr)
3. Suivez les instructions pour configurer les DNS

## Étape 4 : Configuration des variables d'environnement (optionnel)

### Sur Vercel

1. Allez dans "Settings" > "Environment Variables"
2. Ajoutez :
   - `RESEND_API_KEY` (pour les emails)
   - `RESEND_FROM_EMAIL`
   - `RESEND_TO_EMAIL`

### En local

1. Copiez `.env.example` vers `.env.local` :

```bash
cp .env.example .env.local
```

2. Éditez `.env.local` avec vos vraies valeurs

## Commandes Git utiles

```bash
# Voir l'état des fichiers
git status

# Ajouter tous les changements
git add .

# Commit avec message
git commit -m "Votre message"

# Pousser vers GitHub
git push

# Voir l'historique
git log --oneline

# Créer une branche
git checkout -b nom-de-la-branche

# Fusionner une branche
git checkout main
git merge nom-de-la-branche
```

## Workflow de développement recommandé

1. **Développement** :

   ```bash
   git checkout -b feature/nouvelle-fonctionnalite
   # Faire vos modifications
   git add .
   git commit -m "Ajouter nouvelle fonctionnalité"
   git push origin feature/nouvelle-fonctionnalite
   ```

2. **Production** :

   ```bash
   git checkout main
   git merge feature/nouvelle-fonctionnalite
   git push origin main
   ```

3. Vercel déploie automatiquement à chaque push sur `main`

## Notes importantes

- Le dossier `old-react-site/` est ignoré dans le `.gitignore`
- Les fichiers `.env.local` ne sont PAS versionnés (sécurité)
- Vercel build automatiquement à chaque push

## En cas de problème

### Erreur "remote already exists"

```bash
git remote remove origin
git remote add origin https://github.com/VOTRE_USERNAME/le-seven-website-nextjs.git
```

### Erreur lors du push

```bash
git pull origin main --rebase
git push origin main
```

### Changer l'URL du remote

```bash
git remote set-url origin https://github.com/NOUVEAU_USERNAME/nouveau-repo.git
```
