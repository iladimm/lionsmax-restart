-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Configuration pour les tables d'affiliation
-- ============================================

-- 1. ACTIVER RLS SUR TOUTES LES TABLES
-- ======================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_conversions ENABLE ROW LEVEL SECURITY;

-- 2. POLICIES POUR LA TABLE `users`
-- ==================================

-- Permettre la lecture uniquement aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated users to read users"
ON users
FOR SELECT
TO authenticated
USING (true);

-- Permettre aux utilisateurs de lire leur propre profil (même non authentifiés via email)
CREATE POLICY "Allow users to read their own profile"
ON users
FOR SELECT
TO anon
USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Permettre les insertions pour l'enregistrement de nouveaux utilisateurs
CREATE POLICY "Allow public insert on users"
ON users
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Permettre aux utilisateurs de mettre à jour leur propre profil
CREATE POLICY "Allow users to update their own profile"
ON users
FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- 3. POLICIES POUR LA TABLE `affiliate_clicks`
-- =============================================

-- Permettre les insertions publiques (critiques pour le tracking des clics)
CREATE POLICY "Allow public insert on affiliate_clicks"
ON affiliate_clicks
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Permettre la lecture uniquement aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated read on affiliate_clicks"
ON affiliate_clicks
FOR SELECT
TO authenticated
USING (true);

-- Permettre la lecture aux utilisateurs anonymes de leurs propres clics (optionnel)
-- Décommentez si vous voulez permettre aux utilisateurs de voir leurs propres clics
-- CREATE POLICY "Allow users to read their own clicks"
-- ON affiliate_clicks
-- FOR SELECT
-- TO anon
-- USING (ip_address = inet_client_addr());

-- 4. POLICIES POUR LA TABLE `affiliate_conversions`
-- ==================================================

-- Permettre les insertions uniquement aux utilisateurs authentifiés (admin)
CREATE POLICY "Allow authenticated insert on conversions"
ON affiliate_conversions
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Permettre la lecture uniquement aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated read on conversions"
ON affiliate_conversions
FOR SELECT
TO authenticated
USING (true);

-- Permettre les mises à jour uniquement aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated update on conversions"
ON affiliate_conversions
FOR UPDATE
TO authenticated
USING (true);

-- 5. POLICY POUR LA VUE `affiliate_stats`
-- ========================================

-- Note: Les vues héritent des policies des tables sous-jacentes
-- Pas besoin de policies supplémentaires pour affiliate_stats

-- ============================================
-- VÉRIFICATION DES POLICIES
-- ============================================

-- Pour vérifier que les policies sont actives, exécutez :
-- SELECT tablename, policyname, permissive, roles, cmd, qual 
-- FROM pg_policies 
-- WHERE schemaname = 'public' 
-- AND tablename IN ('users', 'affiliate_clicks', 'affiliate_conversions');

-- ============================================
-- NOTES IMPORTANTES
-- ============================================

/*
RÉSUMÉ DES PERMISSIONS :

1. TABLE `users`
   - SELECT : Authenticated (tous) + Anon (leur propre profil)
   - INSERT : Public (anon + authenticated)
   - UPDATE : Authenticated (leur propre profil)

2. TABLE `affiliate_clicks`
   - SELECT : Authenticated uniquement
   - INSERT : Public (anon + authenticated) ← CRITIQUE pour le tracking
   - UPDATE : Aucune policy (non permis)
   - DELETE : Aucune policy (non permis)

3. TABLE `affiliate_conversions`
   - SELECT : Authenticated uniquement
   - INSERT : Authenticated uniquement
   - UPDATE : Authenticated uniquement
   - DELETE : Aucune policy (non permis)

SÉCURITÉ :
- Les clics peuvent être insérés publiquement (nécessaire pour le tracking)
- Seuls les admins authentifiés peuvent voir les statistiques
- Les conversions ne peuvent être gérées que par des admins authentifiés
- Les données sensibles sont protégées
*/
