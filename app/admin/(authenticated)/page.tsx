import {
  getActiveReservations,
  getUpcomingBlockedSlots,
  getActivePrivatizations,
} from "@/lib/supabase";
import { ReservationCard } from "../components/ReservationCard";
import { BlockedSlotCard } from "../components/BlockedSlotCard";
import { PrivatizationCard } from "../components/PrivatizationCard";
import { DeleteAllBlockedSlotsButton } from "../components/DeleteAllBlockedSlotsButton";
import Link from "next/link";

/**
 * Dashboard principal - Réservations, privatisations et créneaux bloqués
 */
export default async function AdminDashboard() {
  const [reservations, blockedSlots, privatizations] = await Promise.all([
    getActiveReservations(),
    getUpcomingBlockedSlots(),
    getActivePrivatizations(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Réservations */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Réservations actives
        </h2>
        <p className="text-gray-600">
          Réservations en attente et confirmées ({reservations.length})
        </p>
      </div>

      {reservations.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center mb-8">
          <p className="text-gray-500 text-lg">Aucune réservation active</p>
          <Link
            href="/admin/calendar"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
          >
            Voir le calendrier
          </Link>
        </div>
      ) : (
        <div className="space-y-4 mb-12">
          {/* Réservations actives */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </div>
        </div>
      )}

      {/* Section Demandes de Privatisation */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Privatisations actives
            </h2>
            <p className="text-gray-600">
              Demandes en attente et confirmées ({privatizations.length})
            </p>
          </div>
        </div>

        {privatizations.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center mb-12">
            <p className="text-gray-500 text-lg">Aucune privatisation active</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {privatizations.map((privatization) => (
              <PrivatizationCard
                key={privatization.id}
                privatization={privatization}
              />
            ))}
          </div>
        )}
      </div>

      {/* Section Créneaux bloqués */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Créneaux bloqués
            </h2>
            <p className="text-gray-600">
              Tous les créneaux bloqués à venir ({blockedSlots.length})
            </p>
          </div>
          <div className="flex gap-2">
            <DeleteAllBlockedSlotsButton />
            <Link
              href="/admin/calendar"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
            >
              🚫 Bloquer un créneau
            </Link>
          </div>
        </div>

        {blockedSlots.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500 text-lg">Aucun créneau bloqué</p>
          </div>
        ) : (
          <BlockedSlotCard slots={blockedSlots} />
        )}
      </div>
    </div>
  );
}
