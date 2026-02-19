# Système de Blocage et Vacances - Documentation Complète

## 📋 Vue d'Ensemble

Le système permet de bloquer des créneaux horaires avec deux types distincts :

- **Blocage normal** : Pour les créneaux complets (événements privés, overbooking)
- **Vacances** : Pour les périodes de fermeture (multi-jours)

## 🎯 Fonctionnalités

### Dans le Backoffice

1. **Créer un blocage simple**
   - Sélectionner "Blocage normal"
   - Choisir une date et des heures
   - Badge rouge 🚫 "Complet"

2. **Créer une période de vacances**
   - Sélectionner "Vacances"
   - Choisir date début et date fin
   - Badge violet 🏖️ "Vacances"
   - Bloque automatiquement tous les jours entre les deux dates

### Dans le Formulaire Public

- **Blocage normal** : Créneau affiché comme "12h00 - Complet"
- **Vacances** : Créneau affiché comme "12h00 - Vacances"
- Les créneaux bloqués ne sont pas cliquables

## 🚀 Installation

### 1. Ajouter le champ "type" à la table

**Exécuter dans Supabase > SQL Editor :**

```sql
-- supabase-migration-add-blocked-type.sql
ALTER TABLE public.blocked_slots
ADD COLUMN type TEXT NOT NULL DEFAULT 'normal'
CHECK (type IN ('normal', 'vacances'));
```

### 2. Permettre la lecture publique (si pas déjà fait)

**Exécuter dans Supabase > SQL Editor :**

```sql
-- supabase-migration-public-blocked-slots.sql
DROP POLICY IF EXISTS "Admins peuvent tout faire sur blocked_slots" ON public.blocked_slots;

CREATE POLICY "Public peut lire les blocked_slots"
    ON public.blocked_slots
    FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admins peuvent créer des blocked_slots"
    ON public.blocked_slots
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Admins peuvent modifier les blocked_slots"
    ON public.blocked_slots
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins peuvent supprimer les blocked_slots"
    ON public.blocked_slots
    FOR DELETE
    TO authenticated
    USING (true);
```

## 📖 Guide d'Utilisation

### Bloquer un créneau normal

**Scénario** : Un événement privé le samedi soir

1. Aller dans **Backoffice** > **Calendrier**
2. Sélectionner le samedi
3. Cliquer sur **"🚫 Bloquer un créneau"**
4. Remplir :
   - Type : **Blocage normal (complet)**
   - Date début : samedi
   - Date fin : (vide)
   - Heure début : 19:00
   - Heure fin : 22:00
   - Raison : "Événement privé"
5. Cliquer sur **Bloquer**

**Résultat** : Les créneaux 19:00, 19:30, 20:00, 20:30, 21:00, 21:30 affichent "Complet"

### Bloquer pour vacances (plusieurs jours)

**Scénario** : Vacances d'été du 1er au 15 août

1. Aller dans **Backoffice** > **Calendrier**
2. Sélectionner le 1er août
3. Cliquer sur **"🚫 Bloquer un créneau"**
4. Remplir :
   - Type : **Vacances**
   - Date début : 01/08/2026
   - Date fin : 15/08/2026
   - Heure début : 12:00
   - Heure fin : 22:00
   - Raison : "Vacances d'été"
5. Cliquer sur **Bloquer**

**Résultat** :

- Crée 15 blocages (un par jour)
- Tous les créneaux du 1er au 15 août affichent "Vacances"
- Badge violet dans le backoffice

## 🎨 Apparence

### Backoffice - Liste des créneaux bloqués

**Blocage normal** :

```
┌─────────────────────────────────────────┐
│ 19:00 - 22:00  [🚫 Complet]   [Débloquer]│
│ Événement privé                         │
└─────────────────────────────────────────┘
Couleur : Rouge clair
```

**Vacances** :

```
┌─────────────────────────────────────────┐
│ 12:00 - 22:00  [🏖️ Vacances]  [Débloquer]│
│ Vacances d'été                          │
└─────────────────────────────────────────┘
Couleur : Violet clair
```

### Formulaire Public - Options

```html
<select>
  <option>12h00</option>
  <option disabled>12h30 - Complet</option>
  <option disabled>13h00 - Vacances</option>
  <option>13h30</option>
</select>
```

## 🔧 Architecture Technique

### 1. Base de Données

**Table** : `blocked_slots`

```sql
CREATE TABLE blocked_slots (
  id UUID PRIMARY KEY,
  date DATE NOT NULL,
  heure_debut TIME NOT NULL,
  heure_fin TIME NOT NULL,
  raison TEXT,
  type TEXT NOT NULL DEFAULT 'normal' CHECK (type IN ('normal', 'vacances'))
);
```

### 2. Types TypeScript

```typescript
// lib/supabase/types.ts
export type BlockedSlotType = "normal" | "vacances";

export interface BlockedSlot {
  id: string;
  date: string;
  heure_debut: string;
  heure_fin: string;
  raison: string | null;
  type: BlockedSlotType;
}
```

### 3. Fonction de Création

```typescript
// lib/supabase/queries.ts
export async function createBlockedSlot(
  date: string,
  heure_debut: string,
  heure_fin: string,
  raison: string | null,
  type: "normal" | "vacances" = "normal",
  date_fin?: string,
): Promise<void> {
  // Si date_fin fournie, créer un blocage pour chaque jour
  if (date_fin && date_fin > date) {
    const slots = [];
    const currentDate = new Date(date);
    const endDate = new Date(date_fin);

    while (currentDate <= endDate) {
      slots.push({
        date: currentDate.toISOString().split("T")[0],
        heure_debut,
        heure_fin,
        raison,
        type,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    await supabase.from("blocked_slots").insert(slots);
  } else {
    await supabase.from("blocked_slots").insert({
      date,
      heure_debut,
      heure_fin,
      raison,
      type,
    });
  }
}
```

### 4. API Endpoint

```typescript
// app/api/blocked-slots/route.ts
// GET /api/blocked-slots?date=2026-08-10

// Réponse :
{
  "success": true,
  "blockedTimes": [
    { "time": "12:00", "type": "vacances", "raison": "Vacances d'été" },
    { "time": "12:30", "type": "vacances", "raison": "Vacances d'été" },
    { "time": "19:00", "type": "normal", "raison": "Événement privé" }
  ]
}
```

### 5. Composant React

```tsx
// components/ReservationsSection.tsx
const getBlockedInfo = (time: string) => {
  return blockedTimes.find((bt) => bt.time === time);
};

<option value="12:00" disabled={!!getBlockedInfo("12:00")}>
  12h00
  {getBlockedInfo("12:00") &&
    ` - ${getBlockedInfo("12:00")?.type === "vacances" ? "Vacances" : "Complet"}`}
</option>;
```

## 📊 Exemples de Données

### Exemple 1 : Blocage normal

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "date": "2026-03-15",
  "heure_debut": "19:00",
  "heure_fin": "22:00",
  "raison": "Événement privé",
  "type": "normal"
}
```

**Créneaux bloqués** : 19:00, 19:30, 20:00, 20:30, 21:00, 21:30  
**Affichage** : "Complet"

### Exemple 2 : Vacances (3 jours)

**Requête** :

```typescript
createBlockedSlot(
  "2026-08-01", // date_debut
  "12:00",
  "22:00",
  "Vacances d'été",
  "vacances",
  "2026-08-03", // date_fin
);
```

**Résultat** : 3 entrées créées

```json
[
  { "date": "2026-08-01", "type": "vacances", ... },
  { "date": "2026-08-02", "type": "vacances", ... },
  { "date": "2026-08-03", "type": "vacances", ... }
]
```

**Affichage** : "Vacances" sur tous les créneaux pendant 3 jours

## 🔍 Logique de Blocage

### Calcul des créneaux affectés

```typescript
const availableSlots = ["12:00", "12:30", "13:00", ...];

availableSlots.forEach((time) => {
  if (time >= slot.heure_debut && time < slot.heure_fin) {
    blockedTimes.push({
      time,
      type: slot.type,
      raison: slot.raison
    });
  }
});
```

**Exemple** :

- Blocage : 12:00 - 14:00
- Résultat : 12:00, 12:30, 13:00, 13:30 sont bloqués
- 14:00 n'est PAS bloqué (condition : `time < heure_fin`)

## ✅ Avantages

1. **Clarté** : L'utilisateur comprend pourquoi le créneau est indisponible
2. **Efficacité** : Bloquer 30 jours de vacances en un seul clic
3. **Distinction** : Couleurs différentes pour chaque type
4. **Prévention** : Impossible de réserver pendant les périodes bloquées

## 🔐 Sécurité

- ✅ Lecture publique des créneaux (nécessaire pour le formulaire)
- ✅ Création/modification/suppression : admins uniquement
- ✅ Validation du type au niveau BD
- ✅ Aucune donnée sensible exposée

## 📝 Fichiers Modifiés

1. ✅ `lib/supabase/types.ts` - Type BlockedSlot + BlockedSlotType
2. ✅ `lib/supabase/queries.ts` - createBlockedSlot avec multi-jours
3. ✅ `app/api/blocked-slots/route.ts` - Retourne type et raison
4. ✅ `app/admin/components/BlockSlotForm.tsx` - Formulaire avec date_fin
5. ✅ `app/admin/components/BlockedSlotsList.tsx` - Badges colorés
6. ✅ `app/admin/actions.ts` - Support type et date_fin
7. ✅ `components/ReservationsSection.tsx` - Affichage Vacances/Complet

## 🚦 Migrations SQL Requises

1. ✅ `supabase-migration-add-blocked-type.sql` - Ajoute champ type
2. ✅ `supabase-migration-public-blocked-slots.sql` - RLS lecture publique

## 🎯 Cas d'Usage

| Scénario           | Type     | Date fin      | Affichage          |
| ------------------ | -------- | ------------- | ------------------ |
| Soirée privée      | Normal   | ❌            | "19h00 - Complet"  |
| Vacances été       | Vacances | ✅ (15 jours) | "12h00 - Vacances" |
| Cuisine fermée     | Normal   | ❌            | "13h00 - Complet"  |
| Fermeture annuelle | Vacances | ✅ (7 jours)  | "19h00 - Vacances" |

## 🔄 Workflow Complet

```
Admin
  ↓ Crée blocage "Vacances" (01-15 août)
Base de données
  ↓ Insère 15 entrées (une par jour)
RLS Policy
  ↓ Permet lecture publique
Utilisateur
  ↓ Sélectionne 10 août
Frontend
  ↓ Charge créneaux via API
API
  ↓ Retourne [{time: "12:00", type: "vacances"}, ...]
Frontend
  ↓ Affiche "12h00 - Vacances" (désactivé)
Résultat
  ↓ Utilisateur choisit une autre date
```

## 📞 Support

En cas de problème :

1. Vérifier que les migrations SQL sont exécutées
2. Vérifier les policies RLS dans Supabase
3. Tester l'API `/api/blocked-slots?date=2026-08-01`
4. Consulter la console navigateur pour les erreurs
