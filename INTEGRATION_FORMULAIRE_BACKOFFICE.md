# 🔗 Connexion Formulaire → Backoffice

## Comment ça fonctionne

Lorsqu'un client remplit le formulaire de réservation sur le site web :

### 1️⃣ Soumission du formulaire

[components/ReservationsSection.tsx](components/ReservationsSection.tsx) envoie les données à l'API

### 2️⃣ Traitement de l'API

[app/api/send-reservation/route.ts](app/api/send-reservation/route.ts) effectue 2 actions :

- ✅ **Enregistre la réservation dans Supabase** (table `reservations`)
  - Statut : `en_attente`
  - Note interne : contenu du champ "message" (optionnel)
- 📧 **Envoie 2 emails via Resend**
  - Email au restaurant avec les détails
  - Email de confirmation au client

### 3️⃣ Affichage dans le backoffice

La réservation apparaît instantanément dans :

- [/admin](http://localhost:3000/admin) - Dashboard (réservations du jour)
- [/admin/calendar](http://localhost:3000/admin/calendar) - Vue calendrier

## 🔐 Sécurité RLS (Row Level Security)

Les politiques Supabase permettent :

| Action                        | Utilisateur public (anon)            | Administrateur (authenticated) |
| ----------------------------- | ------------------------------------ | ------------------------------ |
| **Créer** une réservation     | ✅ Oui (statut forcé à `en_attente`) | ✅ Oui                         |
| **Lire** les réservations     | ❌ Non                               | ✅ Oui                         |
| **Modifier** une réservation  | ❌ Non                               | ✅ Oui                         |
| **Supprimer** une réservation | ❌ Non                               | ✅ Oui                         |

→ Le formulaire public peut **uniquement créer** des réservations  
→ Seuls les admins peuvent **voir, modifier et supprimer**

## ⚙️ Configuration requise

### 1. Exécuter la migration SQL

Si vous avez déjà exécuté le setup initial, vous devez mettre à jour les politiques RLS :

```bash
# Dans Supabase > SQL Editor > New query
# Copier-coller le contenu de :
supabase-migration-public-reservations.sql
```

### 2. Variables d'environnement

Vérifier que `.env.local` contient :

```env
# Supabase (requis)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...

# Resend (optionnel - pour les emails)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@votre-domaine.fr
RESEND_TO_EMAIL=restaurant@example.com
```

⚠️ **Important** : Si `RESEND_API_KEY` n'est pas configuré, les emails ne seront pas envoyés mais la réservation sera quand même enregistrée dans Supabase.

## 🧪 Test complet

### Test 1 : Créer une réservation

1. Aller sur [http://localhost:3000/#reservations](http://localhost:3000/#reservations)
2. Remplir le formulaire
3. Soumettre
4. ✅ Vous devez voir "Réservation confirmée !"

### Test 2 : Voir dans le backoffice

1. Se connecter au backoffice : [/admin/login](http://localhost:3000/admin/login)
2. Aller sur le dashboard : [/admin](http://localhost:3000/admin)
3. ✅ La réservation doit apparaître dans "En attente"

### Test 3 : Gérer la réservation

1. Dans le backoffice, cliquer sur **"Confirmer"**
2. ✅ Le statut passe à "Confirmée"
3. La carte change de couleur (vert)

## 🐛 Résolution de problèmes

### La réservation n'apparaît pas dans le backoffice

**Vérifier :**

1. Les politiques RLS sont-elles bien configurées ?
   - Supabase > **Authentication** > **Policies**
   - Doit avoir : "Public peut créer des reservations"
2. Les logs Supabase montrent-ils une erreur ?
   - Supabase > **Logs** > Vérifier les erreurs d'insertion

3. La console du navigateur montre-t-elle une erreur ?
   - F12 > Console > Regarder les erreurs API

### Erreur "new row violates row-level security policy"

→ La migration SQL n'a pas été exécutée correctement.

**Solution :**

```sql
-- Exécuter dans Supabase SQL Editor
DROP POLICY IF EXISTS "Utilisateurs authentifiés peuvent tout faire sur reservations" ON public.reservations;

-- Puis exécuter tout le contenu de :
supabase-migration-public-reservations.sql
```

### Les emails ne sont pas envoyés

→ La clé Resend n'est pas configurée.

**C'est normal si :**

- Vous n'avez pas encore configuré Resend
- La réservation est quand même enregistrée dans Supabase

**Pour activer les emails :**

1. Créer un compte sur [resend.com](https://resend.com)
2. Obtenir une API key
3. Ajouter dans `.env.local` :
   ```env
   RESEND_API_KEY=re_xxxxx
   RESEND_FROM_EMAIL=noreply@votre-domaine.fr
   RESEND_TO_EMAIL=restaurant@example.com
   ```

## 📊 Flux de données complet

```
┌─────────────────────┐
│  Client remplit le  │
│  formulaire web     │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  API Route          │
│  /api/send-         │
│  reservation        │
└──────┬──────────────┘
       │
       ├──→ Enregistrement Supabase ──→ Table `reservations`
       │                                  (statut: en_attente)
       │
       └──→ Envoi emails Resend ──────→ Restaurant + Client
                                         (notification)

┌─────────────────────┐
│  Admin se connecte  │
│  au backoffice      │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Dashboard affiche  │
│  les réservations   │
│  depuis Supabase    │
└─────────────────────┘
           │
           ↓
┌─────────────────────┐
│  Admin peut :       │
│  • Confirmer        │
│  • Annuler          │
│  • Supprimer        │
└─────────────────────┘
```

## ✅ Checklist finale

- [ ] Tables Supabase créées (`reservations` et `blocked_slots`)
- [ ] Migration RLS exécutée (permet insertion publique)
- [ ] Variables d'environnement configurées (`.env.local`)
- [ ] Utilisateur admin créé dans Supabase
- [ ] Test formulaire → réservation apparaît dans backoffice
- [ ] Test actions backoffice (confirmer/annuler/supprimer)
- [ ] (Optionnel) Resend configuré pour les emails

---

**Tout fonctionne ?** 🎉 Les réservations du site web sont maintenant connectées au backoffice !
