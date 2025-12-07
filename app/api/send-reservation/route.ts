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
        <h2>Nouvelle réservation reçue</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Date :</strong> ${date}</p>
        <p><strong>Heure :</strong> ${time}</p>
        <p><strong>Nombre de personnes :</strong> ${guests}</p>
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
              <p style="margin: 5px 0;"><strong>📅 Date :</strong> ${new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p style="margin: 5px 0;"><strong>🕐 Heure :</strong> ${time}</p>
              <p style="margin: 5px 0;"><strong>👥 Nombre de personnes :</strong> ${guests}</p>
            </div>
            
            <p>Nous avons hâte de vous accueillir dans notre restaurant !</p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              <strong>Le Seven</strong><br>
              7 Esplanade, 38000 Grenoble<br>
              📞 04 76 87 33 10<br>
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
        restaurant: emailRestaurant.id,
        client: emailClient.id
      }
    });
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
