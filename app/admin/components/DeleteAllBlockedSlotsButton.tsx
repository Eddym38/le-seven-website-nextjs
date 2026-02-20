"use client";

import { useState } from "react";
import { deleteAllBlockedSlotsAction } from "../actions";

/**
 * Bouton pour supprimer tous les créneaux bloqués avec confirmation
 */
export function DeleteAllBlockedSlotsButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await deleteAllBlockedSlotsAction();
      if (result.success) {
        alert("Tous les créneaux bloqués ont été supprimés avec succès");
        setShowConfirm(false);
      } else {
        alert(result.error || "Une erreur est survenue");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue lors de la suppression");
    } finally {
      setIsLoading(false);
    }
  };

  if (!showConfirm) {
    return (
      <button
        onClick={() => setShowConfirm(true)}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium transition-colors"
      >
        🗑️ Supprimer tous les créneaux
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700 font-medium">Êtes-vous sûr ?</span>
      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Suppression..." : "Confirmer"}
      </button>
      <button
        onClick={() => setShowConfirm(false)}
        disabled={isLoading}
        className="px-3 py-1.5 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Annuler
      </button>
    </div>
  );
}
