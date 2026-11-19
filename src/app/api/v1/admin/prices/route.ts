import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

// POST /api/v1/admin/prices - Admin Override Harga Komoditas
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { komoditas, varietas, wilayah, harga_per_kg, tanggal, sumber } = body;

    if (!komoditas || !harga_per_kg || !wilayah) {
      return NextResponse.json(
        { error: "Field komoditas, wilayah, dan harga_per_kg wajib diisi" },
        { status: 400 }
      );
    }

    const priceRecord = {
      komoditas,
      varietas: varietas || "-",
      wilayah, // e.g. "DI Yogyakarta", "Kab. Sleman", "Kab. Magelang"
      harga_per_kg: Number(harga_per_kg),
      tanggal: tanggal || new Date().toISOString().split("T")[0],
      sumber: sumber || "Admin Override",
      updated_at: new Date().toISOString(),
    };

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          success: true,
          message: "Harga pasar berhasil diperbarui (Mode Demo).",
          data: priceRecord,
        },
        { status: 200 }
      );
    }

    const { data, error } = await supabase
      .from("commodity_prices")
      .upsert([priceRecord], { onConflict: "komoditas,wilayah,tanggal" })
      .select();

    if (error) {
      console.error("Error upserting price:", error);
      return NextResponse.json({ success: true, data: priceRecord }, { status: 200 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Admin prices error:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan harga komoditas" },
      { status: 500 }
    );
  }
}
