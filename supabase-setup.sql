-- =====================================================
-- SETUP SUPABASE POUR LE BACKOFFICE LE SEVEN
-- =====================================================
-- Script à exécuter dans l'éditeur SQL de Supabase
-- (Dashboard Supabase > SQL Editor > New query)
-- =====================================================

-- 1. Création de la table RESERVATIONS
-- =====================================

CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    nom TEXT NOT NULL,
    telephone TEXT NOT NULL,
    email TEXT NOT NULL,
    date DATE NOT NULL,
    heure TIME NOT NULL,
    nombre_personnes INTEGER NOT NULL CHECK (nombre_personnes > 0),
    statut TEXT NOT NULL CHECK (statut IN ('en_attente', 'confirmee', 'annulee')),
    note_interne TEXT
);

-- Index pour améliorer les performances des requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_reservations_date ON public.reservations(date);
CREATE INDEX IF NOT EXISTS idx_reservations_statut ON public.reservations(statut);
CREATE INDEX IF NOT EXISTS idx_reservations_date_heure ON public.reservations(date, heure);


-- 2. Création de la table BLOCKED_SLOTS
-- ======================================

CREATE TABLE IF NOT EXISTS public.blocked_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    heure_debut TIME NOT NULL,
    heure_fin TIME NOT NULL,
    raison TEXT,
    CHECK (heure_fin > heure_debut)
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_blocked_slots_date ON public.blocked_slots(date);


-- 3. Configuration de la Row Level Security (RLS)
-- ================================================

-- Activer RLS sur les deux tables
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_slots ENABLE ROW LEVEL SECURITY;

-- RESERVATIONS - Politiques séparées par action
-- Lecture : uniquement les utilisateurs authentifiés (admins)
CREATE POLICY "Admins peuvent lire toutes les reservations"
    ON public.reservations
    FOR SELECT
    TO authenticated
    USING (true);

-- Insertion : TOUT LE MONDE peut créer une réservation (formulaire public)
CREATE POLICY "Public peut créer des reservations"
    ON public.reservations
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        statut = 'en_attente' -- Forcer le statut à 'en_attente' pour les nouvelles réservations
    );

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

-- BLOCKED_SLOTS - Uniquement les admins
CREATE POLICY "Admins peuvent tout faire sur blocked_slots"
    ON public.blocked_slots
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);


-- 4. Données de test (OPTIONNEL - pour tester le backoffice)
-- ===========================================================

-- Quelques réservations de test
INSERT INTO public.reservations (nom, telephone, email, date, heure, nombre_personnes, statut)
VALUES 
    ('Jean Dupont', '0612345678', 'jean.dupont@example.com', CURRENT_DATE, '12:30', 4, 'en_attente'),
    ('Marie Martin', '0698765432', 'marie.martin@example.com', CURRENT_DATE, '19:00', 2, 'confirmee'),
    ('Pierre Durand', '0611223344', 'pierre.durand@example.com', CURRENT_DATE, '20:30', 6, 'en_attente'),
    ('Sophie Bernard', '0655667788', 'sophie.bernard@example.com', CURRENT_DATE + INTERVAL '1 day', '13:00', 3, 'confirmee');

-- Un créneau bloqué de test
INSERT INTO public.blocked_slots (date, heure_debut, heure_fin, raison)
VALUES 
    (CURRENT_DATE + INTERVAL '2 days', '14:00', '16:00', 'Event privé');


-- =====================================================
-- FIN DU SCRIPT
-- =====================================================
-- Après avoir exécuté ce script :
-- 1. Vérifier que les tables sont créées (Table Editor)
-- 2. Vérifier que RLS est activé (icône de bouclier vert)
-- 3. Configurer l'authentification par email dans Auth > Providers
-- =====================================================
