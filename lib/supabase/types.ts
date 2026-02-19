/**
 * Types TypeScript pour les tables Supabase
 */

export type ReservationStatut = "en_attente" | "confirmee" | "annulee";

export interface Reservation {
  id: string;
  created_at: string;
  nom: string;
  telephone: string;
  email: string;
  date: string;
  heure: string;
  nombre_personnes: number;
  statut: ReservationStatut;
  note_interne: string | null;
}

export type PrivatizationStatut = "en_attente" | "confirmee" | "annulee";

export type PrivatizationMoment = "midi" | "soir" | "midi_et_soir";

export interface Privatization {
  id: string;
  created_at: string;
  nom: string;
  telephone: string;
  email: string;
  date: string;
  nombre_personnes: number;
  type_evenement: string;
  moment: PrivatizationMoment;
  statut: PrivatizationStatut;
  message: string | null;
  note_interne: string | null;
}

export type BlockedSlotType = "normal" | "vacances";

export interface BlockedSlot {
  id: string;
  date: string;
  heure_debut: string;
  heure_fin: string;
  raison: string | null;
  type: BlockedSlotType;
}

export interface Database {
  public: {
    Tables: {
      reservations: {
        Row: Reservation;
        Insert: Omit<Reservation, "id" | "created_at">;
        Update: Partial<Omit<Reservation, "id" | "created_at">>;
      };
      privatizations: {
        Row: Privatization;
        Insert: Omit<Privatization, "id" | "created_at">;
        Update: Partial<Omit<Privatization, "id" | "created_at">>;
      };
      blocked_slots: {
        Row: BlockedSlot;
        Insert: Omit<BlockedSlot, "id">;
        Update: Partial<Omit<BlockedSlot, "id">>;
      };
    };
  };
}
