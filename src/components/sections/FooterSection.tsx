import Image from "next/image";
import { Heart, Sparkles, ShieldCheck, Mail } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="bg-[#1A2416] text-white pt-16 pb-8 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 border border-white/30 shrink-0">
              <Image
                src="/images/logo-tanipintar.jpg"
                alt="Logo TaniPintar Bot"
                width={38}
                height={38}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <p className="font-bold text-base leading-tight" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                TaniPintar Bot
              </p>
              <p className="text-white/50 text-[11px]">Asisten Cerdas Pertanian WhatsApp</p>
            </div>
          </div>
          <p className="text-white/70 text-xs leading-relaxed" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Solusi kecerdasan buatan terjangkau untuk mendeteksi hama & penyakit tanaman cabai dan padi secara instan langsung di aplikasi WhatsApp Anda.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-[11px] text-[#E8A317]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Paket Mulai Rp 49.000 / Musim Tanam</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-white" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Navigasi Cepat
          </h4>
          <ul className="space-y-2 text-xs text-white/70" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            <li><a href="#beranda" className="hover:text-white transition-colors">Beranda</a></li>
            <li><a href="#fitur" className="hover:text-white transition-colors">6 Fitur Utama</a></li>
            <li><a href="#keunggulan" className="hover:text-white transition-colors">Keunggulan Sistem</a></li>
            <li><a href="#cara-pakai" className="hover:text-white transition-colors">Cara Memulai</a></li>
            <li>
              <a href="#paket-harga" className="hover:text-[#E8A317] font-semibold text-white transition-colors flex items-center gap-1.5">
                <span>Paket Langganan & Harga</span>
                <span className="bg-[#E8A317] text-[#1A2416] text-[9px] font-bold px-1.5 py-0.2 rounded-full">Baru</span>
              </a>
            </li>
            <li><a href="#testimoni" className="hover:text-white transition-colors">Testimoni Petani</a></li>
          </ul>
        </div>

        {/* Komoditas Layanan */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-white" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Komoditas Fokus
          </h4>
          <ul className="space-y-2 text-xs text-white/70" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#E8A317] mt-1.5 shrink-0"></span><span><strong>Tanaman Cabai:</strong> Antraknosa (Patek), Virus Kuning Gemini, Layu Bakteri, Trips, Busuk Buah</span>
            </li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#E8A317] mt-1.5 shrink-0"></span><span><strong>Tanaman Padi:</strong> Wereng Cokelat, Blas Daun, Hawar Daun Bakteri (HDB), Penggerek Batang</span>
            </li>
          </ul>
        </div>

        {/* Keamanan & Dukungan */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-white" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Keamanan & Bantuan
          </h4>
          <p className="text-white/70 text-xs leading-relaxed mb-3" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Nomor bot privat resmi hanya diberikan kepada pelanggan aktif untuk menjamin performa server tercepat 24 jam.
          </p>
          <div className="space-y-2 text-xs text-white/60">
            <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-white/70" /> <span>Email:</span> <a href="mailto:support@tanipintar.id" className="text-white hover:underline">support@tanipintar.id</a></p>
            <p className="flex items-center gap-1 text-green-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verifikasi Pembayaran Otomatis QRIS</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
        <p style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          © 2026 TaniPintar Bot. Seluruh hak cipta dilindungi.
        </p>
        <p className="flex items-center gap-1" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          Dibuat dengan <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> untuk kemajuan petani Indonesia
        </p>
      </div>
    </footer>
  );
}
