-- =====================================================
-- MIGRATION : Créer la table des demandes de privatisation
-- =====================================================
-- Ce script crée la table pour stocker les demandes de
-- privatisation depuis le formulaire du site web
-- 
-- À exécuter dans : Supabase > SQL Editor > New query
-- =====================================================

-- 1. Création de la table PRIVATIZATIONS
-- =======================================

CREATE TABLE IF NOT EXISTS public.privatizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    nom TEXT NOT NULL,
    telephone TEXT NOT NULL,
    email TEXT NOT NULL,
    date DATE NOT NULL,
    nombre_personnes INTEGER NOT NULL CHECK (nombre_personnes >= 20 AND nombre_personnes <= 50),
    type_evenement TEXT NOT NULL,
    statut TEXT NOT NULL CHECK (statut IN ('en_attente', 'confirmee', 'annulee')) DEFAULT 'en_attente',
    message TEXT,
    note_interne TEXT
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_privatizations_date ON public.privatizations(date);
CREATE INDEX IF NOT EXISTS idx_privatizations_statut ON public.privatizations(statut);
CREATE INDEX IF NOT EXISTS idx_privatizations_date_statut ON public.privatizations(date, statut);

-- 2. Configuration de la Row Level Security (RLS)
-- ================================================

-- Activer RLS sur la table
ALTER TABLE public.privatizations ENABLE ROW LEVEL SECURITY;

-- Lecture : uniquement les utilisateurs authentifiés (admins)
CREATE POLICY "Admins peuvent lire toutes les privatizations"
    ON public.privatizations
    FOR SELECT
    TO authenticated
    USING (true);

-- Insertion : TOUT LE MONDE peut créer une demande (formulaire public)
CREATE POLICY "Public peut créer des privatizations"
    ON public.privatizations
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        statut = 'en_attente' -- Forcer le statut à 'en_attente' pour les nouvelles demandes
    );

-- Mise à jour : uniquement les utilisateurs authentifiés (admins)
CREATE POLICY "Admins peuvent modifier les privatizations"
    ON public.privatizations
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Suppression : uniquement les utilisateurs authentifiés (admins)
CREATE POLICY "Admins peuvent supprimer les privatizations"
    ON public.privatizations
    FOR DELETE
    TO authenticated
    USING (true);

-- 3. Données de test (OPTIONNEL)
-- ================================

-- INSERT INTO public.privatizations (nom, telephone, email, date, nombre_personnes, type_evenement, statut, message)
-- VALUES 
--     ('Entreprise ABC', '0612345678', 'contact@abc.com', CURRENT_DATE + INTERVAL '7 days', 30, 'Séminaire d''entreprise', 'en_attente', 'Nous aimerions organiser un déjeuner d''équipe'),
--     ('Sophie Martin', '0698765432', 'sophie.m@example.com', CURRENT_DATE + INTERVAL '14 days', 40, 'Anniversaire', 'confirmee', 'Anniversaire 40 ans avec buffet');

-- =====================================================
-- FIN DE LA MIGRATION
-- =====================================================
-- Après avoir exécuté ce script :
-- 1. Vérifier que la table est créée (Table Editor)
-- 2. Vérifier que RLS est activé (icône de bouclier vert)
-- 3. Le formulaire public pourra créer des demandes
-- 4. Le backoffice pourra gérer les demandes
-- =====================================================
