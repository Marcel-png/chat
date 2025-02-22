import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Veuillez poser une question." }, { status: 400 });
    }

    const API_KEY = process.env.MISTRAL_API_KEY;
    if (!API_KEY) {
      return NextResponse.json({ reply: "Clé API manquante." }, { status: 500 });
    }

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

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ reply: `Erreur API Mistral : ${errorData.error?.message}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ reply: data.choices[0]?.message?.content || "Réponse non disponible." });

  } catch (error) {
    console.error("Erreur serveur :", error);
    return NextResponse.json({ reply: "Erreur de connexion. Veuillez vérifier votre connexion internet." }, { status: 500 });
  }
}
