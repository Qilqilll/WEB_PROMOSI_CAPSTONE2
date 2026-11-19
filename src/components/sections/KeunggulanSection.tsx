"use client";

import { useEffect, useRef } from "react";
import { Smartphone, ShieldCheck, Layers } from "lucide-react";

const keunggulan = [
  {
    number: "01",
    title: "Praktis di WhatsApp, Tanpa Perlu Install Aplikasi",
    description:
      "TaniPintar berjalan langsung di dalam aplikasi WhatsApp yang sudah familiar dan digunakan petani sehari-hari. Pengguna tidak perlu mengunduh aplikasi baru yang memberatkan memori HP atau mempelajari navigasi yang rumit, sehingga siap digunakan kapan saja dari lahan pertanian.",
    icon: Smartphone,
  },
  {
    number: "02",
    title: "Akurat, Aman, dan Tervalidasi Pakar",
    description:
      "Setiap jawaban dan langkah penanganan bersumber dari Knowledge Base yang disusun bersama Penyuluh Pertanian Lapangan (PPL). Sistem AI ini juga dilengkapi pengaman (guardrail) cerdas yang otomatis menolak menganalisis foto jika bukan tanaman cabai atau padi, mencegah terjadinya salah diagnosa.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Solusi Ekosistem Pertanian Lengkap dalam Satu Chat",
    description:
      "TaniPintar bukan sekadar bot tanya-jawab biasa, melainkan asisten serba bisa yang mengintegrasikan pendeteksian hama/penyakit, pemantauan harga pasar harian, panduan jam semprot bebas hujan, kalkulator dosis pupuk, hingga pengarsipan riwayat konsultasi dalam satu saluran WhatsApp.",
    icon: Layers,
  },
];

export default function KeunggulanSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            card.style.opacity = "1";
            card.style.transform = "translateX(0)";
          }
        });
      },
      { threshold: 0.15 }
    );

    cardsRef.current.forEach((card) => {
      if (card) {
        card.style.opacity = "0";
        card.style.transform = "translateX(-30px)";
        card.style.transition = "all 0.7s ease-out";
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="keunggulan" className="bg-[#2A4D24] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-14">
          <span className="inline-block bg-white/10 text-[#8BC34A] text-sm font-medium px-4 py-1.5 rounded-full mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Mengapa TaniPintar?
          </span>
          <h2
            className="text-white font-bold"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            }}
          >
            3 Keunggulan Utama TaniPintar Bot
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {keunggulan.map((item, idx) => (
            <div
              key={item.number}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="keunggulan-card rounded-3xl p-8 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              style={{ transitionDelay: `${idx * 0.15}s` }}
            >
              {/* Number watermark */}
              <div
                className="absolute -top-4 -right-2 text-[6rem] font-bold text-[#3D6B35]/10 leading-none select-none pointer-events-none"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {item.number}
              </div>

              <div className="w-12 h-12 rounded-2xl bg-[#2A4D24]/10 text-[#2A4D24] flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-[#2A4D24]" />
              </div>

              <h3
                className="text-[#2A4D24] font-bold text-xl leading-snug mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {item.title}
              </h3>

              <p
                className="text-tanipintar-muted text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {item.description}
              </p>

              {/* Bottom accent */}
              <div className="mt-6 h-1 w-12 bg-[#3D6B35] rounded-full group-hover:w-24 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
