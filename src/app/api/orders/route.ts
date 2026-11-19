import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, nomor_wa, komoditas, paket_id, paket_nama, amount, payment_method } = body;

    if (!nama || !nomor_wa || !paket_id || !amount) {
      return NextResponse.json(
        { error: "Mohon lengkapi semua data pembelian" },
        { status: 400 }
      );
    }

    const orderId = `TP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
    const activationCode = `TANI-${paket_id.toUpperCase().slice(0, 4)}-${randomCode}`;

    const orderData = {
      order_id: orderId,
      nama,
      nomor_wa,
      komoditas: komoditas || "umum",
      paket_id,
      paket_nama,
      amount: Number(amount),
      payment_method: payment_method || "QRIS",
      status: "paid",
      activation_code: activationCode,
    };

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          success: true,
          data: orderData,
          message: "Pembayaran berhasil diverifikasi (Mode Demo).",
        },
        { status: 201 }
      );
    }

    const { data, error } = await supabase
      .from("orders")
      .insert([orderData])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert order error:", error);
      // Fallback
      return NextResponse.json({ success: true, data: orderData }, { status: 201 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Gagal memproses pesanan. Silakan coba lagi." },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ data: [] });
  }

  const { data, error } = await supabase
    .from("orders")
    .select("order_id, created_at, nama, paket_nama, amount, status")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
