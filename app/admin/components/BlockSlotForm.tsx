"use client";

import { blockSlot } from "../actions";
import { useState, useTransition } from "react";

interface Props {
  selectedDate: string;
}

/**
 * Formulaire pour bloquer un créneau
 */
export function BlockSlotForm({ selectedDate }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);

    startTransition(async () => {
      const result = await blockSlot(formData);

      if (result.error) {
        setError(result.error);
      } else {
        setIsOpen(false);
        // Réinitialiser le formulaire
        const form = document.getElementById(
          "block-slot-form",
        ) as HTMLFormElement;
        form?.reset();
      }
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
      >
        🚫 Bloquer un créneau
      </button>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Bloquer un créneau
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <form id="block-slot-form" action={handleSubmit} className="space-y-4">
        <input type="hidden" name="date" value={selectedDate} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type de blocage *
          </label>
          <select
            name="type"
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="normal">Blocage normal (complet)</option>
            <option value="vacances">Vacances</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="date_debut"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date début *
            </label>
            <input
              type="date"
              id="date_debut"
              name="date"
              defaultValue={selectedDate}
              required
              disabled={isPending}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="date_fin"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date fin (optionnel)
            </label>
            <input
              type="date"
              id="date_fin"
              name="date_fin"
              disabled={isPending}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
            <p className="text-xs text-gray-500 mt-1">
              Pour bloquer plusieurs jours (vacances)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="heure_debut"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Heure début *
            </label>
            <input
              type="time"
              id="heure_debut"
              name="heure_debut"
              defaultValue="12:00"
              required
              disabled={isPending}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="heure_fin"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Heure fin *
            </label>
            <input
              type="time"
              id="heure_fin"
              name="heure_fin"
              defaultValue="22:00"
              required
              disabled={isPending}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="raison"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Raison (optionnel)
          </label>
          <textarea
            id="raison"
            name="raison"
            rows={3}
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="Ex: Vacances d'été, Fermeture annuelle, Event privé..."
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 text-sm font-medium"
          >
            {isPending ? "Blocage..." : "Bloquer"}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 text-sm font-medium"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
