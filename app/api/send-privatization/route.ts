import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, guests, eventType, message } = body;

    // Validation des données
    if (!name || !email || !phone || !date || !guests || !eventType) {
      return NextResponse.json(
        { success: false, error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    console.log("Nouvelle demande de privatisation:", body);

    // Envoi de l'email avec Resend
    const emailData = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@leseven-grenoble.fr",
      to: process.env.RESEND_TO_EMAIL || "restaurantleseven38@gmail.com",
      subject: `Demande de privatisation - ${eventType} - ${name}`,
      html: `
        <h2>Nouvelle demande de privatisation</h2>
        <p><strong>Type d'événement :</strong> ${eventType}</p>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Date :</strong> ${date}</p>
        <p><strong>Nombre de personnes :</strong> ${guests}</p>
        ${message ? `<p><strong>Message :</strong></p><p>${message}</p>` : ''}
      `,
    });

    console.log("Email envoyé:", emailData);

    return NextResponse.json({ success: true, emailId: emailData.id });
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
