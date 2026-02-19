import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Récupère les créneaux bloqués pour une date donnée
 * GET /api/blocked-slots?date=YYYY-MM-DD
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { success: false, error: "Date requise" },
        { status: 400 },
      );
    }

    // Créer un client Supabase public
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    // Récupérer les créneaux bloqués pour cette date
    const { data, error } = await supabase
      .from("blocked_slots")
      .select("*")
      .eq("date", date);

    if (error) {
      console.error("Erreur Supabase:", error);
      return NextResponse.json(
        { success: false, error: "Erreur lors de la récupération" },
        { status: 500 },
      );
    }

    // Créer un tableau des heures bloquées avec leur type
    const blockedTimes: { time: string; type: string; raison?: string }[] = [];

    // Les créneaux disponibles dans le formulaire
    const availableSlots = [
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
    ];

    // Pour chaque créneau bloqué, vérifier quels créneaux de réservation sont affectés
    data?.forEach((slot) => {
      const startTime = slot.heure_debut;
      const endTime = slot.heure_fin;
      const type = slot.type || "normal";
      const raison = slot.raison;

      availableSlots.forEach((time) => {
        // Si le créneau est dans la plage bloquée
        if (time >= startTime && time < endTime) {
          if (!blockedTimes.find((bt) => bt.time === time)) {
            blockedTimes.push({ time, type, raison: raison || undefined });
          }
        }
      });
    });

    return NextResponse.json({
      success: true,
      blockedTimes,
    });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 },
    );
  }
}
