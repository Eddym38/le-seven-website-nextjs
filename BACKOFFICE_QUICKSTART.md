# 🚀 Quick Start - Backoffice Le Seven

Guide ultra-rapide pour mettre en place le backoffice en 10 minutes.

## Étape 1 : Créer un projet Supabase

1. Aller sur https://supabase.com
2. Créer un compte / Se connecter
3. **New project** > Choisir un nom et un mot de passe
4. Attendre ~2 minutes que le projet soit prêt

## Étape 2 : Créer les tables

1. Dans le dashboard Supabase > **SQL Editor**
2. **New query**
3. Copier-coller tout le contenu de `supabase-setup.sql`
4. **Run** (bouton en bas à droite)
5. ✅ Vérifier que c'est OK (message de succès)

**Important** : Si vous avez déjà exécuté l'ancien script SQL, vous devez également exécuter la migration :

1. **New query**
2. Copier-coller le contenu de `supabase-migration-public-reservations.sql`
3. **Run** pour permettre au formulaire public de créer des réservations

## Étape 3 : Créer un utilisateur admin

1. **Authentication** > **Users** > **Add user**
2. Choisir **"Create new user"**
3. Entrer votre **email**
4. Entrer un **mot de passe** (minimum 6 caractères)
5. Cliquer sur **Create user**
6. ✅ Votre compte admin est créé !

## Étape 4 : Récupérer les clés

1. **Settings** > **API**
2. Copier :
   - **Project URL**
   - **anon public** key

## Étape 5 : Configurer l'application

```bash
# Créer le fichier .env.local
cp .env.local.example .env.local

# Éditer .env.local avec vos vraies valeurs
# NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
# NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Étape 6 : Lancer l'application

```bash
npm run dev
```

## Étape 7 : Se connecter

1. Aller sur http://localhost:3000/admin/login
2. Entrer votre email et mot de passe
3. Cliquer sur "Se connecter"
4. ✅ Vous êtes connecté !

---

## Vérifications

- ✅ Tables créées ? → Supabase > **Table Editor**
- ✅ RLS activé ? → Icône de bouclier vert sur chaque table
- ✅ Utilisateur créé ? → Supabase > **Authentication** > **Users**
- ✅ Variables d'environnement OK ? → Vérifier `.env.local`

---

## Accès rapide

- Dashboard : http://localhost:3000/admin
- Calendrier : http://localhost:3000/admin/calendar
- Login : http://localhost:3000/admin/login

---

**Problème ?** → Lire [BACKOFFICE_README.md](BACKOFFICE_README.md) pour plus de détails
