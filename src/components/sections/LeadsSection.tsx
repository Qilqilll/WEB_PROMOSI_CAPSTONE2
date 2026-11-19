"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

export default function LeadsSection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    nomor_wa: "",
    komoditas: "",
    lokasi: "",
    pesan: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama || !form.nomor_wa || !form.komoditas || !form.lokasi) {
      toast.error("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Terjadi kesalahan");

      toast.success("Pendaftaran berhasil! Tim kami akan menghubungi Anda segera.", {
        duration: 5000,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="daftar" className="bg-tanipintar-cream py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Info */}
        <div>
          <span className="inline-block bg-[#3D6B35]/10 text-[#3D6B35] text-sm font-medium px-4 py-1.5 rounded-full mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            🌱 Daftarkan Diri Anda
          </span>
          <h2
            className="text-[#2A4D24] font-bold leading-tight mb-4"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            }}
          >
            Bergabung dengan Ribuan Petani Cerdas Indonesia
          </h2>
          <p className="text-tanipintar-muted text-base leading-relaxed mb-8" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Daftarkan nomor WhatsApp Anda dan dapatkan akses prioritas ke TaniPintar Bot. Tim kami akan memandu proses onboarding Anda langsung via WhatsApp.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "500+", label: "Petani Aktif" },
              { value: "11", label: "Jenis Penyakit Terdeteksi" },
              { value: "92%", label: "Akurasi Diagnosis" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-[#3D6B35]/10">
                <p className="text-[#3D6B35] font-bold text-2xl" style={{ fontFamily: "var(--font-playfair)" }}>
                  {stat.value}
                </p>
                <p className="text-tanipintar-muted text-xs mt-1" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Form */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-green-900/10 border border-[#3D6B35]/10">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-[#3D6B35] mb-4" />
              <h3 className="text-[#2A4D24] font-bold text-2xl mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                Pendaftaran Berhasil!
              </h3>
              <p className="text-tanipintar-muted text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Tim TaniPintar akan menghubungi Anda via WhatsApp dalam 1x24 jam.
              </p>
              <Button
                onClick={() => { setSubmitted(false); setForm({ nama: "", nomor_wa: "", komoditas: "", lokasi: "", pesan: "" }); }}
                className="mt-6 bg-[#3D6B35] hover:bg-[#2A4D24] text-white rounded-xl"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Daftar Lagi
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-[#2A4D24] font-bold text-xl" style={{ fontFamily: "var(--font-playfair)" }}>
                Form Pendaftaran
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="nama" className="text-[#2A4D24] text-sm font-medium" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    Nama Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nama"
                    placeholder="Contoh: Budi Santoso"
                    value={form.nama}
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    className="rounded-xl border-gray-200 focus:border-[#3D6B35] focus:ring-[#3D6B35]"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="nomor_wa" className="text-[#2A4D24] text-sm font-medium" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    Nomor WhatsApp <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nomor_wa"
                    placeholder="08xxxxxxxxxx"
                    value={form.nomor_wa}
                    onChange={(e) => setForm({ ...form, nomor_wa: e.target.value })}
                    className="rounded-xl border-gray-200 focus:border-[#3D6B35]"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="komoditas" className="text-[#2A4D24] text-sm font-medium" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  Komoditas Utama <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(val) => setForm({ ...form, komoditas: String(val || "") })}>
                  <SelectTrigger id="komoditas" className="rounded-xl border-gray-200" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    <SelectValue placeholder="Pilih komoditas..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cabai">🌶️ Cabai</SelectItem>
                    <SelectItem value="padi">🌾 Padi / Gabah</SelectItem>
                    <SelectItem value="keduanya">🌾🌶️ Keduanya</SelectItem>
                    <SelectItem value="lainnya">🌱 Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lokasi" className="text-[#2A4D24] text-sm font-medium" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  Lokasi / Kabupaten <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lokasi"
                  placeholder="Contoh: Kab. Kediri, Jawa Timur"
                  value={form.lokasi}
                  onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
                  className="rounded-xl border-gray-200 focus:border-[#3D6B35]"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pesan" className="text-[#2A4D24] text-sm font-medium" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  Pesan / Pertanyaan (Opsional)
                </Label>
                <Textarea
                  id="pesan"
                  placeholder="Ceritakan masalah tanaman Anda atau pertanyaan yang ingin diajukan..."
                  value={form.pesan}
                  onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                  className="rounded-xl border-gray-200 focus:border-[#3D6B35] min-h-[80px]"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3D6B35] hover:bg-[#2A4D24] text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-green-900/20 gap-2"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Daftarkan Saya Sekarang
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-gray-400" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Data Anda aman dan tidak akan disebarluaskan
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
