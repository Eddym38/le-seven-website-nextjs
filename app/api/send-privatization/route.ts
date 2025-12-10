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

    // Envoi de l'email au restaurant
    const emailRestaurant = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@leseven-grenoble.fr",
      to: process.env.RESEND_TO_EMAIL || "restaurantleseven38@gmail.com",
      subject: `Demande de privatisation - ${eventType} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF6EF;">
          <div style="background-color: #F7C8C8; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-family: 'Pacifico', cursive;">Le Seven</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Demande de privatisation</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #F7C8C8; margin-top: 0;">🎉 Nouvelle demande d'événement</h2>
            
            <div style="background-color: #FFF3E0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF9800;">
              <p style="margin: 10px 0; font-size: 18px;"><strong style="color: #FF9800;">🎉 Type d'événement :</strong> <span style="font-weight: bold;">${eventType}</span></p>
            </div>

            <div style="background-color: #FAF6EF; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #92C6C4;">
              <p style="margin: 10px 0;"><strong style="color: #92C6C4;">👤 Client :</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong style="color: #92C6C4;">📧 Email :</strong> <a href="mailto:${email}" style="color: #4C4C4C;">${email}</a></p>
              <p style="margin: 10px 0;"><strong style="color: #92C6C4;">📞 Téléphone :</strong> <a href="tel:${phone}" style="color: #4C4C4C;">${phone}</a></p>
            </div>

            <div style="background-color: #F7C8C8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F7C8C8;">
              <p style="margin: 10px 0;"><strong style="color: #4C4C4C;">📅 Date souhaitée :</strong> ${new Date(
                date
              ).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</p>
              <p style="margin: 10px 0;"><strong style="color: #4C4C4C;">👥 Nombre de personnes :</strong> <span style="font-size: 18px; font-weight: bold;">${guests}</span></p>
            </div>
            
            ${
              message
                ? `
            <div style="background-color: #E3F2FD; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196F3;">
              <p style="margin: 0 0 10px 0;"><strong style="color: #2196F3;">💬 Message du client :</strong></p>
              <p style="margin: 0; color: #4C4C4C; font-style: italic; line-height: 1.6;">"${message}"</p>
            </div>
            `
                : ""
            }
            
            <div style="background-color: #FFF9C4; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center; border-left: 4px solid #FBC02D;">
              <p style="margin: 0; color: #F57C00; font-size: 14px;">
                ⚠️ <strong>Action requise : Contacter le client pour discuter des détails</strong>
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
      subject: "Confirmation de votre demande de privatisation - Le Seven",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF6EF;">
          <div style="background-color: #92C6C4; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-family: 'Pacifico', cursive;">Le Seven</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #92C6C4; margin-top: 0;">Demande de privatisation bien reçue !</h2>
            
            <p>Bonjour ${name},</p>
            
            <p>Nous avons bien reçu votre demande de privatisation pour :</p>
            
            <div style="background-color: #FAF6EF; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>🎉 Type d'événement :</strong> ${eventType}</p>
              <p style="margin: 5px 0;"><strong>📅 Date souhaitée :</strong> ${new Date(
                date
              ).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</p>
              <p style="margin: 5px 0;"><strong>👥 Nombre de personnes :</strong> ${guests}</p>
              ${
                message
                  ? `<p style="margin: 5px 0;"><strong>💬 Votre message :</strong> ${message}</p>`
                  : ""
              }
            </div>
            
            <p>Notre équipe va étudier votre demande et vous contactera dans les plus brefs délais pour discuter des détails et vous proposer une offre personnalisée.</p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              <strong>Le Seven</strong><br>
              2 Bd de l'Esplanade, 38000 Grenoble<br>
              📞 +33 9 53 46 81 28<br>
              📧 restaurantleseven38@gmail.com
            </p>
            
            <p style="color: #999; font-size: 12px; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
              Pour toute question, n'hésitez pas à nous contacter directement.
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
