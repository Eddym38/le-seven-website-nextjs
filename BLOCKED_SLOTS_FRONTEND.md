# Créneaux Bloqués dans le Formulaire de Réservation

## 📋 Fonctionnalité

Les créneaux horaires bloqués dans le backoffice apparaissent maintenant automatiquement comme **"Complet"** et sont **non cliquables** dans le formulaire public de réservation.

## 🎯 Comportement

1. **Avant** : Tous les créneaux horaires étaient disponibles dans le formulaire, même s'ils étaient bloqués dans le backoffice
2. **Après** : Les créneaux bloqués apparaissent avec la mention "Complet" et ne peuvent pas être sélectionnés

## 🔧 Modifications Techniques

### 1. Nouvel Endpoint API

**Fichier** : `app/api/blocked-slots/route.ts`

- **GET** `/api/blocked-slots?date=YYYY-MM-DD`
- Récupère les créneaux bloqués pour une date donnée
- Retourne un tableau des heures bloquées (format "HH:MM")

```typescript
// Exemple de réponse
{
  "success": true,
  "blockedTimes": ["12:00", "12:30", "19:00"]
}
```

### 2. Composant de Réservation Modifié

**Fichier** : `components/ReservationsSection.tsx`

#### États ajoutés :

- `blockedTimes`: Tableau des créneaux bloqués
- `isLoadingSlots`: Indicateur de chargement

#### Logique :

- Lorsque l'utilisateur sélectionne une date, le composant charge automatiquement les créneaux bloqués
- Les options bloquées sont désactivées (`disabled`) et affichent "Complet"

```tsx
<option value="12:00" disabled={blockedTimes.includes("12:00")}>
  12h00{blockedTimes.includes("12:00") && " - Complet"}
</option>
```

### 3. Migration Supabase

**Fichier** : `supabase-migration-public-blocked-slots.sql`

#### Nouvelles politiques RLS :

- **Lecture** : Public (anon + authenticated)
- **Création/Modification/Suppression** : Admins uniquement

```sql
CREATE POLICY "Public peut lire les blocked_slots"
    ON public.blocked_slots
    FOR SELECT
    TO anon, authenticated
    USING (true);
```

## 🚀 Installation

### 1. Exécuter la migration SQL

Dans **Supabase Dashboard** > **SQL Editor** :

```bash
# Exécuter le contenu de :
supabase-migration-public-blocked-slots.sql
```

### 2. Vérification

1. Créer un créneau bloqué dans le backoffice (par exemple 12:00-13:00 pour demain)
2. Ouvrir le formulaire de réservation public
3. Sélectionner la date de demain
4. Vérifier que les créneaux 12:00 et 12:30 apparaissent comme "Complet" et sont grisés

## 📝 Créneaux Horaires Disponibles

Le système vérifie automatiquement ces créneaux :

**Service du midi :**

- 12h00
- 12h30
- 13h00
- 13h30

**Service du soir :**

- 19h00
- 19h30
- 20h00
- 20h30
- 21h00
- 21h30

## 🔍 Logique de Blocage

Un créneau de réservation est bloqué si :

```
créneau >= heure_début ET créneau < heure_fin
```

**Exemple** : Si vous bloquez de 12:00 à 14:00

- ✅ Bloqué : 12:00, 12:30, 13:00, 13:30
- ❌ Disponible : 19:00, 19:30, 20:00, etc.

## 🛠️ API Endpoint

### GET `/api/blocked-slots`

**Query Parameters :**

- `date` (required) : Date au format YYYY-MM-DD

**Réponse :**

```json
{
  "success": true,
  "blockedTimes": ["12:00", "12:30", "19:00"]
}
```

**Erreurs :**

```json
{
  "success": false,
  "error": "Date requise"
}
```

## ⚡ Performance

- Le chargement des créneaux est automatique lors de la sélection de date
- Un indicateur de chargement (`isLoadingSlots`) désactive temporairement le select
- Les créneaux sont mis en cache tant que la date reste la même

## ✅ Avantages

1. **Expérience utilisateur** : L'utilisateur voit immédiatement les créneaux disponibles
2. **Prévention d'erreurs** : Impossible de réserver un créneau complet
3. **Synchronisation** : Les créneaux bloqués dans le backoffice sont instantanément répercutés
4. **Accessibilité** : Les options désactivées sont clairement marquées

## 🔐 Sécurité

- Les utilisateurs publics peuvent **uniquement lire** les créneaux bloqués
- Seuls les administrateurs authentifiés peuvent créer/modifier/supprimer des créneaux bloqués
- La validation côté serveur reste active (double vérification recommandée)

## 📌 Notes

- Les créneaux bloqués sont chargés uniquement si une date est sélectionnée
- Si aucune date n'est sélectionnée, tous les créneaux sont disponibles par défaut
- Le formulaire affiche "Chargement..." pendant la récupération des données

## 🔄 Workflow Complet

1. Admin bloque un créneau dans le backoffice
2. Policy RLS permet la lecture publique
3. Utilisateur sélectionne une date dans le formulaire
4. `useEffect` déclenche le chargement des créneaux bloqués
5. API `/api/blocked-slots` récupère les créneaux depuis Supabase
6. Les options sont automatiquement désactivées avec mention "Complet"
7. L'utilisateur ne peut sélectionner que les créneaux disponibles
