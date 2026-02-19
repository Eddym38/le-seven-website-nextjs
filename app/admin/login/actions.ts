"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Server Actions pour l'authentification
 */

/**
 * Connexion par email et mot de passe
 */
export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validation simple
  if (!email || !email.includes("@")) {
    return { error: "Email invalide" };
  }

  if (!password || password.length < 6) {
    return { error: "Mot de passe requis (minimum 6 caractères)" };
  }

  const supabase = await createClient();

  // Se connecter avec email et mot de passe
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Erreur lors de la connexion:", error);
    return { error: "Email ou mot de passe incorrect" };
  }

  // Rediriger vers le dashboard
  redirect("/admin");
}

/**
 * Déconnexion
 */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
