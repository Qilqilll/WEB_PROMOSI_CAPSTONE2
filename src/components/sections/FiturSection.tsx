"use client";

import Image from "next/image";
import { Sparkles, MapPin, Sprout, ArrowRight } from "lucide-react";

const FITUR_ITEMS = [
  {
    number: "01",
    title: "Konsultasi Teks 11 Penyakit",
    description:
      "Diagnosis gejala tanaman cabai & padi via WhatsApp. Memberikan laporan ringkas: nama penyakit, patogen penyebab, serta 3 pilar penanganan praktis (mekanis, sanitasi, dan kimiawi terdaftar).",
    tags: ["Knowledge Base 11 Penyakit", "3 Pilar Solusi", "Respon < 5 Detik"],
    image: "/images/fitur/fitur-1.jpg",
    alt: "Konsultasi Teks Gejala Daun Cabai",
  },
  {
    number: "02",
    title: "Konsultasi Foto Multimodal AI",
    description:
      "Kirim foto daun, batang, atau buah sakit langsung dari kamera HP. Dianalisis dengan Gemini 1.5 Flash Vision. Dilengkapi sistem guardrail khusus cabai & padi (menolak aman jika bukan tanaman target).",
    tags: ["Gemini 1.5 Flash", "Guardrail Khusus Cabai/Padi", "Auto-Archive Storage"],
    image: "/images/fitur/fitur-2.jpg",
    alt: "Petani Mengambil Foto Tanaman Cabai dengan Smartphone",
  },
  {
    number: "03",
    title: "Harga Pasar Padi & Cabai",
    description:
      "Transparansi harga harian komoditas pangan acuan pasar lokal DIY & Magelang (Cabai Rawit Merah, Cabai Keriting, GKP, Beras Medium). Dilengkapi pembaruan otomatis dan REST API Admin Override.",
    tags: ["Fokus Pasar DIY & Magelang", "Pembaruan Harian", "REST API Admin"],
    image: "/images/fitur/fitur-3.jpg",
    alt: "Pantauan Harga Pasar Padi dan Cabai di Smartphone",
  },
  {
    number: "04",
    title: "Riwayat Konsultasi Petani",
    description:
      "Semua riwayat chat dan diagnosis tersimpan aman. Cukup ketik 'riwayat' di WhatsApp untuk memanggil histori rekam medik tanaman, perkembangan penanganan, dan status kunjungan PPL.",
    tags: ["Ketik 'riwayat' di WA", "Rekam Jejak Lahan", "Sinkronisasi PPL"],
    image: "/images/fitur/fitur-4.jpg",
    alt: "Tampilan Riwayat Konsultasi WhatsApp di Smartphone",
  },
  {
    number: "05",
    title: "Prediksi Cuaca & Jam Semprot",
    description:
      "Prakiraan cuaca mikro lokal terintegrasi Open-Meteo API. Dilengkapi Spray Advisory yang menentukan jam paling aman untuk menyemprot agar pupuk dan pestisida tidak luntur tercuci hujan.",
    tags: ["Open-Meteo API", "Spray Advisory", "Cegah Pemborosan Obat"],
    image: "/images/fitur/fitur-5.jpg",
    alt: "Cuaca Pertanian dan Langit Mendung di Sawah",
  },
  {
    number: "06",
    title: "Rekomendasi Nutrisi & Pupuk",
    description:
      "Kalkulator takaran dosis pupuk (Urea, NPK, SP-36, KCl, Silika) presisi per fase pertumbuhan (Vegetatif vs Generatif) dan pestisida pendamping berimbang untuk efisiensi biaya modal tani.",
    tags: ["Kalkulator Dosis Presisi", "Fase Vegetatif & Generatif", "Efisiensi Modal"],
    image: "/images/fitur/fitur-6.jpg",
    alt: "Rekomendasi Dosis Pupuk dan Nutrisi Tanaman",
  },
];

export default function FiturSection() {
  return (
    <section id="fitur" className="py-20 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#2A4D24]/10 text-[#2A4D24] text-xs font-bold px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E8A317]" />
            <span>KEMAMPUAN UTAMA ASISTEN AI</span>
          </div>

          <h2
            className="text-[#2A4D24] font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            6 Fitur Utama TaniPintar Bot
          </h2>

          <p className="text-[#5F6B58] text-sm sm:text-base" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Asisten WhatsApp cerdas yang mendampingi petani dari penyemaian, diagnosis hama, hingga pemantauan harga panen.
          </p>
        </div>

        {/* Scope and Limitation Banner (Ringkas & Tegas) */}
        <div className="max-w-4xl mx-auto mb-12 bg-[#FAF7F2] border border-[#2A4D24]/15 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#2A4D24] text-[#E8A317] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-gray-900 leading-tight">Cakupan Wilayah:</p>
                <p className="text-[#5F6B58] mt-0.5 leading-snug">
                  Sistem difokuskan untuk wilayah <strong>Daerah Istimewa Yogyakarta dan Magelang</strong>. Informasi harga pasar lokal tersedia untuk wilayah yang telah ditentukan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#2A4D24] text-green-400 flex items-center justify-center shrink-0">
                <Sprout className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-gray-900 leading-tight">Cakupan Komoditas:</p>
                <p className="text-[#5F6B58] mt-0.5 leading-snug">
                  Konsultasi diagnosis penyakit tanaman difokuskan pada <strong>cabai dan padi</strong>. Bot menolak berspekulasi jika foto di luar cabai & padi demi keamanan dosis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Feature Cards Grid (Ringkas, Padat, Visual Nyata) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FITUR_ITEMS.map((item, index) => (
            <div
              key={index}
              className="bg-[#FAF7F2] rounded-3xl overflow-hidden border border-[#2A4D24]/10 hover:border-[#2A4D24]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {/* Image Section */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Number Badge floating over image */}
                <div className="absolute top-3 left-3 bg-[#2A4D24]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                  Fitur {item.number}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-base sm:text-lg leading-tight drop-shadow-sm">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Tags / Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#2A4D24]/10">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="bg-white text-[#2A4D24] border border-[#2A4D24]/15 text-[10px] font-semibold px-2.5 py-1 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
