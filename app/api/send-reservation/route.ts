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

    // Envoi de l'email au restaurant
    const emailRestaurant = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@leseven-grenoble.fr",
      to: process.env.RESEND_TO_EMAIL || "restaurantleseven38@gmail.com",
      subject: `Nouvelle réservation - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF6EF;">
          <div style="background-color: #92C6C4; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-family: 'Pacifico', cursive;">Le Seven</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Nouvelle réservation</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #92C6C4; margin-top: 0;">📋 Détails de la réservation</h2>
            
            <div style="background-color: #FAF6EF; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #92C6C4;">
              <p style="margin: 10px 0;"><strong style="color: #92C6C4;">👤 Client :</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong style="color: #92C6C4;">📧 Email :</strong> <a href="mailto:${email}" style="color: #4C4C4C;">${email}</a></p>
              <p style="margin: 10px 0;"><strong style="color: #92C6C4;">📞 Téléphone :</strong> <a href="tel:${phone}" style="color: #4C4C4C;">${phone}</a></p>
            </div>

            <div style="background-color: #F7C8C8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F7C8C8;">
              <p style="margin: 10px 0;"><strong style="color: #4C4C4C;">📅 Date :</strong> ${new Date(
                date
              ).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</p>
              <p style="margin: 10px 0;"><strong style="color: #4C4C4C;">🕐 Heure :</strong> <span style="font-size: 18px; font-weight: bold;">${time}</span></p>
              <p style="margin: 10px 0;"><strong style="color: #4C4C4C;">👥 Nombre de personnes :</strong> <span style="font-size: 18px; font-weight: bold;">${guests}</span></p>
            </div>
            
            <div style="background-color: #E8F5E9; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center;">
              <p style="margin: 0; color: #2E7D32; font-size: 14px;">
                ✅ <strong>N'oubliez pas de confirmer cette réservation au client</strong>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
            <p style="margin: 5px 0;">Email automatique - Le Seven Restaurant</p>
            <p style="margin: 5px 0;">${new Date().toLocaleString("fr-FR")}</p>
          </div>
        </div>
      `,
    });

    console.log("Email restaurant envoyé:", emailRestaurant);

    // Envoi de l'email de confirmation au client
    const emailClient = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@leseven-grenoble.fr",
      to: email,
      subject: "Confirmation de votre réservation - Le Seven",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF6EF;">
          <div style="background-color: #92C6C4; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-family: 'Pacifico', cursive;">Le Seven</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #92C6C4; margin-top: 0;">Merci pour votre réservation !</h2>
            
            <p>Bonjour ${name},</p>
            
            <p>Nous avons bien reçu votre demande de réservation et vous confirmons celle-ci :</p>
            
            <div style="background-color: #FAF6EF; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>📅 Date :</strong> ${new Date(
                date
              ).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</p>
              <p style="margin: 5px 0;"><strong>🕐 Heure :</strong> ${time}</p>
              <p style="margin: 5px 0;"><strong>👥 Nombre de personnes :</strong> ${guests}</p>
            </div>
            
            <p>Nous avons hâte de vous accueillir dans notre restaurant !</p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              <strong>Le Seven</strong><br>
              2 Bd de l'Esplanade, 38000 Grenoble<br>
              📞 +33 9 53 46 81 28<br>
              📧 restaurantleseven38@gmail.com
            </p>
            
            <p style="color: #999; font-size: 12px; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
              En cas de modification ou d'annulation, merci de nous contacter au plus tôt.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email client envoyé:", emailClient);

    return NextResponse.json({
      success: true,
      emailIds: {
        restaurant: emailRestaurant.data?.id,
        client: emailClient.data?.id,
      },
    });
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
