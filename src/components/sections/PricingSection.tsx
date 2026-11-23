"use client";

import { Check, Sparkles, ShieldCheck, ArrowRight, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingPlan } from "@/components/PaymentModal";

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export const PRICING_PLANS: (PricingPlan & {
  features: string[];
  notIncluded?: string[];
  isPopular?: boolean;
})[] = [
  {
    id: "musim",
    name: "Paket 1 Musim Tanam",
    price: 49000,
    originalPrice: 99000,
    period: "3 Bulan Penuh",
    badge: "Hemat 1x Siklus Panen",
    description: "Pilihan pas untuk petani mandiri yang sedang menggarap 1 siklus tanam cabai atau padi (wilayah DIY & Magelang).",
    features: [
      "1 Nomor WhatsApp Terdaftar & Terverifikasi",
      "Konsultasi Foto Penyakit Cabai & Padi Unlimited",
      "Skrining 11 Penyakit Utama Cabai & Padi (RAG Engine)",
      "Structured Output: Nama, Patogen, & 3 Pilar Penanganan",
      "Kalkulator Dosis Pupuk & Pestisida Presisi (Kementan)",
      "Pembaruan Harga Pasar Harian Cabai & Gabah DIY-Magelang",
      "Penyimpanan Riwayat Konsultasi (Ketik 'riwayat')",
    ],
    notIncluded: [
      "Spray Advisory & Prediksi Cuaca Mikro Desa",
      "Prioritas Jalur Server Cepat",
      "Multi-Nomor WhatsApp Kelompok Tani",
    ],
  },
  {
    id: "sukses",
    name: "Paket Petani Sukses",
    price: 149000,
    originalPrice: 299000,
    period: "1 Tahun (4 Musim Tanam)",
    badge: "PALING POPULER • HEMAT 50%",
    isPopular: true,
    description: "Solusi terlengkap & paling hemat! Hanya ~Rp 12.000/bulan untuk pendampingan budidaya cabai & padi sepanjang tahun.",
    features: [
      "Semua Fasilitas Paket 1 Musim Tanam",
      "Akses Penuh 1 Tahun (365 Hari Non-Stop)",
      "Spray Advisory (Panduan Jam Semprot Aman Cuaca)",
      "Prakiraan Cuaca Mikro Terintegrasi Open-Meteo API",
      "Prioritas Jalur Server Cepat (< 2 Detik)",
      "Download Rekap Laporan Kesehatan Tanaman (PDF)",
      "Sertifikat Rekomendasi Pemupukan Presisi",
      "Pembaruan Otomatis Database Hama Baru",
      "Dukungan Konsultasi Kasus Rumit Tim Agronom",
    ],
  },
  {
    id: "gapoktan",
    name: "Paket Kelompok Tani",
    price: 499000,
    originalPrice: 999000,
    period: "1 Tahun (Multi-User)",
    badge: "Solusi Gapoktan & Desa",
    description: "Didesain untuk Kelompok Tani (Poktan), Gapoktan, Koperasi Tani, atau Dinas Pertanian Desa di DIY & Magelang.",
    features: [
      "Akses hingga 25 Nomor WhatsApp Petani Sekaligus",
      "Semua Fitur Unggulan Paket Petani Sukses",
      "Dashboard Monitoring Sebaran Hama Wilayah Desa",
      "Grup WhatsApp Pendampingan Eksklusif bersama Pakar",
      "1x Sesi Pelatihan Online Manajemen Hama & Pupuk",
      "Customer Support VIP Prioritas 24 Jam",
      "Laporan Kesehatan Lahan Terpadu Tiap Bulan",
    ],
  },
];

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <section id="paket-harga" className="py-24 px-4 bg-[#FAF7F2] relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#3D6B35]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#2A4D24]/10 text-[#2A4D24] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#E8A317]" />
            <span>INVESTASI CERDAS UNTUK HASIL PANEN MAKSIMAL</span>
          </div>

          <h2
            className="text-[#1A2416] font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Pilihan Paket Lisensi Resmi TaniPintar Bot
          </h2>

          <p className="text-[#5F6B58] text-base sm:text-lg" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Nomor WhatsApp Bot bersifat eksklusif untuk menjaga kualitas diagnosis AI dan kecepatan respon server. Pilih durasi langganan yang paling pas untuk lahan Anda.
          </p>
        </div>

        {/* Batasan Sistem Callout */}
        <div className="max-w-4xl mx-auto mb-14 bg-white rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Cakupan Wilayah & Komoditas:</p>
              <p className="text-gray-600">
                Sistem difokuskan untuk wilayah <strong>Daerah Istimewa Yogyakarta dan Magelang</strong>, serta komoditas <strong>cabai dan padi</strong>.
              </p>
            </div>
          </div>
          <span className="shrink-0 bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-[11px]">
            Server Siaga 24 Jam
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.isPopular
                    ? "bg-white border-2 border-[#2A4D24] shadow-2xl scale-[1.02] ring-4 ring-[#2A4D24]/10"
                    : "bg-white/90 border border-gray-200/80 shadow-md hover:shadow-xl hover:-translate-y-1"
                }`}
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {/* Popular Pill */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`text-xs font-bold px-4 py-1 rounded-full shadow-md ${
                        plan.isPopular
                          ? "bg-[#E8A317] text-[#1A2416]"
                          : "bg-[#2A4D24] text-white"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Title & Desc */}
                  <div className="border-b border-gray-100 pb-6 mb-6">
                    <h3 className="text-xl font-bold text-[#1A2416] mb-2">{plan.name}</h3>
                    <p className="text-xs text-[#5F6B58] leading-relaxed min-h-[40px]">
                      {plan.description}
                    </p>

                    {/* Price Tag */}
                    <div className="mt-6 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#2A4D24]">
                        {formatRupiah(plan.price)}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {formatRupiah(plan.originalPrice)}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#3D6B35] mt-1">
                      Masa aktif: <strong>{plan.period}</strong>
                    </p>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#2A4D24]">
                      Fasilitas yang Didapatkan:
                    </p>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                        <div className="w-4 h-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}

                    {plan.notIncluded && plan.notIncluded.length > 0 && (
                      <div className="pt-2 space-y-2 opacity-50">
                        {plan.notIncluded.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-gray-400">
                            <div className="w-4 h-4 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0 mt-0.5">
                              <X className="w-2.5 h-2.5 stroke-[2.5]" />
                            </div>
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <div>
                  <Button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-6 rounded-2xl font-bold text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 ${
                      plan.isPopular
                        ? "bg-[#2A4D24] hover:bg-[#3D6B35] text-white hover:scale-[1.02]"
                        : "bg-[#FAF7F2] hover:bg-[#2A4D24] text-[#2A4D24] hover:text-white border border-[#2A4D24]/30"
                    }`}
                  >
                    <span>Dapatkan Nomor Bot ({formatRupiah(plan.price)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <p className="text-[11px] text-center text-gray-400 mt-2">
                    Aktivasi instan via QRIS / Bank Transfer
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Support Trust Strip */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1A2416]">
                Garansi 100% Pembayaran Aman & Aktivasi Instan
              </h4>
              <p className="text-xs text-[#5F6B58] mt-0.5">
                Begitu pembayaran diverifikasi, nomor WhatsApp resmi bot dan kode aktivasi unik Anda akan langsung ditampilkan dan siap digunakan 24/7.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <p className="text-xs font-semibold text-gray-500">Butuh Bantuan Memilih?</p>
              <p className="text-xs font-bold text-[#2A4D24]">Hubungi Layanan Bantuan Kami</p>
            </div>
            <a
              href="mailto:support@tanipintar.id"
              className="bg-[#FAF7F2] hover:bg-gray-100 text-[#2A4D24] border border-gray-200 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              Tanya Admin
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
