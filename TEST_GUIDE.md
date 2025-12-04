# Guide de Test - Système d'Affiliation LionsMax

## 🚀 Lancement Rapide

### 1. Démarrer le Serveur de Développement

```bash
npm run dev
```

Le site devrait être accessible sur `http://localhost:5173` (ou port similaire).

## ✅ Tests à Effectuer

### Test 1 : Vérification Visuelle du Bouton

**Objectif :** S'assurer que le bouton d'affiliation s'affiche correctement

1. Ouvrir la page d'accueil
2. **Vérifier :**
   - Le bouton "Acheter" est visible sur chaque carte produit
   - Le bouton remplace l'ancien "Add to Cart"
   - Le style est cohérent avec le design global

**Résultat attendu :** ✅ Bouton visible et bien stylisé

---

### Test 2 : Click Tracking dans Supabase

**Objectif :** Vérifier que les clics sont bien enregistrés dans Supabase

1. Ouvrir Developer Tools (F12) → Onglet **Console**
2. Cliquer sur un bouton "Acheter" sur n'importe quelle carte produit
3. Vérifier qu'aucune erreur n'apparaît dans la console
4. Ouvrir Supabase Dashboard → **Table Editor** → Table `affiliate_clicks`
5. **Vérifier qu'une nouvelle ligne a été insérée avec :**
   - `product_name` : Nom du produit cliqué
   - `external_link` : URL d'affiliation
   - `utm_source` : "lionsmax"
   - `utm_medium` : "affiliate"
   - `clicked_at` : Timestamp correct

**Résultat attendu :** ✅ Nouvelle ligne dans `affiliate_clicks`

---

### Test 3 : Ouverture du Lien d'Affiliation

**Objectif :** Vérifier que le lien externe s'ouvre correctement

1. Cliquer sur un bouton "Acheter"
2. **Vérifier :**
   - Un nouvel onglet/fenêtre s'ouvre
   - L'URL affichée contient les paramètres UTM :
     - `utm_source=lionsmax`
     - `utm_medium=affiliate`
     - `utm_campaign=product-click`
   - Pour iHerb : présence du paramètre `rcode=YOUR_IHERB_REF`
   - Le site de destination se charge correctement

**Résultat attendu :** ✅ Lien externe s'ouvre avec paramètres UTM

---

### Test 4 : Détection Automatique de Plateforme

**Objectif :** Vérifier que la plateforme est détectée correctement

1. Trouver un produit avec lien iHerb (contient "iherb.com")
2. Cliquer sur "Acheter"
3. **Vérifier dans l'URL du lien ouvert :**
   - Présence de `rcode=` (paramètre spécifique iHerb)
   - Base URL : `https://www.iherb.com/pr/...`

4. Trouver un produit avec lien Amazon (contient "amazon")
5. Cliquer sur "Acheter"
6. **Vérifier :** Le lien Amazon s'ouvre avec paramètres UTM

**Résultat attendu :** ✅ Chaque plateforme génère le bon format de lien

---

### Test 5 : Responsive Design

**Objectif :** Vérifier que tout fonctionne sur différents écrans

1. Ouvrir DevTools (F12) → Mode Responsive
2. Tester les tailles :
   - **Mobile** (375px)
   - **Tablet** (768px)
   - **Desktop** (1440px)
3. **Vérifier :**
   - Le bouton "Acheter" reste cliquable et visible
   - Pas de débordement de texte
   - Le tracking fonctionne sur toutes les tailles

**Résultat attendu :** ✅ Fonctionnel sur tous les formats

---

### Test 6 : Statistiques d'Affiliation

**Objectif :** Vérifier la vue de statistiques agrégées

1. Après avoir cliqué sur plusieurs produits
2. Ouvrir Supabase → **SQL Editor**
3. Exécuter la requête :

```sql
SELECT * FROM affiliate_stats 
ORDER BY date DESC 
LIMIT 10;
```

4. **Vérifier :**
   - Lignes affichées par date
   - `total_clicks` correspond au nombre de clics effectués
   - `product_name` et `affiliate_id` corrects

**Résultat attendu :** ✅ Statistiques affichées correctement

---

## 🐛 Résolution de Problèmes

### Problème : Aucune ligne insérée dans Supabase

**Solutions possibles :**
1. Vérifier que `.env.local` contient les bonnes clés Supabase
2. Vérifier dans Console (F12) s'il y a des erreurs réseau
3. Vérifier les RLS (Row Level Security) dans Supabase → ne bloquent-ils pas les insertions ?

### Problème : Le bouton ne s'affiche pas

**Solutions possibles :**
1. Vider le cache du navigateur (Ctrl+Shift+R)
2. Vérifier que le build est à jour : `npm run dev` 
3. Vérifier qu'il n'y a pas d'erreurs dans la console

### Problème : Le lien ne s'ouvre pas

**Solutions possibles :**
1. Vérifier que le produit a bien une propriété `affiliateLink` non vide
2. Vérifier qu'il n'y a pas de bloqueur de pop-ups actif dans le navigateur
3. Vérifier la console pour erreurs JavaScript

---

## 📊 Requêtes Supabase Utiles

### Voir tous les clics récents
```sql
SELECT 
  product_name, 
  clicked_at, 
  utm_source, 
  utm_campaign 
FROM affiliate_clicks 
ORDER BY clicked_at DESC 
LIMIT 20;
```

### Compter les clics par produit
```sql
SELECT 
  product_name, 
  COUNT(*) as total_clicks 
FROM affiliate_clicks 
GROUP BY product_name 
ORDER BY total_clicks DESC;
```

### Voir les clics d'aujourd'hui
```sql
SELECT * 
FROM affiliate_clicks 
WHERE clicked_at::date = CURRENT_DATE;
```

---

## ✨ Succès !

Si tous les tests passent, votre système d'affiliation est **100% opérationnel** ! 🎉

Vous pouvez maintenant :
- Monitorer les clics en temps réel dans Supabase
- Analyser les performances par produit
- Optimiser vos campagnes UTM
- Suivre les commissions (via la table `affiliate_conversions`)
