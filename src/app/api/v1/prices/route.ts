import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

// GET /api/v1/prices - Ambil Harga Komoditas DIY & Magelang
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const wilayah = searchParams.get("wilayah"); // "DIY" | "Magelang" | all

  const defaultPrices = [
    {
      komoditas: "Cabai Rawit Merah",
      varietas: "Ori 212 / Asmoro",
      wilayah: "DI Yogyakarta (Pasar Beringharjo & Prambanan)",
      harga_per_kg: 58000,
      perubahan: "+2.500",
      tanggal: new Date().toISOString().split("T")[0],
      status: "naik",
    },
    {
      komoditas: "Cabai Merah Keriting",
      varietas: "TM 99 / Kastilo",
      wilayah: "Kab. Magelang (Pasar Agrobisnis Sewukan)",
      harga_per_kg: 42000,
      perubahan: "-1.000",
      tanggal: new Date().toISOString().split("T")[0],
      status: "turun",
    },
    {
      komoditas: "Gabah Kering Panen (GKP)",
      varietas: "Ciherang / Inpari 32",
      wilayah: "DI Yogyakarta (Sleman & Bantul)",
      harga_per_kg: 7200,
      perubahan: "0",
      tanggal: new Date().toISOString().split("T")[0],
      status: "stabil",
    },
    {
      komoditas: "Beras Medium",
      varietas: "C4 / IR 64",
      wilayah: "Kab. Magelang (Muntilan & Secang)",
      harga_per_kg: 13500,
      perubahan: "+200",
      tanggal: new Date().toISOString().split("T")[0],
      status: "naik",
    },
  ];

  if (!isSupabaseConfigured()) {
    const filtered = wilayah
      ? defaultPrices.filter((p) => p.wilayah.toLowerCase().includes(wilayah.toLowerCase()))
      : defaultPrices;
    return NextResponse.json({ success: true, data: filtered });
  }

  const query = supabase
    .from("commodity_prices")
    .select("*")
    .order("tanggal", { ascending: false })
    .limit(20);

  if (wilayah) {
    query.ilike("wilayah", `%${wilayah}%`);
  }

  const { data, error } = await query;
  if (error || !data || data.length === 0) {
    return NextResponse.json({ success: true, data: defaultPrices });
  }

  return NextResponse.json({ success: true, data });
}
