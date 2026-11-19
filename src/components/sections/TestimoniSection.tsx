"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { Star, Plus, Loader2, Send, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export type Testimoni = {
  id: number;
  nama: string;
  lokasi: string;
  komoditas: string;
  rating: number;
  komentar: string;
  created_at: string;
  isNew?: boolean;
};

// 20 Testimoni Petani Indonesia (4 baris x 5 rating kesamping)
const defaultTestimoni: Testimoni[] = [
  // Baris 1 (5 ulasan pertama yang langsung tampil)
  {
    id: 1,
    nama: "Pak Slamet Riyadi",
    lokasi: "Kab. Blitar, Jatim",
    komoditas: "cabai",
    rating: 5,
    komentar: "Tanaman cabai terserang virus kuning langsung difoto dan bot kasih solusi obat dan dosisnya tepat. Sangat membantu!",
    created_at: "2024-10-01",
  },
  {
    id: 2,
    nama: "Bu Sari Dewi",
    lokasi: "Kab. Majalengka, Jabar",
    komoditas: "padi",
    rating: 5,
    komentar: "Fitur jam semprot & prediksi cuaca bikin hemat pestisida, dulu sering boncos karena nyemprot saat mau hujan.",
    created_at: "2024-10-05",
  },
  {
    id: 3,
    nama: "Mas Hendra Kurnia",
    lokasi: "Kab. Boyolali, Jateng",
    komoditas: "keduanya",
    rating: 5,
    komentar: "Praktis lewat WhatsApp tanpa aplikasi tambahan. Update harga pasar harian sangat membantu waktu panen tiba.",
    created_at: "2024-10-10",
  },
  {
    id: 4,
    nama: "Pak Ahmad Fauzi",
    lokasi: "Kab. Nganjuk, Jatim",
    komoditas: "cabai",
    rating: 5,
    komentar: "Kalkulator pupuk presisi sekali sesuai standar Kementan, pemakaian pupuk hemat 30% dan tanaman cabai lebih lebat.",
    created_at: "2024-10-15",
  },
  {
    id: 5,
    nama: "Bu Ratna Wulandari",
    lokasi: "Lombok Tengah, NTB",
    komoditas: "padi",
    rating: 5,
    komentar: "Riwayat konsultasi tersimpan rapi di WA. Bisa cek penanganan penyakit blas daun kapan saja tanpa ribet.",
    created_at: "2024-10-20",
  },

  // Baris 2 (5 ulasan kedua yang langsung tampil)
  {
    id: 6,
    nama: "Pak Joko Susilo",
    lokasi: "Kab. Malang, Jatim",
    komoditas: "cabai",
    rating: 5,
    komentar: "Deteksi jamur antraknosa cabai cepat banget kurang dari 5 detik. Obat yang disarankan gampang dibeli di kios tani.",
    created_at: "2024-10-25",
  },
  {
    id: 7,
    nama: "Pak Bambang Hermanto",
    lokasi: "Kab. Magelang, Jateng",
    komoditas: "cabai",
    rating: 5,
    komentar: "Harga pasar cabai rawit Magelang sangat akurat, saya jadi tidak gampang ditawar murah oleh tengkulak nakal.",
    created_at: "2024-10-28",
  },
  {
    id: 8,
    nama: "Bu Siti Aminah",
    lokasi: "Kab. Sleman, DIY",
    komoditas: "padi",
    rating: 5,
    komentar: "Konsultasi jam semprot jam 6 pagi cocok sekali, padi kami bebas hama wereng batang coklat di musim tanam ini.",
    created_at: "2024-11-01",
  },
  {
    id: 9,
    nama: "Mas Wahyu Prasetyo",
    lokasi: "Kulon Progo, DIY",
    komoditas: "cabai",
    rating: 5,
    komentar: "Pelayanan bot 24 jam nonstop sangat responsif. Kirim foto tengah malam langsung dapat analisa dan arahan tindakan.",
    created_at: "2024-11-05",
  },
  {
    id: 10,
    nama: "Pak Sugeng Priyono",
    lokasi: "Kab. Bantul, DIY",
    komoditas: "padi",
    rating: 5,
    komentar: "Sangat cocok untuk kelompok tani. Kami pakai paket 1 tahun dan biaya sangat murah cuma belasan ribu per bulan.",
    created_at: "2024-11-10",
  },

  // Baris 3 (Akan muncul ketika digulir ke bawah)
  {
    id: 11,
    nama: "Pak Dedi Supriyadi",
    lokasi: "Kab. Garut, Jabar",
    komoditas: "cabai",
    rating: 5,
    komentar: "Tanaman cabai keriting saya terselamatkan dari layu fusarium. Penjelasan cara penanganan 3 pilar sangat jelas.",
    created_at: "2024-11-12",
  },
  {
    id: 12,
    nama: "Bu Sri Mulyani",
    lokasi: "Kab. Klaten, Jateng",
    komoditas: "padi",
    rating: 5,
    komentar: "Sangat puas dengan fitur ramalan cuaca mikro tingkat desa. Prediksi hujan akurat memandu jadwal pemupukan.",
    created_at: "2024-11-15",
  },
  {
    id: 13,
    nama: "Mas Arif Wicaksono",
    lokasi: "Kab. Temanggung, Jateng",
    komoditas: "cabai",
    rating: 5,
    komentar: "Cabai rawit merah di lahan lereng gunung tumbuh subur. Rekomendasi nutrisi kalsium dan boron pas dosisnya.",
    created_at: "2024-11-18",
  },
  {
    id: 14,
    nama: "Pak Herman Santoso",
    lokasi: "Kab. Subang, Jabar",
    komoditas: "padi",
    rating: 5,
    komentar: "Lumbung padi Subang kami terbantu deteksi hawar daun bakteri. Panen musim ini naik hampir 1,5 ton per hektar.",
    created_at: "2024-11-20",
  },
  {
    id: 15,
    nama: "Pak Wayan Sudirga",
    lokasi: "Kab. Tabanan, Bali",
    komoditas: "padi",
    rating: 5,
    komentar: "Sistem subak kami memadukan cara tradisional dengan bot TaniPintar. Petani muda makin semangat menggarap sawah.",
    created_at: "2024-11-22",
  },

  // Baris 4 (Akan muncul ketika digulir lebih jauh ke bawah)
  {
    id: 16,
    nama: "Bu Nurul Hidayah",
    lokasi: "Banyuwangi, Jatim",
    komoditas: "cabai",
    rating: 5,
    komentar: "Hama thrips dan kutu kebul cabai langsung terkendali. Solusi pestisida nabatinya sangat aman untuk lingkungan.",
    created_at: "2024-11-25",
  },
  {
    id: 17,
    nama: "Mas Rian Pratama",
    lokasi: "Wonosobo, Jateng",
    komoditas: "cabai",
    rating: 5,
    komentar: "Bot-nya cerdas membedakan bercak daun cercospora dengan embun tepung. Benar-benar seperti ada penyuluh pertanian 24 jam.",
    created_at: "2024-11-28",
  },
  {
    id: 18,
    nama: "Pak Agus Salim",
    lokasi: "Kab. Demak, Jateng",
    komoditas: "padi",
    rating: 5,
    komentar: "Padi Ciherang kami bebas busuk batang. Dosis fungisida yang dianjurkan pas dan tidak membuat tanaman stres.",
    created_at: "2024-12-01",
  },
  {
    id: 19,
    nama: "Bu Endang Sulastri",
    lokasi: "Gunungkidul, DIY",
    komoditas: "keduanya",
    rating: 5,
    komentar: "Lahan tadah hujan butuh perhitungan cuaca yang pas. TaniPintar Bot jadi teman andalan kami setiap pagi di gubuk.",
    created_at: "2024-12-05",
  },
  {
    id: 20,
    nama: "Pak Muhsin Alatas",
    lokasi: "Kab. Brebes, Jateng",
    komoditas: "cabai",
    rating: 5,
    komentar: "Pencegahan lalat buah cabai sangat jitu pakai perangkap metil eugenol rekomendasi bot. Hasil panen mulus tanpa belatung.",
    created_at: "2024-12-10",
  },
];

export default function TestimoniSection() {
  const [testimoni, setTestimoni] = useState<Testimoni[]>(defaultTestimoni);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [newlyAddedId, setNewlyAddedId] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    nama: "",
    lokasi: "",
    komoditas: "",
    rating: 5,
    komentar: "",
  });

  // Load ulasan lokal (localStorage) & API pada saat komponen dimuat
  useEffect(() => {
    let localItems: Testimoni[] = [];
    try {
      const saved = localStorage.getItem("tanipintar_local_testimoni");
      if (saved) {
        localItems = JSON.parse(saved);
      }
    } catch {
      // ignore
    }

    fetch("/api/testimoni")
      .then((r) => r.json())
      .then((d) => {
        if (d.data && d.data.length > 0) {
          const apiIds = new Set(d.data.map((item: Testimoni) => item.id));
          const unmergedLocal = localItems.filter((item) => !apiIds.has(item.id));
          setTestimoni([...unmergedLocal, ...d.data]);
        } else if (localItems.length > 0) {
          const defaultIds = new Set(defaultTestimoni.map((item) => item.id));
          const unmergedLocal = localItems.filter((item) => !defaultIds.has(item.id));
          setTestimoni([...unmergedLocal, ...defaultTestimoni]);
        }
      })
      .catch(() => {
        if (localItems.length > 0) {
          const defaultIds = new Set(defaultTestimoni.map((item) => item.id));
          const unmergedLocal = localItems.filter((item) => !defaultIds.has(item.id));
          setTestimoni([...unmergedLocal, ...defaultTestimoni]);
        }
      });
  }, []);

  const handleScrollVertical = (direction: "down" | "up") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollDistance = 230; // scroll setinggi 1 susunan baris
    container.scrollBy({
      top: direction === "down" ? scrollDistance : -scrollDistance,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.lokasi.trim() || !form.komoditas || !form.rating || !form.komentar.trim()) {
      toast.error("Mohon lengkapi semua field termasuk rating bintang.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/testimoni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengirim ulasan");

      const createdId = (data.data && data.data[0]?.id) || Date.now();
      const newTesti: Testimoni = {
        id: createdId,
        nama: form.nama.trim(),
        lokasi: form.lokasi.trim(),
        komoditas: form.komoditas,
        rating: Number(form.rating),
        komentar: form.komentar.trim(),
        created_at: new Date().toISOString(),
        isNew: true,
      };

      // Tampilkan seketika di posisi paling atas (Baris 1 Kolom 1)
      setTestimoni((prev) => [newTesti, ...prev]);
      setNewlyAddedId(createdId);

      // Simpan di localStorage agar tetap muncul saat refresh
      try {
        const saved = localStorage.getItem("tanipintar_local_testimoni");
        const parsed: Testimoni[] = saved ? JSON.parse(saved) : [];
        localStorage.setItem("tanipintar_local_testimoni", JSON.stringify([newTesti, ...parsed]));
      } catch {
        // ignore
      }

      // Scroll wadah ke posisi paling atas agar ulasan baru langsung terlihat
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }

      toast.success("Terima kasih! Testimoni dan rating Anda telah berhasil ditampilkan.");
      setDialogOpen(false);
      setForm({ nama: "", lokasi: "", komoditas: "", rating: 5, komentar: "" });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const getInitials = useCallback((name: string) => {
    return name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }, []);

  const getKomoditasLabel = (k: string) => (k === "cabai" ? "Cabai" : k === "padi" ? "Padi" : "Padi & Cabai");

  const getAvatarColor = (name: string) => {
    const colors = ["#2A4D24", "#3D6B35", "#5E8F52", "#8BC34A", "#C8A84B", "#6B8E2B", "#4A7A40"];
    const idx = (name.charCodeAt(0) || 0) % colors.length;
    return colors[idx];
  };

  return (
    <section id="testimoni" className="bg-[#FAF7F2] py-20 px-4 overflow-hidden relative border-t border-[#2A4D24]/10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="bg-[#3D6B35]/10 text-[#3D6B35] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Kata Mereka
              </span>
              <span className="flex items-center gap-1 bg-[#C8A84B]/15 text-[#8A6D1C] text-xs font-bold px-3 py-1 rounded-full">
                <Star className="w-3.5 h-3.5 fill-[#C8A84B] text-[#C8A84B]" />
                4.9 / 5.0 dari 150+ Petani
              </span>
            </div>
            <h2
              className="text-[#2A4D24] font-bold text-3xl sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Pengalaman Petani Indonesia
            </h2>
            <p className="text-[#5F6B58] text-sm sm:text-base mt-2 max-w-2xl" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              5 rating per baris dengan 2 susunan yang tampil. Gulir ke bawah untuk melihat pengalaman petani lainnya dari seluruh penjuru Indonesia.
            </p>
          </div>

          {/* Action Buttons: Bagikan Pengalaman & Navigasi Gulir Vertikal */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Tombol Kontrol Gulir Atas / Bawah */}
            <div className="flex items-center gap-1 bg-white border border-[#2A4D24]/15 rounded-xl p-1 shadow-xs">
              <button
                type="button"
                onClick={() => handleScrollVertical("up")}
                aria-label="Gulir ke atas"
                title="Gulir ke atas"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2A4D24] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollVertical("down")}
                aria-label="Gulir ke bawah"
                title="Gulir ke bawah"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2A4D24] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Tombol Tambah Testimoni */}
            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-[#2A4D24] hover:bg-[#3D6B35] text-white rounded-xl gap-2 h-10 px-4 text-xs sm:text-sm font-semibold shadow-md hover:scale-102 transition-all cursor-pointer"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              <Plus className="w-4 h-4" />
              Bagikan Pengalaman
            </Button>
          </div>
        </div>

        {/* Wadah Grid 5 Kolom x 2 Susunan Vertikal (Scroll ke Bawah) */}
        <div className="relative bg-white/60 p-4 sm:p-5 rounded-3xl border border-[#2A4D24]/10 shadow-sm backdrop-blur-xs">
          {/* Scrollable Container (Tinggi disesuaikan persis untuk 2 baris / susunan) */}
          <div
            ref={scrollContainerRef}
            className="overflow-y-auto max-h-[460px] sm:max-h-[475px] pr-2 custom-scrollbar scroll-smooth"
            style={{ overscrollBehavior: "contain" }}
          >
            {/* Grid 5 Kolom Kesamping */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {testimoni.map((t) => {
                const isUserHighlight = t.id === newlyAddedId;
                return (
                  <div
                    key={t.id}
                    className={`bg-white rounded-2xl p-4.5 border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-0.5 min-h-[210px] ${
                      isUserHighlight
                        ? "border-[#25D366] ring-2 ring-[#25D366]/30 bg-gradient-to-b from-white to-[#25D366]/5"
                        : "border-[#2A4D24]/10 hover:border-[#3D6B35]/30"
                    }`}
                  >
                    <div>
                      {/* Rating Stars & Badge */}
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-1">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= t.rating ? "fill-[#C8A84B] text-[#C8A84B]" : "text-gray-200 fill-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] font-bold text-[#8A6D1C] bg-[#C8A84B]/15 px-1.5 py-0.2 rounded ml-0.5">
                            {Number(t.rating).toFixed(1)}
                          </span>
                        </div>

                        {isUserHighlight ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1b7e3f] bg-[#25D366]/20 px-2 py-0.5 rounded-full animate-pulse">
                            <Sparkles className="w-2.5 h-2.5 text-[#1b7e3f]" /> Baru
                          </span>
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] opacity-80" />
                        )}
                      </div>

                      {/* Komentar Ulasan */}
                      <p
                        className="text-[#2A4D24] text-xs leading-relaxed italic line-clamp-4 font-normal"
                        style={{ fontFamily: "var(--font-plus-jakarta)" }}
                      >
                        &ldquo;{t.komentar}&rdquo;
                      </p>
                    </div>

                    {/* Profil Petani */}
                    <div className="flex items-center gap-2.5 pt-3 mt-3 border-t border-[#2A4D24]/8">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-xs"
                        style={{ backgroundColor: getAvatarColor(t.nama), fontFamily: "var(--font-plus-jakarta)" }}
                      >
                        {getInitials(t.nama)}
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-[#2A4D24] font-bold text-xs truncate"
                          style={{ fontFamily: "var(--font-plus-jakarta)" }}
                        >
                          {t.nama}
                        </p>
                        <p className="text-[#5F6B58] text-[10px] truncate" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                          {t.lokasi} • {getKomoditasLabel(t.komoditas)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Baris Informasi Petunjuk Gulir Bawah */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3.5 mt-2 border-t border-[#2A4D24]/10 text-xs text-[#5F6B58]">
            <div className="flex items-center gap-2 text-xs font-medium text-[#2A4D24]">
              <span className="flex h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>
                Menampilkan 2 susunan aktif (total {testimoni.length} ulasan petani terdaftar).
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleScrollVertical("down")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3D6B35] hover:text-[#2A4D24] bg-[#3D6B35]/10 hover:bg-[#3D6B35]/20 px-3 py-1.5 rounded-full transition-all cursor-pointer"
            >
              <span>Gulir ke bawah untuk rating lainnya</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </div>

        {/* Dialog Modal Tambah Testimoni */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md rounded-3xl p-6 sm:p-8 bg-white border border-[#2A4D24]/15 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-[#2A4D24] font-bold text-2xl" style={{ fontFamily: "var(--font-playfair)" }}>
                Bagikan Pengalaman Anda
              </DialogTitle>
              <p className="text-xs text-[#5F6B58]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Ulasan dan rating Anda akan langsung tampil di baris pertama ulasan petani.
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-[#2A4D24]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    Nama Lengkap *
                  </Label>
                  <Input
                    placeholder="Contoh: Pak Budi"
                    value={form.nama}
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    className="rounded-xl text-sm border-[#2A4D24]/20 focus:border-[#3D6B35]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-[#2A4D24]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    Lokasi / Daerah *
                  </Label>
                  <Input
                    placeholder="Contoh: Magelang, Jateng"
                    value={form.lokasi}
                    onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
                    className="rounded-xl text-sm border-[#2A4D24]/20 focus:border-[#3D6B35]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold text-[#2A4D24]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  Komoditas Tanam *
                </Label>
                <Select
                  value={form.komoditas}
                  onValueChange={(val) => setForm({ ...form, komoditas: String(val || "") })}
                >
                  <SelectTrigger className="rounded-xl text-sm border-[#2A4D24]/20 focus:border-[#3D6B35]">
                    <SelectValue placeholder="Pilih jenis tanaman Anda..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="cabai">Cabai</SelectItem>
                    <SelectItem value="padi">Padi</SelectItem>
                    <SelectItem value="keduanya">Padi & Cabai (Keduanya)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rating Bintang */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-[#2A4D24]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    Beri Penilaian (Rating Bintang) *
                  </Label>
                  <span className="text-xs font-bold text-[#8A6D1C]">
                    {(hoverRating || form.rating)} dari 5 Bintang
                  </span>
                </div>
                <div className="flex items-center gap-1.5 p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#2A4D24]/10 justify-center">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, rating: s })}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-125 p-1 cursor-pointer"
                      aria-label={`Beri rating ${s} bintang`}
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          s <= (hoverRating || form.rating)
                            ? "fill-[#C8A84B] text-[#C8A84B]"
                            : "text-gray-300 fill-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold text-[#2A4D24]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  Cerita / Ulasan Anda *
                </Label>
                <Textarea
                  placeholder="Ceritakan pengalaman Anda, bagaimana bot membantu mengatasi penyakit atau memantau harga..."
                  value={form.komentar}
                  onChange={(e) => setForm({ ...form, komentar: e.target.value })}
                  className="rounded-xl text-sm min-h-[95px] border-[#2A4D24]/20 focus:border-[#3D6B35]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2A4D24] hover:bg-[#3D6B35] text-white rounded-xl py-6 font-semibold gap-2 shadow-lg hover:scale-101 transition-all cursor-pointer"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Mengirim Ulasan...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Kirim Testimoni
                  </>
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
