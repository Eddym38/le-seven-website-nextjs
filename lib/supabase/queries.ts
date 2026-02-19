import { createClient } from "./server";
import {
  Reservation,
  BlockedSlot,
  ReservationStatut,
  Privatization,
  PrivatizationStatut,
} from "./types";

/**
 * Fonctions pour gérer les réservations - logique séparée des composants UI
 */

// ===== RÉSERVATIONS =====

/**
 * Récupère toutes les réservations d'une date donnée
 */
export async function getReservationsByDate(
  date: string,
): Promise<Reservation[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("date", date)
    .order("heure", { ascending: true });

  if (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    throw new Error("Impossible de récupérer les réservations");
  }

  return (data as Reservation[]) || [];
}

/**
 * Récupère les réservations du jour
 */
export async function getTodayReservations(): Promise<Reservation[]> {
  const today = new Date().toISOString().split("T")[0];
  return getReservationsByDate(today);
}

/**
 * Récupère toutes les réservations (avec limite)
 */
export async function getAllReservations(limit = 100): Promise<Reservation[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("date", { ascending: false })
    .order("heure", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    throw new Error("Impossible de récupérer les réservations");
  }

  return (data as Reservation[]) || [];
}

/**
 * Récupère toutes les réservations en attente (futures et passées)
 */
export async function getPendingReservations(): Promise<Reservation[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("statut", "en_attente")
    .order("date", { ascending: true })
    .order("heure", { ascending: true });

  if (error) {
    console.error(
      "Erreur lors de la récupération des réservations en attente:",
      error,
    );
    throw new Error("Impossible de récupérer les réservations en attente");
  }

  return (data as Reservation[]) || [];
}

/**
 * Récupère toutes les réservations actives (en attente ET confirmées)
 * Exclut les réservations annulées
 */
export async function getActiveReservations(): Promise<Reservation[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .in("statut", ["en_attente", "confirmee"])
    .order("date", { ascending: true })
    .order("heure", { ascending: true });

  if (error) {
    console.error(
      "Erreur lors de la récupération des réservations actives:",
      error,
    );
    throw new Error("Impossible de récupérer les réservations actives");
  }

  return (data as Reservation[]) || [];
}

/**
 * Met à jour le statut d'une réservation
 */
export async function updateReservationStatus(
  id: string,
  statut: ReservationStatut,
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("reservations")
    .update({ statut })
    .eq("id", id);

  if (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    throw new Error("Impossible de mettre à jour le statut");
  }
}

/**
 * Met à jour la note interne d'une réservation
 */
export async function updateReservationNote(
  id: string,
  note_interne: string | null,
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("reservations")
    .update({ note_interne })
    .eq("id", id);

  if (error) {
    console.error("Erreur lors de la mise à jour de la note:", error);
    throw new Error("Impossible de mettre à jour la note");
  }
}

/**
 * Supprime une réservation
 */
export async function deleteReservation(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.from("reservations").delete().eq("id", id);

  if (error) {
    console.error("Erreur lors de la suppression:", error);
    throw new Error("Impossible de supprimer la réservation");
  }
}

// ===== CRÉNEAUX BLOQUÉS =====

/**
 * Récupère tous les créneaux bloqués à venir (à partir d'aujourd'hui)
 */
export async function getUpcomingBlockedSlots(): Promise<BlockedSlot[]> {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("blocked_slots")
    .select("*")
    .gte("date", today)
    .order("date", { ascending: true })
    .order("heure_debut", { ascending: true });

  if (error) {
    console.error(
      "Erreur lors de la récupération des créneaux bloqués:",
      error,
    );
    throw new Error("Impossible de récupérer les créneaux bloqués");
  }

  return (data as BlockedSlot[]) || [];
}

/**
 * Récupère les créneaux bloqués pour une date donnée
 */
export async function getBlockedSlotsByDate(
  date: string,
): Promise<BlockedSlot[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blocked_slots")
    .select("*")
    .eq("date", date)
    .order("heure_debut", { ascending: true });

  if (error) {
    console.error(
      "Erreur lors de la récupération des créneaux bloqués:",
      error,
    );
    throw new Error("Impossible de récupérer les créneaux bloqués");
  }

  return (data as BlockedSlot[]) || [];
}

/**
 * Crée un nouveau créneau bloqué (ou plusieurs si date_fin est fournie)
 */
export async function createBlockedSlot(
  date: string,
  heure_debut: string,
  heure_fin: string,
  raison: string | null,
  type: "normal" | "vacances" = "normal",
  date_fin?: string,
): Promise<void> {
  const supabase = await createClient();

  // Validation simple
  if (!date || !heure_debut || !heure_fin) {
    throw new Error("Tous les champs obligatoires doivent être renseignés");
  }

  // Si date_fin est fournie, bloquer tous les jours entre date et date_fin
  if (date_fin && date_fin > date) {
    const slots = [];
    const currentDate = new Date(date);
    const endDate = new Date(date_fin);

    while (currentDate <= endDate) {
      slots.push({
        date: currentDate.toISOString().split("T")[0],
        heure_debut,
        heure_fin,
        raison,
        type,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const { error } = await supabase.from("blocked_slots").insert(slots);

    if (error) {
      console.error("Erreur lors de la création des créneaux bloqués:", error);
      throw new Error("Impossible de créer les créneaux bloqués");
    }
  } else {
    // Blocage d'un seul jour
    const { error } = await supabase.from("blocked_slots").insert({
      date,
      heure_debut,
      heure_fin,
      raison,
      type,
    });

    if (error) {
      console.error("Erreur lors de la création du créneau bloqué:", error);
      throw new Error("Impossible de créer le créneau bloqué");
    }
  }
}

/**
 * Supprime un créneau bloqué
 */
export async function deleteBlockedSlot(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.from("blocked_slots").delete().eq("id", id);

  if (error) {
    console.error("Erreur lors de la suppression du créneau:", error);
    throw new Error("Impossible de supprimer le créneau bloqué");
  }
}

// ===== PRIVATISATIONS =====

/**
 * Récupère toutes les demandes de privatisation en attente
 */
export async function getPendingPrivatizations(): Promise<Privatization[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("privatizations")
    .select("*")
    .eq("statut", "en_attente")
    .order("date", { ascending: true });

  if (error) {
    console.error(
      "Erreur lors de la récupération des privatisations en attente:",
      error,
    );
    throw new Error("Impossible de récupérer les privatisations en attente");
  }

  return (data as Privatization[]) || [];
}

/**
 * Récupère toutes les privatisations actives (en attente ET confirmées)
 * Exclut les privatisations annulées
 */
export async function getActivePrivatizations(): Promise<Privatization[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("privatizations")
    .select("*")
    .in("statut", ["en_attente", "confirmee"])
    .order("date", { ascending: true });

  if (error) {
    console.error(
      "Erreur lors de la récupération des privatisations actives:",
      error,
    );
    throw new Error("Impossible de récupérer les privatisations actives");
  }

  return (data as Privatization[]) || [];
}

/**
 * Récupère toutes les privatisations
 */
export async function getAllPrivatizations(
  limit = 100,
): Promise<Privatization[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("privatizations")
    .select("*")
    .order("date", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Erreur lors de la récupération des privatisations:", error);
    throw new Error("Impossible de récupérer les privatisations");
  }

  return (data as Privatization[]) || [];
}

/**
 * Récupère les privatisations pour une date donnée
 */
export async function getPrivatizationsByDate(
  date: string,
): Promise<Privatization[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("privatizations")
    .select("*")
    .eq("date", date);

  if (error) {
    console.error("Erreur lors de la récupération des privatisations:", error);
    throw new Error("Impossible de récupérer les privatisations");
  }

  return (data as Privatization[]) || [];
}

/**
 * Met à jour le statut d'une privatisation
 */
export async function updatePrivatizationStatus(
  id: string,
  statut: PrivatizationStatut,
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("privatizations")
    .update({ statut })
    .eq("id", id);

  if (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    throw new Error("Impossible de mettre à jour le statut");
  }
}

/**
 * Met à jour la note interne d'une privatisation
 */
export async function updatePrivatizationNote(
  id: string,
  note_interne: string | null,
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("privatizations")
    .update({ note_interne })
    .eq("id", id);

  if (error) {
    console.error("Erreur lors de la mise à jour de la note:", error);
    throw new Error("Impossible de mettre à jour la note");
  }
}

/**
 * Supprime une privatisation
 */
export async function deletePrivatization(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.from("privatizations").delete().eq("id", id);

  if (error) {
    console.error("Erreur lors de la suppression:", error);
    throw new Error("Impossible de supprimer la privatisation");
  }
}
