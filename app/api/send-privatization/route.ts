import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Pour l'instant, on log juste les données
    console.log("Nouvelle demande de privatisation:", body);

    // TODO: Envoyer un email avec les détails

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
