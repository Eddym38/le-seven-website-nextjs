import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Pour l'instant, on log juste les données
    // Vous pourrez ensuite intégrer avec Resend ou un service d'email
    console.log("Nouvelle réservation:", body);

    // TODO: Envoyer un email avec les détails de la réservation
    // Exemple avec Resend (à configurer):
    // const { Resend } = require('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({...});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
