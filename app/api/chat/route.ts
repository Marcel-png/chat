import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("🔹 Requête reçue sur /api/chat");

    const { message } = await req.json();
    console.log("📩 Message utilisateur :", message);

    if (!message) {
      return NextResponse.json(
        { reply: "Veuillez poser une question." },
        { status: 400 }
      );
    }

    const API_KEY = process.env.MISTRAL_API_KEY;
    if (!API_KEY) {
      console.error("⚠ Clé API absente !");
      return NextResponse.json(
        { reply: "Clé API manquante." },
        { status: 500 }
      );
    }

    console.log("🔄 Envoi de la requête à Mistral...");
    const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-tiny",
        messages: [{ role: "user", content: message }],
      }),
    });

    console.log("📩 Réponse API reçue. Statut :", res.status);

    if (!res.ok) {
      const errorData = await res.json();
      console.error("❌ Erreur API Mistral :", errorData);
      return NextResponse.json(
        {
          reply: `Erreur API : ${
            errorData.error?.message || "Réponse invalide."
          }`,
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log("✅ Réponse Mistral :", data);

    return NextResponse.json({
      reply: data.choices?.[0]?.message?.content || "Réponse non disponible.",
    });
  } catch (error) {
    console.error("🚨 Erreur serveur :", error);
    return NextResponse.json(
      { reply: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
