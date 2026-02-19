-- =====================================================
-- MIGRATION : Permettre la lecture publique des créneaux bloqués
-- =====================================================
-- Ce script met à jour les politiques RLS pour permettre
-- aux utilisateurs publics de voir les créneaux bloqués
-- (nécessaire pour le formulaire de réservation)
-- 
-- À exécuter dans : Supabase > SQL Editor > New query
-- =====================================================

-- 1. Supprimer l'ancienne politique globale
-- ==========================================

DROP POLICY IF EXISTS "Admins peuvent tout faire sur blocked_slots" ON public.blocked_slots;

-- 2. Créer les nouvelles politiques granulaires
-- ==============================================

-- Lecture : TOUT LE MONDE peut voir les créneaux bloqués
CREATE POLICY "Public peut lire les blocked_slots"
    ON public.blocked_slots
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Insertion : uniquement les utilisateurs authentifiés (admins)
CREATE POLICY "Admins peuvent créer des blocked_slots"
    ON public.blocked_slots
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Mise à jour : uniquement les utilisateurs authentifiés (admins)
CREATE POLICY "Admins peuvent modifier les blocked_slots"
    ON public.blocked_slots
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Suppression : uniquement les utilisateurs authentifiés (admins)
CREATE POLICY "Admins peuvent supprimer les blocked_slots"
    ON public.blocked_slots
    FOR DELETE
    TO authenticated
    USING (true);

-- =====================================================
-- FIN DE LA MIGRATION
-- =====================================================
-- Vérifications :
-- 1. Tester le formulaire public → doit pouvoir lire les créneaux bloqués
-- 2. Vérifier que les créneaux bloqués apparaissent comme "Complet"
-- 3. Vérifier que seuls les admins peuvent créer/modifier/supprimer
-- =====================================================
