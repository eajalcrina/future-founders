import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const admin = getSupabaseAdmin();

  if (!admin) {
    // Supabase not configured — silently skip (Brevo still runs)
    return NextResponse.json({ success: true, skipped: true });
  }

  const { error } = await admin.from("quiz_leads").insert({
    first_name: body.firstName,
    last_name: body.lastName,
    email: body.email,
    phone: body.phone,
    country: body.country,
    years_experience: parseInt(body.yearsExperience) || 0,
    archetype: body.archetype,
    archetype_number: body.archetypeNumber,
    score: body.score,
    max_score: body.maxScore,
    situacion: body.situacion,
    disposicion_inversion: body.disposicionInversion,
    urgencia: body.urgencia,
  });

  if (error) {
    console.error("[quiz-lead] Supabase error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
