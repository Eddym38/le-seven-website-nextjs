import { createBrowserClient } from "@supabase/ssr";

/**
 * Client Supabase pour utilisation côté navigateur (Client Components)
 *
 * Créé une nouvelle instance à chaque utilisation pour garantir
 * une session fraîche et éviter les problèmes de cache.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
