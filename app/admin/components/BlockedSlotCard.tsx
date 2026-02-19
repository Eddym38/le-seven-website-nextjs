"use client";

import { BlockedSlot } from "@/lib/supabase/types";
import { unblockSlot } from "../actions";
import { useTransition } from "react";

interface Props {
  slots: BlockedSlot[];
}

/**
 * Carte pour afficher un créneau bloqué dans le dashboard
 */
export function BlockedSlotCard({ slots }: Props) {
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

  // Grouper par date
  const groupedByDate = slots.reduce(
    (acc, slot) => {
      if (!acc[slot.date]) {
        acc[slot.date] = [];
      }
      acc[slot.date].push(slot);
      return acc;
    },
    {} as Record<string, BlockedSlot[]>,
  );

  return (
    <div className="space-y-4">
      {Object.entries(groupedByDate).map(([date, dateSlots]) => {
        const formattedDate = new Date(date + "T12:00:00").toLocaleDateString(
          "fr-FR",
          {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          },
        );

        return (
          <div
            key={date}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <div className="font-semibold text-gray-900 mb-3">
              📅 {formattedDate}
            </div>
            <div className="space-y-2">
              {dateSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`flex items-center justify-between p-3 rounded-md ${
                    slot.type === "vacances"
                      ? "bg-purple-50 border border-purple-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {slot.heure_debut} - {slot.heure_fin}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          slot.type === "vacances"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {slot.type === "vacances"
                          ? "🏖️ Vacances"
                          : "🚫 Complet"}
                      </span>
                    </div>
                    {slot.raison && (
                      <div className="text-xs text-gray-600 mt-1">
                        {slot.raison}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleUnblock(slot.id)}
                    disabled={isPending}
                    className={`ml-3 px-3 py-1 text-white rounded-md text-xs font-medium disabled:opacity-50 ${
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
      })}
    </div>
  );
}
