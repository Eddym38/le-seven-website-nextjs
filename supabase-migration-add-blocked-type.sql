-- =====================================================
-- MIGRATION : Ajouter le type de blocage et gérer les vacances
-- =====================================================
-- Ce script ajoute un champ "type" à la table blocked_slots
-- pour distinguer les blocages normaux des périodes de vacances
-- 
-- À exécuter dans : Supabase > SQL Editor > New query
-- =====================================================

-- 1. Ajouter le champ "type" à la table blocked_slots
-- ====================================================

ALTER TABLE public.blocked_slots 
ADD COLUMN type TEXT NOT NULL DEFAULT 'normal' CHECK (type IN ('normal', 'vacances'));

-- 2. Mettre à jour les créneaux existants (optionnel)
-- ===================================================
-- Si vous avez des créneaux existants, ils seront marqués comme "normal"
-- Vous pouvez les mettre à jour manuellement si nécessaire

-- Exemple : UPDATE public.blocked_slots SET type = 'vacances' WHERE raison ILIKE '%vacances%';

-- =====================================================
-- FIN DE LA MIGRATION
-- =====================================================
-- Après cette migration :
-- - Les blocages peuvent être de type "normal" ou "vacances"
-- - Les vacances s'afficheront différemment dans le formulaire public
-- - Le backoffice permet de bloquer plusieurs jours d'affilée
-- =====================================================
