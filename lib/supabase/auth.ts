import { createClient } from "./server";

/**
 * Utilitaires pour gérer l'authentification
 */

/**
 * Vérifie si un utilisateur est authentifié
 * À utiliser dans les Server Components pour vérifier la session
 */
export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

/**
 * Vérifie si un utilisateur est authentifié (version booléenne)
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getUser();
  return user !== null;
}

/**
 * Récupère la session courante
 */
export async function getSession() {
  const supabase = await createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    return null;
  }

  return session;
}
