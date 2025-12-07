# 📧 Configuration Resend - Instructions complètes

## ⚠️ PROBLÈME ACTUEL

Vous ne recevez pas d'emails car **le domaine d'envoi n'est pas configuré** sur Resend.

---

## 🔍 Diagnostic

### Pourquoi ça ne fonctionne pas ?

1. **La clé API existe** mais le domaine `leseven-grenoble.fr` n'est probablement **pas vérifié**
2. Resend **bloque** les emails depuis des domaines non vérifiés
3. Aucun log sur Resend = la requête est rejetée avant l'envoi

---

## ✅ SOLUTION - 2 Options

### Option A : Mode Test (rapide - 5 minutes)

**Pour tester immédiatement sans configuration DNS :**

1. Connectez-vous sur https://resend.com
2. Allez dans **Domains** → **Sandbox domain**
3. Utilisez l'email sandbox : `onboarding@resend.dev`
4. Modifiez `.env.local` :

```env
RESEND_FROM_EMAIL=onboarding@resend.dev
```

5. Redémarrez le serveur : `npm run dev`
6. Testez le formulaire

**⚠️ Limitation** : Les emails seront envoyés uniquement à l'adresse email associée à votre compte Resend (pas à `restaurantleseven38@gmail.com`)

---

### Option B : Configuration Production (complète - 30 minutes)

**Pour envoyer des vrais emails depuis votre domaine :**

#### 1. Ajouter votre domaine sur Resend

1. Connectez-vous sur https://resend.com
2. Allez dans **Domains** → **Add Domain**
3. Entrez : `leseven-grenoble.fr`
4. Resend vous donnera 3 enregistrements DNS à ajouter

#### 2. Configurer les DNS

Allez chez votre hébergeur de domaine (OVH, Gandi, etc.) et ajoutez ces enregistrements :

**Exemple de ce que Resend vous donnera :**

| Type  | Nom/Host          | Valeur                                    | Priorité |
|-------|-------------------|-------------------------------------------|----------|
| TXT   | @                 | `resend-verification=xxxxxxxxxxxxx`       | -        |
| TXT   | @                 | `v=spf1 include:_spf.resend.com ~all`     | -        |
| CNAME | `resend._domainkey` | `resend._domainkey.resend.com`          | -        |

#### 3. Vérifier le domaine

1. Après avoir ajouté les DNS, cliquez sur **Verify DNS Records** dans Resend
2. Attendez quelques minutes (propagation DNS)
3. Une fois vérifié ✅, vous pouvez envoyer des emails

#### 4. Configurer l'email d'envoi

Dans `.env.local` :

```env
RESEND_FROM_EMAIL=noreply@leseven-grenoble.fr
# OU
RESEND_FROM_EMAIL=contact@leseven-grenoble.fr
# OU
RESEND_FROM_EMAIL=reservations@leseven-grenoble.fr
```

---

## 🧪 Test après configuration

### 1. Vérifier la clé API

Dans le terminal :

```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer re_R4RdXx7A_2Jtw48s9ed1GyQX3rge14D42" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "onboarding@resend.dev",
    "to": "restaurantleseven38@gmail.com",
    "subject": "Test Resend",
    "html": "<p>Test email</p>"
  }'
```

**Réponse attendue si OK :**
```json
{
  "id": "re_xxxxx",
  "from": "onboarding@resend.dev",
  "to": "restaurantleseven38@gmail.com",
  "created_at": "2025-12-07T..."
}
```

**Erreur si domaine non vérifié :**
```json
{
  "message": "Domain not found or verified"
}
```

### 2. Tester depuis le site

1. Redémarrez le serveur : `npm run dev`
2. Allez sur http://localhost:3000
3. Remplissez le formulaire de réservation
4. Soumettez
5. Regardez la console du serveur (terminal) :
   - Si vous voyez `Email envoyé: { id: 're_...' }` → ✅ Succès
   - Si vous voyez une erreur → Vérifiez les logs

### 3. Vérifier sur Resend

1. Allez dans **Logs** sur https://resend.com
2. Vous devriez voir l'email envoyé
3. Statut : `delivered`, `bounced`, ou `failed`

---

## 📋 Checklist de dépannage

- [ ] Clé API valide et non révoquée
- [ ] Domaine vérifié sur Resend (ou utilisation du sandbox)
- [ ] Email `from` correspond au domaine vérifié
- [ ] Fichier `.env.local` existe à la racine du projet
- [ ] Serveur redémarré après modification du `.env.local`
- [ ] Logs dans le terminal du serveur après soumission du formulaire
- [ ] Vérification dans Resend → Logs

---

## 🔑 Renouveler la clé API (si nécessaire)

Si la clé ne fonctionne pas :

1. Allez sur https://resend.com/api-keys
2. Créez une nouvelle clé
3. Remplacez dans `.env.local`
4. Redémarrez le serveur

---

## 📞 Support

Si problème persistant :

1. **Documentation Resend** : https://resend.com/docs
2. **Discord Resend** : https://resend.com/discord
3. **Vérifier les quotas** : Plan gratuit = 100 emails/jour

---

## ✅ Une fois configuré

Les emails seront envoyés automatiquement pour :

- ✉️ Réservations de table → `POST /api/send-reservation`
- ✉️ Demandes de privatisation → `POST /api/send-privatization`

Les emails arrivent à : `restaurantleseven38@gmail.com`
