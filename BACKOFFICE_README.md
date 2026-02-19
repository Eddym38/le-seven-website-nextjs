# 🔐 Backoffice Le Seven - Guide de Configuration

Backoffice simple et sécurisé pour gérer les réservations du restaurant Le Seven.

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Configuration Supabase](#configuration-supabase)
3. [Configuration de l'application](#configuration-de-lapplication)
4. [Utilisation](#utilisation)
5. [Structure du projet](#structure-du-projet)
6. [Sécurité](#sécurité)

---

## Prérequis

- Un compte [Supabase](https://supabase.com) (gratuit)
- Node.js 18+ installé
- Les dépendances sont déjà installées avec `npm install`

---

## Configuration Supabase

### 1. Créer un projet Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Attendre que le projet soit initialisé (~2 minutes)

### 2. Créer les tables de la base de données

1. Dans le dashboard Supabase, aller dans **SQL Editor**
2. Cliquer sur **New query**
3. Copier-coller le contenu du fichier `supabase-setup.sql`
4. Cliquer sur **Run** pour exécuter le script

✅ Cela va créer :

- La table `reservations` avec tous les champs nécessaires
- La table `blocked_slots` pour bloquer des créneaux
- Les politiques RLS (Row Level Security) pour sécuriser l'accès
- Quelques données de test (optionnel)

### 3. Créer un utilisateur admin

1. Dans le dashboard Supabase, aller dans **Authentication** > **Users**
2. Cliquer sur **Add user** > **Create new user**
3. Entrer votre **email**
4. Entrer un **mot de passe** (minimum 6 caractères)
5. **Désactiver** "Auto Confirm User" si vous ne voulez pas de confirmation par email
6. Cliquer sur **Create user**

✅ Votre compte administrateur est prêt à être utilisé !

### 4. Récupérer les clés API

1. Dans le dashboard Supabase, aller dans **Settings** > **API**
2. Copier :
   - **Project URL** (commence par `https://xxxxx.supabase.co`)
   - **anon public** key (sous "Project API keys")

---

## Configuration de l'application

### 1. Créer le fichier `.env.local`

À la racine du projet, créer un fichier `.env.local` :

```bash
# Copiez le fichier .env.local.example
cp .env.local.example .env.local
```

### 2. Remplir les variables d'environnement

Éditer `.env.local` avec vos vraies valeurs :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Important** : Ne jamais commit le fichier `.env.local` dans Git

### 3. Lancer l'application

```bash
npm run dev
```

L'application est maintenant accessible sur `http://localhost:3000`

---

## Utilisation

### Page de connexion

URL : `/admin/login`

1. Entrer votre email
2. Entrer votre mot de passe
3. Cliquer sur "Se connecter"
4. ✅ Vous êtes redirigé vers le dashboard

### Dashboard (`/admin`)

Affiche toutes les réservations du jour :

- **Statistiques** : nombre de réservations par statut
- **Sections** : En attente / Confirmées / Annulées
- **Actions disponibles** :
  - ✅ **Confirmer** : passe le statut à "confirmée"
  - 🚫 **Annuler** : passe le statut à "annulée"
  - 🗑️ **Supprimer** : supprime définitivement la réservation

### Calendrier (`/admin/calendar`)

Vue par date des réservations :

- **Sélecteur de date** : naviguer jour par jour
- **Bouton "Aujourd'hui"** : retour à la date du jour
- **Bloquer un créneau** : empêcher les réservations sur une plage horaire
- **Liste des créneaux bloqués** : voir et débloquer les créneaux

### Déconnexion

Cliquer sur "Se déconnecter" dans le header.

---

## Structure du projet

```
app/
├── admin/
│   ├── (authenticated)/          # Routes protégées (avec middleware)
│   │   ├── layout.tsx            # Layout commun (header + navigation)
│   │   ├── page.tsx              # Dashboard principal
│   │   └── calendar/
│   │       └── page.tsx          # Vue calendrier
│   ├── login/
│   │   ├── page.tsx              # Page de connexion
│   │   └── actions.ts            # Server Actions (auth)
│   ├── actions.ts                # Server Actions (réservations)
│   └── components/               # Composants réutilisables
│       ├── AdminHeader.tsx       # Header avec navigation
│       ├── ReservationCard.tsx   # Carte réservation
│       ├── BlockSlotForm.tsx     # Formulaire blocage
│       ├── BlockedSlotsList.tsx  # Liste créneaux bloqués
│       └── DateSelector.tsx      # Sélecteur de date
│
lib/
└── supabase/
    ├── types.ts                  # Types TypeScript
    ├── client.ts                 # Client navigateur
    ├── server.ts                 # Client serveur
    ├── auth.ts                   # Utilitaires auth
    ├── queries.ts                # Requêtes DB
    └── index.ts                  # Point d'entrée
│
middleware.ts                     # Protection routes /admin
supabase-setup.sql               # Script SQL pour créer les tables
```

### Conventions

- **Server Components** par défaut (Next.js 14 App Router)
- **Server Actions** pour toutes les mutations (pas d'API routes)
- **Client Components** uniquement quand nécessaire (`'use client'`)
- **Logique métier** séparée dans `lib/supabase/queries.ts`
- **Types stricts** TypeScript partout

---

## Sécurité

### Ce qui est sécurisé ✅

1. **Middleware** : protège toutes les routes `/admin/*`
2. **RLS Supabase** : seuls les utilisateurs authentifiés peuvent accéder aux données
3. **Server Actions** : validation côté serveur
4. **Magic Link** : pas de mot de passe à gérer
5. **Cookies sécurisés** : gérés automatiquement par Supabase
6. **Pas d'API publique** : données accessibles uniquement via l'authentification

### Bonnes pratiques

- ❌ Jamais exposer la `service_role` key
- ✅ Toujours valider les inputs côté serveur
- ✅ Utiliser `revalidatePath` après chaque mutation
- ✅ Ne jamais faire confiance aux données du client
- ✅ Toujours vérifier l'authentification dans les Server Actions

---

## Déploiement

### Variables d'environnement Vercel/Netlify

Ajouter dans les paramètres du projet :

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
NEXT_PUBLIC_SITE_URL=https://votre-site.com
```

---

## FAQ

### Comment ajouter un nouvel admin ?

1. Supabase Dashboard > **Authentication** > **Users**
2. **Add user** > **Create new user**
3. Entrer l'email et le mot de passe
4. Cliquer sur **Create user**

### J'ai oublié mon mot de passe

Contactez un autre administrateur ou réinitialisez le mot de passe via le dashboard Supabase :

1. **Authentication** > **Users**
2. Trouver l'utilisateur et cliquer sur les 3 points
3. **Send reset password email** ou modifier directement le mot de passe

### Comment personnaliser l'interface ?

Tous les composants utilisent Tailwind CSS. Modifier les classes dans les fichiers `.tsx` correspondants.

---

## Support

En cas de problème :

1. Vérifier les logs dans la console du navigateur
2. Vérifier les logs Supabase (Dashboard > Logs)
3. Vérifier que RLS est bien activé (icône de bouclier vert)
4. Vérifier les variables d'environnement

---

**Fait avec ❤️ pour Le Seven**
