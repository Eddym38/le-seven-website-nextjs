"use client";

import { Privatization } from "@/lib/supabase/types";
import { useState, useTransition } from "react";
import {
  confirmPrivatization,
  cancelPrivatization,
  removePrivatization,
} from "../actions";

interface Props {
  privatization: Privatization;
}

/**
 * Carte pour afficher une demande de privatisation
 */
export function PrivatizationCard({ privatization }: Props) {
  const [isPending, startTransition] = useTransition();
  const [showActions, setShowActions] = useState(false);

  const handleConfirm = () => {
    if (confirm("Confirmer cette demande de privatisation ?")) {
      startTransition(async () => {
        await confirmPrivatization(privatization.id);
      });
    }
  };

  const handleCancel = () => {
    if (confirm("Annuler cette demande de privatisation ?")) {
      startTransition(async () => {
        await cancelPrivatization(privatization.id);
      });
    }
  };

  const handleDelete = () => {
    if (
      confirm(
        "Supprimer définitivement cette demande ? Cette action est irréversible.",
      )
    ) {
      startTransition(async () => {
        await removePrivatization(privatization.id);
      });
    }
  };

  const statusStyles = {
    en_attente: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      badge: "bg-yellow-100 text-yellow-800",
      text: "En attente",
    },
    confirmee: {
      bg: "bg-green-50",
      border: "border-green-200",
      badge: "bg-green-100 text-green-800",
      text: "Confirmée",
    },
    annulee: {
      bg: "bg-red-50",
      border: "border-red-200",
      badge: "bg-red-100 text-red-800",
      text: "Annulée",
    },
  };

  const style = statusStyles[privatization.statut];

  const formattedDate = new Date(
    privatization.date + "T12:00:00",
  ).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getMomentLabel = (moment: string) => {
    switch (moment) {
      case "midi":
        return "🌞 Midi";
      case "soir":
        return "🌙 Soir";
      case "midi_et_soir":
        return "🌞🌙 Midi et soir";
      default:
        return moment;
    }
  };

  return (
    <div
      className={`${style.bg} border ${style.border} rounded-lg p-4 transition-all ${isPending ? "opacity-50" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">
            {privatization.nom}
          </h3>
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${style.badge}`}
          >
            {style.text}
          </span>
        </div>
        <button
          onClick={() => setShowActions(!showActions)}
          disabled={isPending}
          className="text-gray-500 hover:text-gray-700 text-xl leading-none"
        >
          ⋮
        </button>
      </div>

      {/* Info */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-700">
          <span className="font-medium">🎉 Type :</span>
          <span className="ml-2">{privatization.type_evenement}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <span className="font-medium">📅 Date :</span>
          <span className="ml-2 capitalize">{formattedDate}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <span className="font-medium">⏰ Moment :</span>
          <span className="ml-2">{getMomentLabel(privatization.moment)}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <span className="font-medium">👥 Personnes :</span>
          <span className="ml-2">{privatization.nombre_personnes}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <span className="font-medium">📞 Tél :</span>
          <a
            href={`tel:${privatization.telephone}`}
            className="ml-2 hover:underline text-blue-600"
          >
            {privatization.telephone}
          </a>
        </div>
        <div className="flex items-center text-gray-700">
          <span className="font-medium">📧 Email :</span>
          <a
            href={`mailto:${privatization.email}`}
            className="ml-2 hover:underline text-blue-600 truncate"
          >
            {privatization.email}
          </a>
        </div>
        {privatization.message && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600 italic">
              💬 "{privatization.message}"
            </p>
          </div>
        )}
        {privatization.note_interne && (
          <div className="mt-2 p-2 bg-gray-100 rounded">
            <p className="text-xs text-gray-700">
              📝 Note : {privatization.note_interne}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
          {privatization.statut === "en_attente" && (
            <>
              <button
                onClick={handleConfirm}
                disabled={isPending}
                className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
              >
                ✅ Confirmer
              </button>
              <button
                onClick={handleCancel}
                disabled={isPending}
                className="flex-1 px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 text-sm font-medium"
              >
                ❌ Annuler
              </button>
            </>
          )}
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 text-sm font-medium"
          >
            🗑️ Supprimer
          </button>
        </div>
      )}
    </div>
  );
}
