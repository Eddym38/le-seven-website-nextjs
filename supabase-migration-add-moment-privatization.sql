-- =====================================================
-- MIGRATION : Ajouter le champ "moment" aux privatisations
-- =====================================================
-- Ce script ajoute un champ "moment" à la table privatizations
-- pour indiquer si la privatisation est pour le midi, le soir, ou les deux
-- 
-- À exécuter dans : Supabase > SQL Editor > New query
-- =====================================================

-- 1. Ajouter le champ "moment" à la table privatizations
-- =======================================================

ALTER TABLE public.privatizations 
ADD COLUMN moment TEXT NOT NULL DEFAULT 'midi_et_soir' CHECK (moment IN ('midi', 'soir', 'midi_et_soir'));

-- 2. Mettre à jour les privatisations existantes (optionnel)
-- ===========================================================
-- Les privatisations existantes seront automatiquement définies sur 'midi_et_soir'
-- Vous pouvez les mettre à jour manuellement si nécessaire

-- =====================================================
-- FIN DE LA MIGRATION
-- =====================================================
-- Après cette migration :
-- - Les privatisations peuvent être pour "midi", "soir", ou "midi_et_soir"
-- - Le formulaire public permettra de choisir le moment souhaité
-- - Le backoffice affichera cette information
-- =====================================================
