import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, guests } = body;

    // Validation des données
    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { success: false, error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    console.log("Nouvelle réservation:", body);

    // Envoi de l'email avec Resend
    const emailData = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@leseven-grenoble.fr",
      to: process.env.RESEND_TO_EMAIL || "restaurantleseven38@gmail.com",
      subject: `Nouvelle réservation - ${name}`,
      html: `
        <h2>Nouvelle réservation reçue</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Date :</strong> ${date}</p>
        <p><strong>Heure :</strong> ${time}</p>
        <p><strong>Nombre de personnes :</strong> ${guests}</p>
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
