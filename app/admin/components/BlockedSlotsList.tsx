"use client";

import { unblockSlot } from "../actions";
import { BlockedSlot } from "@/lib/supabase/types";
import { useTransition } from "react";

interface Props {
  slots: BlockedSlot[];
}

/**
 * Liste des créneaux bloqués avec bouton de déblocage
 */
export function BlockedSlotsList({ slots }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleUnblock = (id: string) => {
    if (confirm("Voulez-vous vraiment débloquer ce créneau ?")) {
      startTransition(async () => {
        await unblockSlot(id);
      });
    }
  };

  if (slots.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        🚫 Créneaux bloqués ({slots.length})
      </h3>
      <div className="space-y-3">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`border rounded-lg p-4 flex items-start justify-between ${
              slot.type === "vacances"
                ? "bg-purple-50 border-purple-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900">
                  {slot.heure_debut} - {slot.heure_fin}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    slot.type === "vacances"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {slot.type === "vacances" ? "🏖️ Vacances" : "🚫 Complet"}
                </span>
              </div>
              {slot.raison && (
                <div className="text-sm text-gray-600 mt-1">{slot.raison}</div>
              )}
            </div>
            <button
              onClick={() => handleUnblock(slot.id)}
              disabled={isPending}
              className={`px-3 py-1 text-white rounded-md text-sm font-medium disabled:opacity-50 ${
                slot.type === "vacances"
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Débloquer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
