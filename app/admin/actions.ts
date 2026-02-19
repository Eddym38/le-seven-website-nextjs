"use server";

import {
  updateReservationStatus,
  deleteReservation,
  createBlockedSlot,
  deleteBlockedSlot,
  updatePrivatizationStatus,
  deletePrivatization,
} from "@/lib/supabase";
import { ReservationStatut } from "@/lib/supabase/types";
import { revalidatePath } from "next/cache";

/**
 * Server Actions pour gérer les réservations et créneaux bloqués
 */

/**
 * Confirmer une réservation
 */
export async function confirmReservation(id: string) {
  try {
    await updateReservationStatus(id, "confirmee");
    revalidatePath("/admin");
    revalidatePath("/admin/calendar");
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la confirmation:", error);
    return { error: "Impossible de confirmer la réservation" };
  }
}

/**
 * Annuler une réservation
 */
export async function cancelReservation(id: string) {
  try {
    await updateReservationStatus(id, "annulee");
    revalidatePath("/admin");
    revalidatePath("/admin/calendar");
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de l'annulation:", error);
    return { error: "Impossible d'annuler la réservation" };
  }
}

/**
 * Supprimer une réservation
 */
export async function removeReservation(id: string) {
  try {
    await deleteReservation(id);
    revalidatePath("/admin");
    revalidatePath("/admin/calendar");
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return { error: "Impossible de supprimer la réservation" };
  }
}

/**
 * Bloquer un créneau (ou plusieurs jours pour les vacances)
 */
export async function blockSlot(formData: FormData) {
  const date = formData.get("date") as string;
  const date_fin = formData.get("date_fin") as string;
  const heure_debut = formData.get("heure_debut") as string;
  const heure_fin = formData.get("heure_fin") as string;
  const raison = (formData.get("raison") as string) || null;
  const type = (formData.get("type") as "normal" | "vacances") || "normal";

  // Validation
  if (!date || !heure_debut || !heure_fin) {
    return { error: "Tous les champs obligatoires doivent être renseignés" };
  }

  try {
    await createBlockedSlot(
      date,
      heure_debut,
      heure_fin,
      raison,
      type,
      date_fin || undefined,
    );
    revalidatePath("/admin/calendar");
    return { success: true };
  } catch (error) {
    console.error("Erreur lors du blocage du créneau:", error);
    return { error: "Impossible de bloquer le créneau" };
  }
}

/**
 * Débloquer un créneau
 */
export async function unblockSlot(id: string) {
  try {
    await deleteBlockedSlot(id);
    revalidatePath("/admin/calendar");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Erreur lors du déblocage:", error);
    return { error: "Impossible de débloquer le créneau" };
  }
}

/**
 * Confirmer une privatisation
 */
export async function confirmPrivatization(id: string) {
  try {
    await updatePrivatizationStatus(id, "confirmee");
    revalidatePath("/admin");
    revalidatePath("/admin/privatizations");
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la confirmation:", error);
    return { error: "Impossible de confirmer la privatisation" };
  }
}

/**
 * Annuler une privatisation
 */
export async function cancelPrivatization(id: string) {
  try {
    await updatePrivatizationStatus(id, "annulee");
    revalidatePath("/admin");
    revalidatePath("/admin/privatizations");
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de l'annulation:", error);
    return { error: "Impossible d'annuler la privatisation" };
  }
}

/**
 * Supprimer une privatisation
 */
export async function removePrivatization(id: string) {
  try {
    await deletePrivatization(id);
    revalidatePath("/admin");
    revalidatePath("/admin/privatizations");
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return { error: "Impossible de supprimer la privatisation" };
  }
}
