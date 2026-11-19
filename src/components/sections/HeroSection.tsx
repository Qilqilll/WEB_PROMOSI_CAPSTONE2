"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, CheckCircle2, ShieldCheck, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onOpenPricing?: () => void;
}

export default function HeroSection({ onOpenPricing }: HeroSectionProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    setTimeout(() => {
      el.style.transition = "all 0.8s ease-out";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
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

  const handleScrollToFeatures = () => {
    const el = document.getElementById("fitur");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="beranda" className="min-h-screen pt-16 grid grid-cols-1 lg:grid-cols-12 bg-[#2A4D24]">
      {/* Left Column - 7 Cols */}
      <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 lg:py-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-2xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#E8A317]/10 translate-x-1/3 translate-y-1/3 pointer-events-none blur-3xl" />

        <div ref={textRef} className="relative z-10 max-w-2xl">
          {/* Logo Brand Header & Scope Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shrink-0 flex items-center justify-center shadow-md">
                <Image
                  src="/images/logo-tanipintar.jpg"
                  alt="Logo TaniPintar Bot"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h2 className="text-white font-bold text-sm tracking-wide leading-none" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  TaniPintar Bot
                </h2>
                <p className="text-[#E8A317] text-[11px] font-medium mt-0.5">
                  WhatsApp AI Support Agent with RAG & Memory
                </p>
              </div>
            </div>

            {/* Scope Pill */}
            <div className="inline-flex items-center gap-1.5 bg-[#E8A317]/15 border border-[#E8A317]/30 px-3.5 py-1.5 rounded-xl text-[11px] text-[#E8A317] font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Khusus DIY & Magelang • Cabai & Padi</span>
            </div>
          </div>

          {/* Headline Utama dari Referensi Poster */}
          <h1
            className="text-white font-bold leading-[1.15] mb-6"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.1rem, 4.2vw, 3.6rem)",
            }}
          >
            Tanaman cabai atau padi Anda tiba-tiba layu dan daunnya menguning?
          </h1>

          {/* Subdeskripsi */}
          <p
            className="text-white/80 text-base sm:text-lg leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Asisten cerdas berbasis WhatsApp untuk skrining hama & penyakit (khusus 11 penyakit utama cabai & padi), transparansi harga komoditas pangan lokal DIY-Magelang, prediksi cuaca pertanian, dan rekomendasi nutrisi presisi.
          </p>

          {/* CTA & Pricing Highlight */}
          <div className="space-y-4 mb-10">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a href="#paket-harga" onClick={handleCtaClick} className="inline-flex">
                <Button
                  type="button"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-8 py-6 rounded-2xl text-base shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3 border border-white/20 cursor-pointer"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Beli Akses Bot WhatsApp</span>
                  <span className="bg-[#1A2416]/20 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    Mulai Rp 49rb
                  </span>
                </Button>
              </a>

              <Button
                variant="outline"
                onClick={handleScrollToFeatures}
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-6 py-6 rounded-2xl text-sm font-semibold transition-all duration-200"
              >
                Pelajari 6 Fitur Utama
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                <span>Tanpa instal aplikasi baru</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                <span>Langsung aktif di WhatsApp Anda</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E8A317]" />
                <span>Multimodal Vision (Gemini 1.5 Flash)</span>
              </div>
            </div>
          </div>

          {/* Social Proof Stats */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E8A317]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                11
              </div>
              <p className="text-xs text-white/60 mt-0.5">Penyakit Cabai & Padi Dikenali</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E8A317]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                &lt; 5 Detik
              </div>
              <p className="text-xs text-white/60 mt-0.5">Kecepatan Diagnosa AI</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E8A317]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                DIY & Mgl
              </div>
              <p className="text-xs text-white/60 mt-0.5">Fokus Sentra Pertanian</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 text-white/40">
          <span className="text-[10px] uppercase tracking-wider">Scroll ke bawah</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>

      {/* Right Column - 5 Cols (Real WhatsApp Screenshot Display) */}
      <div className="lg:col-span-5 bg-[#1F3A1A] p-6 sm:p-10 lg:p-12 flex flex-col items-center justify-center relative overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(61,107,53,0.4)_0%,rgba(26,36,22,0.95)_100%)] pointer-events-none" />

        <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
          {/* Header pill */}
          <div className="inline-flex items-center gap-2 bg-[#2A4D24] text-white text-xs font-semibold px-4 py-1.5 rounded-full border border-white/20 shadow-lg mb-6">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span>Bukti Nyata Konsultasi Lapangan</span>
          </div>

          {/* Smartphone Frame with REAL WhatsApp Screenshot */}
          <div className="relative group">
            <div className="w-[280px] sm:w-[320px] bg-[#121B10] rounded-[3rem] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-4 border-gray-700/80 ring-1 ring-white/10 relative transition-transform duration-300 group-hover:scale-[1.01]">
              {/* Speaker / Camera Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-900 border border-gray-700" />
              </div>

              {/* Screen Area containing the user's real WhatsApp screenshot */}
              <div className="rounded-[2.4rem] overflow-hidden bg-black relative aspect-[9/19.5] shadow-inner">
                <Image
                  src="/images/whatsapp-screenshot.jpg"
                  alt="Bukti Screenshot Percakapan WhatsApp TaniPintar Bot"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 280px, 320px"
                  priority
                />
              </div>
            </div>

            {/* Floating Highlight Badge 1 - Gemini Yellow Virus */}
            <div className="absolute -left-6 top-1/3 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-gray-200 hidden sm:flex items-center gap-2.5 animate-bounce-slow">
              <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
                92%
              </div>
              <div className="text-left" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                <p className="text-[10px] text-gray-500 leading-tight">Terdeteksi Akurat</p>
                <p className="text-xs font-bold text-gray-900 leading-tight">Virus Kuning Gemini</p>
              </div>
            </div>

            {/* Floating Highlight Badge 2 - Respon Cepat */}
            <div className="absolute -right-6 bottom-16 bg-[#25D366] text-white rounded-2xl px-3.5 py-2.5 shadow-xl border border-white/30 hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white" />
              <div className="text-left" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                <p className="text-[10px] text-white/80 leading-none">Respon Bot AI</p>
                <p className="text-xs font-bold text-white leading-tight">Dalam &lt; 5 Detik</p>
              </div>
            </div>
          </div>

          <p className="text-white/60 text-xs text-center mt-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            *Tampilan asli aplikasi WhatsApp saat mendeteksi tanaman cabai terserang Begomovirus.
          </p>
        </div>
      </div>
    </section>
  );
}
