-- =====================================================
-- MIGRATION : Permettre les réservations publiques
-- =====================================================
-- Ce script met à jour les politiques RLS pour permettre
-- aux utilisateurs publics de créer des réservations
-- via le formulaire du site web
-- 
-- À exécuter dans : Supabase > SQL Editor > New query
-- =====================================================

-- 1. Supprimer l'ancienne politique globale
-- ==========================================

DROP POLICY IF EXISTS "Utilisateurs authentifiés peuvent tout faire sur reservations" ON public.reservations;

-- 2. Créer les nouvelles politiques granulaires
-- ==============================================

-- Lecture : uniquement les utilisateurs authentifiés (admins)
CREATE POLICY "Admins peuvent lire toutes les reservations"
    ON public.reservations
    FOR SELECT
    TO ## Error Type
Build Error

## Error Message
Export createClient doesn't exist in target module

## Build Output
./app/api/send-reservation/route.ts:3:1
Export createClient doesn't exist in target module
  1 | import { NextResponse } from "next/server";
  2 | import { Resend } from "resend";
> 3 | import { createClient } from "@supabase/ssr";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  4 | import { cookies } from "next/headers";
  5 |
  6 | const resend = new Resend(process.env.RESEND_API_KEY);

The export createClient was not found in module [project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript).
Did you mean to import createServerClient?
All exports of the module are statically known (It doesn't have dynamic exports). So it's known statically that the requested export doesn't exist.

Next.js version: 16.0.7 (Turbopack)
authenticated
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

-- =====================================================
-- FIN DE LA MIGRATION
-- =====================================================
-- Vérifications :
-- 1. Tester le formulaire public → doit créer une réservation
-- 2. Vérifier dans le backoffice → doit voir la réservation
-- 3. Essayer de modifier depuis le backoffice → doit fonctionner
-- =====================================================
