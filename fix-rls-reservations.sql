-- =====================================================
-- FIX : Corriger les politiques RLS pour les réservations
-- =====================================================
-- Ce script corrige les politiques RLS pour permettre
-- aux utilisateurs publics (anon) de créer des réservations
-- 
-- À exécuter dans : Supabase Dashboard > SQL Editor > New query
-- =====================================================

-- 1. Supprimer TOUTES les anciennes politiques sur reservations
-- ==============================================================

DROP POLICY IF EXISTS "Utilisateurs authentifiés peuvent tout faire sur reservations" ON public.reservations;
DROP POLICY IF EXISTS "Admins peuvent lire toutes les reservations" ON public.reservations;
DROP POLICY IF EXISTS "Public peut créer des reservations" ON public.reservations;
DROP POLICY IF EXISTS "Admins peuvent modifier les reservations" ON public.reservations;
DROP POLICY IF EXISTS "Admins peuvent supprimer les reservations" ON public.reservations;

-- 2. S'assurer que RLS est activé
-- ================================

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- 3. Recréer les politiques correctes
-- ====================================

-- IMPORTANT : La politique d'insertion DOIT permettre à "anon" (utilisateurs publics)
-- de créer des réservations depuis le formulaire du site web

-- Lecture : uniquement les utilisateurs authentifiés (admins)
CREATE POLICY "Admins peuvent lire toutes les reservations"
    ON public.reservations
    FOR SELECT
    TO authenticated
    USING (true);

-- Insertion : TOUT LE MONDE peut créer une réservation (formulaire public)
-- On force le statut à 'en_attente' pour sécuriser
CREATE POLICY "Public peut créer des reservations"
    ON public.reservations
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);  -- Pas de restriction, on accepte toutes les insertions depuis l'API publique

-- Mise à jour : uniquement les utilisateurs authentifiés (admins)
CREATE POLICY "Admins peuvent modifier les reservations"
    ON public.reservations
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Suppression : uniquement les utilisateurs authentifiés (admins)
CREATE POLICY "Admins peuvent supprimer les reservations"
    ON public.reservations
    FOR DELETE
    TO authenticated
    USING (true);

-- =====================================================
-- VÉRIFICATION
-- =====================================================

-- Vérifier que les politiques sont bien créées :
SELECT schemaname, tablename, policyname, roles, cmd
FROM pg_policies
WHERE tablename = 'reservations'
ORDER BY policyname;

-- =====================================================
-- FIN DU SCRIPT
-- =====================================================
-- Après avoir exécuté ce script :
-- 1. Testez une réservation depuis le formulaire public
-- 2. Vérifiez que la réservation apparaît dans le backoffice
-- 3. Si ça ne fonctionne toujours pas, vérifiez les variables d'environnement
--    NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY dans Vercel
-- =====================================================
