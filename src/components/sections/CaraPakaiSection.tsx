"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2, ArrowRight, CreditCard, Camera, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const langkah = [
  {
    icon: CreditCard,
    number: "01",
    title: "Pilih Paket & Selesaikan Pembayaran",
    description:
      "Pilih paket langganan (1 Musim / 1 Tahun) yang sesuai kebutuhan Anda. Lakukan pembayaran instan via QRIS atau Transfer Bank untuk membuka kunci nomor resmi WhatsApp dan token aktivasi unik Anda.",
    highlight: "Nomor resmi langsung terbuka seketika",
  },
  {
    icon: Camera,
    number: "02",
    title: "Kirim Foto Tanaman atau Ketik Gejala",
    description:
      "Simpan nomor bot ke kontak WhatsApp Anda. Saat tanaman cabai atau padi Anda menunjukkan gejala sakit, cukup foto bagian yang layu atau ketik keluhan Anda di chat.",
    highlight: "Foto dari kamera HP langsung di sawah",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Dapatkan Diagnosis & 3 Solusi Praktis",
    description:
      "Dalam waktu kurang dari 5 detik, TaniPintar Bot akan mengirimkan laporan analisis: nama penyakit, penyebab, tingkat keyakinan, serta 3 langkah penanganan tepat dosis agar panen terselamatkan.",
    highlight: "Rekomendasi ramah lingkungan & hemat biaya",
  },
];

interface CaraPakaiSectionProps {
  onOpenPricing?: () => void;
}

export default function CaraPakaiSection({ onOpenPricing }: CaraPakaiSectionProps) {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = cardsRef.current?.querySelectorAll(".cara-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleCtaClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById("paket-harga");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (onOpenPricing) {
      onOpenPricing();
    }
  };

  return (
    <section id="cara-pakai" className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2A4D24]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#3D6B35] font-semibold text-xs uppercase tracking-widest bg-[#3D6B35]/10 px-4 py-1.5 rounded-full">
            Alur Penggunaan Mudah
          </span>
          <h2
            className="text-[#2A4D24] font-bold text-3xl sm:text-4xl lg:text-5xl mt-3 mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            3 Langkah Memulai Konsultasi
          </h2>
          <p className="text-[#5F6B58] text-base" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Tanpa perlu mengunduh aplikasi berat. Semua interaksi berjalan langsung di WhatsApp yang sudah Anda gunakan sehari-hari.
          </p>
        </div>

        {/* Steps Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {langkah.map((item) => (
            <div
              key={item.number}
              className="cara-card relative bg-[#FAF7F2] rounded-3xl p-8 border border-[#2A4D24]/10 hover:border-[#3D6B35]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              <div>
                {/* Step number badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#2A4D24]/10 text-[#2A4D24] flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-[#2A4D24]" />
                  </div>
                  <span
                    className="text-4xl font-black text-[#2A4D24]/20 font-mono"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {item.number}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-[#2A4D24] mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[#5F6B58] text-xs sm:text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#3D6B35] pt-4 border-t border-[#2A4D24]/10">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner CTA */}
        <div className="mt-14 bg-gradient-to-r from-[#2A4D24] to-[#3D6B35] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
              Siap Menyelamatkan Tanaman & Maksimalkan Panen?
            </h3>
            <p className="text-white/80 text-xs sm:text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              Daftar sekarang mulai Rp 49.000 untuk 1 musim penuh pendampingan AI 24 jam.
            </p>
          </div>

          <a
            href="#paket-harga"
            onClick={handleCtaClick}
            className="inline-flex"
          >
            <Button
              type="button"
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-8 py-6 rounded-2xl text-sm shrink-0 shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span>Pilih Paket Langganan</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
