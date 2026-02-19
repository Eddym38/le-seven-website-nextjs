import { getReservationsByDate, getBlockedSlotsByDate } from "@/lib/supabase";
import { ReservationCard } from "../../components/ReservationCard";
import { BlockSlotForm } from "../../components/BlockSlotForm";
import { BlockedSlotsList } from "../../components/BlockedSlotsList";
import { DateSelector } from "../../components/DateSelector";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{ date?: string }>;
}

/**
 * Page calendrier - Vue par date des réservations et créneaux bloqués
 */
export default async function CalendarPage({ searchParams }: Props) {
  const params = await searchParams;
  const selectedDate = params.date || new Date().toISOString().split("T")[0];

  // Récupérer les données en parallèle
  const [reservations, blockedSlots] = await Promise.all([
    getReservationsByDate(selectedDate),
    getBlockedSlotsByDate(selectedDate),
  ]);

  const formattedDate = new Date(selectedDate).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Séparer par statut
  const enAttente = reservations.filter((r) => r.statut === "en_attente");
  const confirmees = reservations.filter((r) => r.statut === "confirmee");
  const annulees = reservations.filter((r) => r.statut === "annulee");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Calendrier des réservations
        </h2>

        <Suspense fallback={<div>Chargement...</div>}>
          <DateSelector />
        </Suspense>
      </div>

      <div className="mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 capitalize">
            {formattedDate}
          </h3>
          <div className="flex gap-6 mt-2 text-sm">
            <span className="text-gray-600">
              <span className="font-medium">{reservations.length}</span>{" "}
              réservation{reservations.length > 1 ? "s" : ""}
            </span>
            <span className="text-gray-600">
              <span className="font-medium">{blockedSlots.length}</span> créneau
              {blockedSlots.length > 1 ? "x" : ""} bloqué
              {blockedSlots.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <BlockSlotForm selectedDate={selectedDate} />
      </div>

      {/* Créneaux bloqués */}
      <BlockedSlotsList slots={blockedSlots} />

      {/* Réservations */}
      {reservations.length === 0 ? (
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-lg">
            Aucune réservation pour cette date
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {/* En attente */}
          {enAttente.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                ⏳ En attente ({enAttente.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enAttente.map((reservation) => (
                  <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Confirmées */}
          {confirmees.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                ✅ Confirmées ({confirmees.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {confirmees.map((reservation) => (
                  <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Annulées */}
          {annulees.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                ❌ Annulées ({annulees.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {annulees.map((reservation) => (
                  <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
