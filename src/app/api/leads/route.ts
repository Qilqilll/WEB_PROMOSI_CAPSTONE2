import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, nomor_wa, komoditas, lokasi, pesan } = body;

    if (!nama || !nomor_wa || !komoditas || !lokasi) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          success: true,
          data: [{ id: Date.now(), nama, nomor_wa, komoditas, lokasi, pesan }],
          message: "Data diterima (Mode demo / Supabase belum dihubungkan).",
        },
        { status: 201 }
      );
    }

    const { data, error } = await supabase
      .from("leads")
      .insert([{ nama, nomor_wa, komoditas, lokasi, pesan }])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan data. Silakan coba lagi." },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ data: [] });
  }

  const { data, error } = await supabase
    .from("leads")
    .select("id, created_at, nama, komoditas, lokasi")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
