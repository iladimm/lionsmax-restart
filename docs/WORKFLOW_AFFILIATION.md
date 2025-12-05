Workflow Affiliation LionsMax – Option 4 Low‑Code Maison (Supabase + Railway + n8n)
1. Objectif
Mettre en place un système d’affiliation maison pour LionsMax qui :

Suit les clics sur les liens affiliés (iHerb, Amazon, etc.) via Supabase.​

Utilise n8n (hébergé sur Railway) pour automatiser emails, reporting et calculs simples de commissions.​

Reste low‑code et maintenable par un solo‑entrepreneur, sans backend lourd personnalisé.​​

2. Stack technique
Frontend : Vite + React (hébergé sur Hostinger).

Backend “BaaS” : Supabase (PostgreSQL + Auth + API).​

Automations : n8n auto‑hébergé sur Railway.​

Infra :

Hostinger → front.

Railway → n8n (et éventuellement autres services).

3. Modèle de données Supabase
Tables minimales :

3.1 users
id (UUID, PK)

email (TEXT, unique)

created_at (TIMESTAMP, default NOW)

3.2 affiliate_clicks
id (UUID, PK)

user_id (UUID, nullable, FK vers users.id)

product_name (TEXT)

external_link (TEXT, URL affiliée)

affiliate_id (TEXT, ex : “lionsmax-site”)

utm_source (TEXT)

utm_medium (TEXT)

utm_campaign (TEXT)

clicked_at (TIMESTAMP, default NOW)

3.3 affiliate_conversions (optionnel)
id (UUID, PK)

click_id (UUID, FK vers affiliate_clicks.id)

order_value (NUMERIC)

estimated_commission (NUMERIC)

status (TEXT, ex : pending/confirmed)

Supabase fournit une API REST et un SDK JS pour manipuler ces tables depuis le front ou n8n.​

4. Intégration Supabase dans le front LionsMax
4.1 Client Supabase
Fichier : src/lib/supabase.ts

Initialise supabase avec VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.

Sert de point d’accès unique Supabase dans l’app.

4.2 Hook de tracking
Fichier : src/hooks/useAffiliate.ts

Fonction principale : trackAffiliateClick(productName, externalLink, affiliateId?).

Rôle : insérer une ligne dans affiliate_clicks via le client Supabase.

4.3 Composant bouton affilié
Fichier : src/components/AffiliateButton.tsx

Props typiques : product, iherbLink (ou autre), commission?.

Au clic :

Appelle trackAffiliateClick(...).

Ouvre le lien externe dans un nouvel onglet (window.open).

4.4 Utilisation dans les pages
Pages : HomePage, joint-health, etc.

Chaque produit recommandé utilise <AffiliateButton /> avec le lien affilié correspondant.

Résultat : chaque clic affilié est loggé automatiquement dans Supabase sans backend custom.​

5. n8n sur Railway – Automations
5.1 Déploiement de n8n sur Railway
Créer un service n8n via le template Railway ou l’image Docker officielle.​

Ajouter une base Postgres Railway pour les données internes n8n.

Configurer les variables d’environnement n8n (DB, host, port, etc.).​

5.2 Connexion n8n ↔ Supabase
Dans n8n, ajouter des credentials Supabase (via HTTP node ou intégration dédiée).​

Utiliser l’URL API Supabase et une clé “service role” (avec attention aux permissions).

5.3 Workflows n8n recommandés
Workflow 1 : Rapport quotidien de clics
Trigger : Cron (tous les jours).

Node Supabase : lire tous les affiliate_clicks des dernières 24 h.​

Node fonction : agréger par produit / source / campagne.

Node Email ou Slack : envoyer un résumé quotidien (clics, produits top, etc.).

Workflow 2 : Enrichissement / nettoyage des données
Trigger : Cron ou webhook.

Lire les derniers affiliate_clicks.

Ajouter des champs calculés (device, estimations, etc.).

Mettre à jour Supabase ou pousser vers Google Sheets pour reporting externe.

Workflow 3 : Estimation hebdomadaire des commissions
Trigger : Cron hebdomadaire.

Lire affiliate_clicks de la semaine.

Appliquer un taux de conversion moyen + commission moyenne.

Écrire les résultats dans affiliate_conversions ou une table de stats.

6. Rôle de Railway dans l’architecture
Héberge n8n (orchestrateur de flux d’automations).​

Peut héberger d’autres services auxiliaires si nécessaire.

Communication :

Front (Hostinger) → Supabase (direct).

n8n (Railway) → Supabase (via HTTP/API) + autres outils (email, Slack, Sheets).​

7. Flux fonctionnel complet
Un visiteur arrive sur LionsMax (site Vite/React).

Il consulte un article et clique sur un bouton affilié (ex : “Acheter sur iHerb”).

Le composant AffiliateButton appelle trackAffiliateClick, qui insère un enregistrement dans affiliate_clicks (Supabase).

Le lien affilié s’ouvre dans un nouvel onglet vers iHerb/Amazon/autre.

En parallèle, n8n sur Railway exécute régulièrement des workflows :

rapports de clics,

enrichissement de données,

estimation de commissions,

notifications (email/Slack).​​

Ce workflow réalise l’option 4 “Low‑Code Maison (GRATUIT + Supabase)” en combinant :

Supabase pour stockage et API,

Railway + n8n pour l’automation,

Vite/React comme front optimisé SEO et contenu.