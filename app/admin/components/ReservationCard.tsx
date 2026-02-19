"use client";

import {
  confirmReservation,
  cancelReservation,
  removeReservation,
} from "../actions";
import { Reservation } from "@/lib/supabase/types";
import { useState, useTransition } from "react";

interface Props {
  reservation: Reservation;
}

/**
 * Badge de statut coloré
 */
function StatusBadge({ statut }: { statut: Reservation["statut"] }) {
  const styles = {
    en_attente: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmee: "bg-green-100 text-green-800 border-green-200",
    annulee: "bg-red-100 text-red-800 border-red-200",
  };

  const labels = {
    en_attente: "En attente",
    confirmee: "Confirmée",
    annulee: "Annulée",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[statut]}`}
    >
      {labels[statut]}
    </span>
  );
}

/**
 * Carte d'affichage d'une réservation avec actions
 */
export function ReservationCard({ reservation }: Props) {
  const [isPending, startTransition] = useTransition();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleConfirm = () => {
    startTransition(async () => {
      await confirmReservation(reservation.id);
    });
  };

  const handleCancel = () => {
    startTransition(async () => {
      await cancelReservation(reservation.id);
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await removeReservation(reservation.id);
      setShowConfirmDelete(false);
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">
            {reservation.nom}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {new Date(reservation.date).toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            {" • "}
            {reservation.heure}
          </p>
        </div>
        <StatusBadge statut={reservation.statut} />
      </div>

      <div className="space-y-2 text-sm text-gray-700 mb-4">
        <div className="flex items-center gap-2">
          <span className="font-medium">👥</span>
          <span>
            {reservation.nombre_personnes} personne
            {reservation.nombre_personnes > 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">📞</span>
          <span>{reservation.telephone}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">✉️</span>
          <span>{reservation.email}</span>
        </div>
        {reservation.note_interne && (
          <div className="flex items-start gap-2 mt-3 p-2 bg-gray-50 rounded">
            <span className="font-medium">📝</span>
            <span className="italic">{reservation.note_interne}</span>
          </div>
        )}
      </div>

      {!showConfirmDelete ? (
        <div className="flex gap-2">
          {reservation.statut !== "confirmee" && (
            <button
              onClick={handleConfirm}
              disabled={isPending}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
            >
              Confirmer
            </button>
          )}
          {reservation.statut !== "annulee" && (
            <button
              onClick={handleCancel}
              disabled={isPending}
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50 text-sm font-medium"
            >
              Annuler
            </button>
          )}
          <button
            onClick={() => setShowConfirmDelete(true)}
            disabled={isPending}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 text-sm font-medium"
          >
            Supprimer
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-red-600 font-medium">
            Confirmer la suppression ?
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 text-sm font-medium"
            >
              Oui, supprimer
            </button>
            <button
              onClick={() => setShowConfirmDelete(false)}
              disabled={isPending}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 text-sm font-medium"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
