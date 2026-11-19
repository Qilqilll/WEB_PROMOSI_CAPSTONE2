import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ data: [] });
  }

  const { data, error } = await supabase
    .from("testimoni")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, lokasi, komoditas, rating, komentar } = body;

    if (!nama || !lokasi || !komoditas || !rating || !komentar) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          success: true,
          data: [
            {
              id: Date.now(),
              nama,
              lokasi,
              komoditas,
              rating: Number(rating),
              komentar,
              is_approved: true,
              created_at: new Date().toISOString(),
            },
          ],
          message: "Testimoni diterima.",
        },
        { status: 201 }
      );
    }

    const { data, error } = await supabase
      .from("testimoni")
      .insert([
        {
          nama,
          lokasi,
          komoditas,
          rating: Number(rating),
          komentar,
          is_approved: true,
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(
      {
        success: true,
        data,
        message: "Testimoni berhasil dikirim dan ditampilkan.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving testimoni:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan testimoni. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
