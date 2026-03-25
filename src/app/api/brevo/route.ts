import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    firstName, lastName, email, phone, country, yearsExperience,
    archetype, archetypeNumber, score, maxScore,
    situacion, disposicionInversion, urgencia,
  } = body;

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Brevo API key not configured" }, { status: 500 });
  }

  const contact = {
    email,
    firstName,
    lastName,
    attributes: {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      SMS: phone,
      PAIS: country,
      ANIOS_EXPERIENCIA: yearsExperience,
      FF_ARQUETIPO: archetype,
      FF_ARQUETIPO_NUM: archetypeNumber,
      FF_SCORE: score,
      FF_SCORE_MAX: maxScore,
      FF_SITUACION: situacion,
      FF_DISPOSICION_INVERSION: disposicionInversion,
      FF_URGENCIA: urgencia,
      FF_QUIZ_DATE: new Date().toISOString().split("T")[0],
    },
    listIds: [2],
    updateEnabled: true,
  };

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (!res.ok) {
      const err = await res.json();
      if (res.status === 409) {
        const updateRes = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
          method: "PUT",
          headers: {
            "api-key": apiKey,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({ attributes: contact.attributes, listIds: contact.listIds }),
        });
        if (!updateRes.ok) {
          return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
        }
        return NextResponse.json({ success: true, action: "updated" });
      }
      return NextResponse.json({ error: err }, { status: res.status });
    }

    return NextResponse.json({ success: true, action: "created" });
  } catch {
    return NextResponse.json({ error: "Network error" }, { status: 500 });
  }
}
