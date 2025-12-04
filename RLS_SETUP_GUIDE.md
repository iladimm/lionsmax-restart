# Guide de Configuration RLS (Row Level Security)

## 📋 Qu'est-ce que RLS ?

Row Level Security (RLS) est une fonctionnalité de Supabase/PostgreSQL qui permet de contrôler l'accès aux données au niveau des lignes. C'est essentiel pour sécuriser vos données.

## 🎯 Objectifs de notre Configuration

Pour le système d'affiliation LionsMax, nous voulons :

1. ✅ **Permettre le tracking public** - Les visiteurs anonymes peuvent enregistrer des clics
2. 🔒 **Protéger les statistiques** - Seuls les admins authentifiés peuvent voir les données
3. 🔐 **Sécuriser les conversions** - Seuls les admins peuvent gérer les commissions

---

## 🚀 Installation Rapide

### Étape 1 : Accéder à Supabase SQL Editor

1. Ouvrez votre [Supabase Dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet LionsMax
3. Dans le menu de gauche, cliquez sur **"SQL Editor"**
4. Cliquez sur **"New query"**

### Étape 2 : Exécuter le Script RLS

1. Ouvrez le fichier [`supabase-rls-policies.sql`](file:///c:/Users/fikri/OneDrive%20-%20ilem%20SA/Documents/Documents%20Divers/lionsmax-restart/supabase-rls-policies.sql)
2. Copiez tout le contenu
3. Collez dans l'éditeur SQL Supabase
4. Cliquez sur **"Run"** (ou Ctrl+Enter)

### Étape 3 : Vérifier que RLS est Actif

Exécutez cette requête pour vérifier :

```sql
SELECT 
  tablename, 
  policyname, 
  roles, 
  cmd 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'affiliate_clicks', 'affiliate_conversions')
ORDER BY tablename, policyname;
```

**Résultat attendu :** Liste de toutes les policies créées (environ 8-9 policies)

---

## 📊 Résumé des Permissions

### Table `affiliate_clicks`

| Action | Qui peut le faire ? | Purpose |
|--------|---------------------|---------|
| **INSERT** | 🌍 Public (anon + auth) | Permettre le tracking des clics depuis le site |
| **SELECT** | 🔐 Authentifiés uniquement | Protéger les statistiques |
| **UPDATE** | ❌ Personne | Données immuables |
| **DELETE** | ❌ Personne | Conservation des données |

### Table `affiliate_conversions`

| Action | Qui peut le faire ? | Purpose |
|--------|---------------------|---------|
| **INSERT** | 🔐 Authentifiés uniquement | Admins ajoutent les conversions |
| **SELECT** | 🔐 Authentifiés uniquement | Protéger les commissions |
| **UPDATE** | 🔐 Authentifiés uniquement | Admins mettent à jour le statut |
| **DELETE** | ❌ Personne | Conservation des données |

### Table `users`

| Action | Qui peut le faire ? | Purpose |
|--------|---------------------|---------|
| **INSERT** | 🌍 Public | Enregistrement de nouveaux utilisateurs |
| **SELECT** | 🔐 Auth (tous) + Anon (leur profil) | Lire les profils |
| **UPDATE** | 🔐 Auth (leur propre profil) | Mettre à jour leur profil |
| **DELETE** | ❌ Personne | Conservation des données |

---

## 🔍 Tester les Permissions

### Test 1 : Insertion Publique de Clic

Dans le SQL Editor, exécutez (en tant qu'utilisateur anonyme) :

```sql
INSERT INTO affiliate_clicks (product_name, external_link, affiliate_id)
VALUES ('Test Product', 'https://example.com', 'test-affiliate');
```

**Résultat attendu :** ✅ Success (insertion autorisée)

### Test 2 : Lecture par Utilisateur Anonyme

```sql
SELECT * FROM affiliate_clicks LIMIT 1;
```

**Résultat attendu :** ❌ Erreur "new row violates row-level security policy" (lecture non autorisée pour anon)

### Test 3 : Lecture par Utilisateur Authentifié

1. Authentifiez-vous dans Supabase (créez un utilisateur test si besoin)
2. Exécutez :

```sql
SELECT * FROM affiliate_clicks LIMIT 10;
```

**Résultat attendu :** ✅ Données affichées (lecture autorisée pour auth)

---

## 🐛 Résolution de Problèmes

### Problème : "new row violates row-level security policy"

**Cause :** RLS bloque l'opération

**Solutions :**
1. Vérifiez que vous êtes authentifié pour les opérations protégées
2. Vérifiez que les policies ont été créées : Exécutez la requête de vérification (étape 3)
3. Pour les clics : vérifiez que la policy "Allow public insert" existe

### Problème : Les clics ne s'enregistrent pas depuis le site

**Cause possible :** La policy d'insertion n'autorise pas les utilisateurs anonymes

**Solution :**
Vérifiez que cette policy existe :

```sql
SELECT * FROM pg_policies 
WHERE tablename = 'affiliate_clicks' 
AND policyname = 'Allow public insert on affiliate_clicks';
```

Si elle n'existe pas, réexécutez le script RLS.

### Problème : "permission denied for table"

**Cause :** RLS n'est peut-être pas activé

**Solution :**
Activez RLS manuellement :

```sql
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

---

## 🔒 Bonnes Pratiques de Sécurité

1. **Ne jamais désactiver RLS** en production
2. **Tester les policies** avant de déployer
3. **Limiter les insertions publiques** aux données non sensibles uniquement
4. **Créer des comptes admin** séparés pour gérer les conversions
5. **Auditer régulièrement** les accès avec `pg_policies`

---

## 📚 Ressources Supplémentaires

- [Documentation Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL RLS](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)

---

## ✅ Checklist de Vérification

Avant de considérer RLS comme configuré, vérifiez :

- [ ] RLS activé sur les 3 tables (users, affiliate_clicks, affiliate_conversions)
- [ ] Policy d'insertion publique existe sur `affiliate_clicks`
- [ ] Policies de lecture "authenticated only" existent sur toutes les tables
- [ ] Test d'insertion publique réussi
- [ ] Test de lecture anonyme échoue (comme attendu)
- [ ] Test de lecture authentifiée réussi
- [ ] Le site peut toujours enregistrer des clics (test avec `npm run dev`)

Une fois tous les tests validés, votre configuration RLS est complète ! 🎉
