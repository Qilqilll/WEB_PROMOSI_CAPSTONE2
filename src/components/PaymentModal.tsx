"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Copy,
  ExternalLink,
  ArrowRight,
  Loader2,
  Clock,
  Info,
  QrCode,
  Building2,
  Wallet,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  period: string;
  badge?: string;
  description: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingPlan | null;
}

const WA_BOT_NUMBER = "6282145678901"; // Nomor privat bot setelah bayar

type BankCode = "BCA" | "BRI" | "Mandiri" | "BNI";
type EwalletCode = "DANA" | "GoPay" | "OVO" | "ShopeePay";

const BANK_VA_CONFIG: Record<
  BankCode,
  { name: string; prefix: string; code: string; color: string }
> = {
  BCA: {
    name: "BCA Virtual Account",
    prefix: "12808",
    code: "1280882145678901",
    color: "bg-blue-600",
  },
  BRI: {
    name: "BRI (BRIVA)",
    prefix: "88880",
    code: "8888082145678901",
    color: "bg-blue-700",
  },
  Mandiri: {
    name: "Mandiri Virtual Account",
    prefix: "89022",
    code: "8902282145678901",
    color: "bg-amber-600",
  },
  BNI: {
    name: "BNI Virtual Account",
    prefix: "98810",
    code: "9881082145678901",
    color: "bg-teal-600",
  },
};

const EWALLET_CONFIG: Record<
  EwalletCode,
  { name: string; number: string; accountName: string; color: string }
> = {
  DANA: {
    name: "DANA",
    number: "0821-4567-8901",
    accountName: "TaniPintar Official",
    color: "bg-sky-500",
  },
  GoPay: {
    name: "GoPay",
    number: "0821-4567-8901",
    accountName: "TaniPintar Official",
    color: "bg-emerald-600",
  },
  OVO: {
    name: "OVO",
    number: "0821-4567-8901",
    accountName: "TaniPintar Official",
    color: "bg-purple-600",
  },
  ShopeePay: {
    name: "ShopeePay",
    number: "0821-4567-8901",
    accountName: "TaniPintar Official",
    color: "bg-orange-500",
  },
};

export default function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedVA, setCopiedVA] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [copiedEwallet, setCopiedEwallet] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 menit countdown

  const [selectedBank, setSelectedBank] = useState<BankCode>("BCA");
  const [selectedEwallet, setSelectedEwallet] = useState<EwalletCode>("DANA");

  const [formData, setFormData] = useState({
    nama: "",
    nomor_wa: "",
    paymentMethod: "QRIS",
  });

  const [orderResult, setOrderResult] = useState<{
    orderId: string;
    activationCode: string;
    amount: number;
  } | null>(null);

  // Reset state when opening modal with new plan
  useEffect(() => {
    if (isOpen) {
      setStep("form");
      setTimeLeft(900);
      setOrderResult(null);
      setCopiedVA(false);
      setCopiedAmount(false);
      setCopiedEwallet(false);
    }
  }, [isOpen, plan]);

  // Countdown timer for payment
  useEffect(() => {
    if (step !== "payment") return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  if (!isOpen || !plan) return null;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama.trim() || !formData.nomor_wa.trim()) {
      toast.error("Mohon isi Nama Lengkap dan Nomor WhatsApp Anda");
      return;
    }
    setOrderResult({
      orderId: `TP-${Date.now().toString().slice(-6)}`,
      activationCode: `TANI-${plan.id.toUpperCase().slice(0, 4)}-${Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase()}`,
      amount: plan.price,
    });
    setStep("payment");
  };

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: formData.nama,
          nomor_wa: formData.nomor_wa,
          komoditas: "Cabai & Padi (DIY & Magelang)",
          paket_id: plan.id,
          paket_nama: plan.name,
          amount: orderResult?.amount || plan.price,
          payment_method:
            formData.paymentMethod === "Bank Transfer"
              ? `Virtual Account (${selectedBank})`
              : formData.paymentMethod === "E-Wallet"
              ? `E-Wallet (${selectedEwallet})`
              : "QRIS",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memproses pembayaran");

      if (data.data?.activation_code) {
        setOrderResult((prev) => ({
          orderId: data.data.order_id || prev?.orderId || "TP-ORDER",
          activationCode: data.data.activation_code,
          amount: data.data.amount || plan.price,
        }));
      }

      toast.success("Pembayaran Berhasil! Nomor WhatsApp & Token Aktivasi telah terbuka.");
      setStep("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(msg);
      setStep("success");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: "code" | "number" | "va" | "amount" | "ewallet") => {
    navigator.clipboard.writeText(text);
    if (type === "code") {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
      toast.success("Kode aktivasi disalin ke clipboard!");
    } else if (type === "number") {
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
      toast.success("Nomor WhatsApp bot disalin!");
    } else if (type === "va") {
      setCopiedVA(true);
      setTimeout(() => setCopiedVA(false), 2000);
      toast.success("Nomor Virtual Account disalin!");
    } else if (type === "amount") {
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 2000);
      toast.success("Nominal tagihan disalin!");
    } else if (type === "ewallet") {
      setCopiedEwallet(true);
      setTimeout(() => setCopiedEwallet(false), 2000);
      toast.success("Nomor akun e-wallet disalin!");
    }
  };

  const waLink = `https://wa.me/${WA_BOT_NUMBER}?text=${encodeURIComponent(
    `Halo TaniPintar! Saya ${formData.nama} telah menyelesaikan pembayaran ${plan.name}.
Kode Aktivasi Saya: ${orderResult?.activationCode || "TANI-PRO-VIP"}.
Mohon aktifkan bot untuk nomor saya. Terima kasih!`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto border border-black/10 relative"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        {/* Header bar */}
        <div className="sticky top-0 bg-[#2A4D24] text-white px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex items-center justify-center border border-white/20">
              <Image
                src="/images/logo-tanipintar.jpg"
                alt="TaniPintar Logo"
                width={36}
                height={36}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                Aktivasi Akses TaniPintar Bot
              </h3>
              <p className="text-white/70 text-xs">
                {plan.name} — <span className="text-[#E8A317] font-semibold">{formatRupiah(plan.price)}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {/* STEP 1: FORM PEMBELI */}
          {step === "form" && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              {/* Batasan Cakupan Wilayah & Komoditas Alert Box */}
              <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <Info className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Batasan Operasional Layanan:</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-900/90 pl-5">
                  <strong>Cakupan wilayah:</strong> Sistem difokuskan untuk wilayah <strong>Daerah Istimewa Yogyakarta dan Magelang</strong>. Informasi harga pasar lokal tersedia untuk wilayah yang telah ditentukan.
                </p>
                <p className="text-[11px] leading-relaxed text-amber-900/90 pl-5">
                  <strong>Cakupan komoditas:</strong> Konsultasi diagnosis penyakit tanaman difokuskan pada <strong>cabai dan padi</strong>.
                </p>
              </div>

              {/* Plan Summary Card */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#3D6B35]/20 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#2A4D24] text-base">{plan.name}</span>
                    {plan.badge && (
                      <span className="bg-[#E8A317] text-[#1A2416] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#5F6B58] mt-0.5">{plan.description}</p>
                  <p className="text-xs text-[#5F6B58] mt-1">
                    Masa aktif: <strong>{plan.period}</strong>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 line-through">
                    {formatRupiah(plan.originalPrice)}
                  </div>
                  <div className="text-lg font-bold text-[#2A4D24]">
                    {formatRupiah(plan.price)}
                  </div>
                </div>
              </div>

              {/* Data Diri Form */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#2A4D24]">
                  1. Masukkan Nomor WhatsApp untuk Diaktifkan
                </h4>

                <div>
                  <Label htmlFor="nama" className="text-xs font-semibold text-gray-700">
                    Nama Lengkap / Nama Petani *
                  </Label>
                  <Input
                    id="nama"
                    placeholder="Contoh: Pak Budi Santoso"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    required
                    className="mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="nomor_wa" className="text-xs font-semibold text-gray-700">
                    Nomor WhatsApp Anda (Yang Akan Chat dengan Bot) *
                  </Label>
                  <Input
                    id="nomor_wa"
                    placeholder="Contoh: 081234567890"
                    value={formData.nomor_wa}
                    onChange={(e) => setFormData({ ...formData, nomor_wa: e.target.value })}
                    required
                    className="mt-1 rounded-xl"
                  />
                  <p className="text-[11px] text-[#5F6B58] mt-1">
                    Nomor ini akan didaftarkan ke sistem bot AI agar langsung mengenali Anda 24 jam.
                  </p>
                </div>
              </div>

              {/* Pilihan Metode Pembayaran */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#2A4D24]">
                  2. Pilih Metode Pembayaran
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "QRIS", label: "QRIS Instan", desc: "Scan Semua Bank & E-Wallet", icon: QrCode },
                    { id: "Bank Transfer", label: "Virtual Account", desc: "BCA, BRI, Mandiri, BNI", icon: Building2 },
                    { id: "E-Wallet", label: "E-Wallet", desc: "DANA, GoPay, OVO, ShopeePay", icon: Wallet },
                  ].map((m) => {
                    const isSelected = formData.paymentMethod === m.id;
                    const IconComp = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#2A4D24] bg-[#2A4D24]/5 ring-2 ring-[#2A4D24]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <IconComp className={`w-4 h-4 ${isSelected ? "text-[#2A4D24]" : "text-gray-400"}`} />
                          {isSelected && <span className="w-2 h-2 rounded-full bg-[#2A4D24]" />}
                        </div>
                        <div>
                          <p className="font-bold text-xs text-gray-900 leading-tight">{m.label}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{m.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                className="w-full bg-[#2A4D24] hover:bg-[#3D6B35] text-white py-6 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                Lanjut ke Pembayaran ({formatRupiah(plan.price)})
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>Transaksi Aman • Garansi Bot Langsung Aktif</span>
              </div>
            </form>
          )}

          {/* STEP 2: HALAMAN INSTRUKSI PEMBAYARAN SESUAI METODE YANG DIPILIH */}
          {step === "payment" && orderResult && (
            <div className="space-y-5 animate-fade-in">
              {/* Timer Bar */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold">
                  <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                  <span>Selesaikan pembayaran dalam:</span>
                </div>
                <span className="font-mono font-bold text-sm text-amber-900 bg-white px-2.5 py-1 rounded-lg border border-amber-300">
                  {formatTimer(timeLeft)}
                </span>
              </div>

              {/* Tagihan Card */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#2A4D24]/10 text-center">
                <p className="text-xs text-[#5F6B58]">Total Tagihan ({plan.name})</p>
                <div className="text-2xl font-bold text-[#2A4D24] my-1">
                  {formatRupiah(orderResult.amount)}
                </div>
                <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500">
                  <span>ID Pesanan: <strong className="font-mono text-gray-700">{orderResult.orderId}</strong></span>
                  <span>•</span>
                  <span>Metode: <strong className="text-[#2A4D24]">
                    {formData.paymentMethod === "Bank Transfer"
                      ? "Virtual Account"
                      : formData.paymentMethod === "E-Wallet"
                      ? "E-Wallet"
                      : "QRIS Instan"}
                  </strong></span>
                </div>
              </div>

              {/* ============================================================== */}
              {/* KONDISI 1: METODE PEMBAYARAN QRIS */}
              {/* ============================================================== */}
              {formData.paymentMethod === "QRIS" && (
                <div className="bg-white p-5 rounded-2xl border-2 border-dashed border-[#2A4D24]/30 flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#2A4D24] text-white text-[11px] font-bold px-3 py-0.5 rounded-full flex items-center gap-1.5">
                      <QrCode className="w-3.5 h-3.5" />
                      QRIS RESMI TANIPINTAR
                    </span>
                    <span className="text-[10px] text-gray-500">Semua Bank & E-Wallet</span>
                  </div>

                  {/* QR Code Visual */}
                  <div className="w-48 h-48 bg-gray-50 border-4 border-[#2A4D24] rounded-2xl p-2 relative flex items-center justify-center shadow-inner">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-[#1A2416]">
                      <rect x="5" y="5" width="28" height="28" rx="2" fill="#1A2416" />
                      <rect x="9" y="9" width="20" height="20" rx="1" fill="white" />
                      <rect x="13" y="13" width="12" height="12" rx="1" fill="#1A2416" />

                      <rect x="67" y="5" width="28" height="28" rx="2" fill="#1A2416" />
                      <rect x="71" y="9" width="20" height="20" rx="1" fill="white" />
                      <rect x="75" y="13" width="12" height="12" rx="1" fill="#1A2416" />

                      <rect x="5" y="67" width="28" height="28" rx="2" fill="#1A2416" />
                      <rect x="9" y="71" width="20" height="20" rx="1" fill="white" />
                      <rect x="13" y="75" width="12" height="12" rx="1" fill="#1A2416" />

                      {/* Data Matrix Dots */}
                      <rect x="38" y="10" width="8" height="8" fill="#1A2416" />
                      <rect x="50" y="10" width="8" height="8" fill="#1A2416" />
                      <rect x="38" y="22" width="8" height="8" fill="#1A2416" />
                      <rect x="50" y="22" width="8" height="8" fill="#1A2416" />

                      <rect x="10" y="38" width="8" height="8" fill="#1A2416" />
                      <rect x="22" y="38" width="8" height="8" fill="#1A2416" />
                      <rect x="10" y="50" width="8" height="8" fill="#1A2416" />

                      <rect x="38" y="38" width="24" height="24" fill="#3D6B35" rx="3" />
                      <circle cx="50" cy="50" r="6" fill="white" />

                      <rect x="68" y="38" width="8" height="8" fill="#1A2416" />
                      <rect x="80" y="50" width="8" height="8" fill="#1A2416" />
                      <rect x="68" y="62" width="8" height="8" fill="#1A2416" />

                      <rect x="38" y="68" width="8" height="8" fill="#1A2416" />
                      <rect x="50" y="80" width="8" height="8" fill="#1A2416" />
                      <rect x="62" y="80" width="8" height="8" fill="#1A2416" />
                      <rect x="74" y="80" width="8" height="8" fill="#1A2416" />
                      <rect x="86" y="80" width="8" height="8" fill="#1A2416" />
                    </svg>
                  </div>

                  <p className="text-[11px] text-gray-500 mt-3 text-center leading-relaxed">
                    Buka aplikasi mobile banking atau e-wallet Anda (BCA, BRI, Mandiri, GoPay, DANA, OVO, ShopeePay) lalu <strong>Scan QR</strong> di atas.
                  </p>
                </div>
              )}

              {/* ============================================================== */}
              {/* KONDISI 2: METODE PEMBAYARAN VIRTUAL ACCOUNT (BANK TRANSFER) */}
              {/* ============================================================== */}
              {formData.paymentMethod === "Bank Transfer" && (
                <div className="space-y-4">
                  {/* Pilihan Bank Tab */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                      Pilih Bank Virtual Account:
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(["BCA", "BRI", "Mandiri", "BNI"] as BankCode[]).map((bank) => {
                        const isBankActive = selectedBank === bank;
                        return (
                          <button
                            key={bank}
                            type="button"
                            onClick={() => setSelectedBank(bank)}
                            className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                              isBankActive
                                ? "bg-[#2A4D24] text-white border-[#2A4D24] shadow-xs"
                                : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                            }`}
                          >
                            {bank}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card Nomor VA Bank Terpilih */}
                  <div className="bg-[#FAF7F2] p-4.5 rounded-2xl border border-[#2A4D24]/20 space-y-3.5">
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#2A4D24]/10">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#2A4D24]" />
                        <span className="font-bold text-xs text-[#2A4D24]">
                          {BANK_VA_CONFIG[selectedBank].name}
                        </span>
                      </div>
                      <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                        Otomatis Terverifikasi
                      </span>
                    </div>

                    {/* Nomor VA */}
                    <div>
                      <span className="text-[11px] text-gray-500 block mb-1">
                        Nomor Virtual Account:
                      </span>
                      <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-gray-200">
                        <span className="font-mono font-bold text-base text-[#2A4D24] tracking-wider">
                          {BANK_VA_CONFIG[selectedBank].code}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(BANK_VA_CONFIG[selectedBank].code, "va")}
                          className="text-xs text-[#3D6B35] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          {copiedVA ? "Tersalin!" : "Salin VA"}
                        </button>
                      </div>
                    </div>

                    {/* Nama Akun & Nominal */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2.5 rounded-xl border border-gray-150">
                        <span className="text-[10px] text-gray-500 block">Nama Penerima:</span>
                        <span className="font-semibold text-gray-800 text-[11px] truncate block">
                          TaniPintar - {formData.nama}
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-gray-150 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-500 block">Total Transfer:</span>
                          <span className="font-bold text-[#2A4D24] text-[11px]">
                            {formatRupiah(orderResult.amount)}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(String(orderResult.amount), "amount")}
                          className="text-[10px] text-[#3D6B35] font-semibold hover:underline cursor-pointer"
                          title="Salin nominal"
                        >
                          {copiedAmount ? "Tersalin" : "Salin"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Panduan Singkat Transfer VA */}
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-[11px] text-gray-600 space-y-1">
                    <p className="font-semibold text-gray-800">Petunjuk Pembayaran Virtual Account:</p>
                    <ol className="list-decimal list-inside space-y-0.5 text-[10px] text-gray-600">
                      <li>Buka m-Banking ({selectedBank}) atau kunjungi mesin ATM terdekat.</li>
                      <li>Pilih menu <strong>Transfer &gt; Virtual Account</strong>.</li>
                      <li>Masukkan Nomor Virtual Account di atas: <strong>{BANK_VA_CONFIG[selectedBank].code}</strong>.</li>
                      <li>Pastikan nominal dan nama tertera adalah <strong>TaniPintar - {formData.nama}</strong>.</li>
                      <li>Konfirmasi pembayaran dan masukkan PIN transaksi Anda.</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* KONDISI 3: METODE PEMBAYARAN E-WALLET */}
              {/* ============================================================== */}
              {formData.paymentMethod === "E-Wallet" && (
                <div className="space-y-4">
                  {/* Pilihan E-Wallet Tab */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                      Pilih Aplikasi E-Wallet Anda:
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(["DANA", "GoPay", "OVO", "ShopeePay"] as EwalletCode[]).map((ewallet) => {
                        const isEwalletActive = selectedEwallet === ewallet;
                        return (
                          <button
                            key={ewallet}
                            type="button"
                            onClick={() => setSelectedEwallet(ewallet)}
                            className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                              isEwalletActive
                                ? "bg-[#2A4D24] text-white border-[#2A4D24] shadow-xs"
                                : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                            }`}
                          >
                            {ewallet}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card Detail E-Wallet Terpilih */}
                  <div className="bg-[#FAF7F2] p-4.5 rounded-2xl border border-[#2A4D24]/20 space-y-3.5">
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#2A4D24]/10">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-[#2A4D24]" />
                        <span className="font-bold text-xs text-[#2A4D24]">
                          Akun Resmi {EWALLET_CONFIG[selectedEwallet].name}
                        </span>
                      </div>
                      <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                        Online 24 Jam
                      </span>
                    </div>

                    {/* Nomor Akun E-Wallet */}
                    <div>
                      <span className="text-[11px] text-gray-500 block mb-1">
                        Nomor Ponsel Tujuan {selectedEwallet}:
                      </span>
                      <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-gray-200">
                        <span className="font-mono font-bold text-base text-[#2A4D24] tracking-wider">
                          {EWALLET_CONFIG[selectedEwallet].number}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(EWALLET_CONFIG[selectedEwallet].number, "ewallet")}
                          className="text-xs text-[#3D6B35] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          {copiedEwallet ? "Tersalin!" : "Salin Nomor"}
                        </button>
                      </div>
                    </div>

                    {/* Nama Penerima & Catatan */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2.5 rounded-xl border border-gray-150">
                        <span className="text-[10px] text-gray-500 block">Nama Penerima:</span>
                        <span className="font-semibold text-gray-800 text-[11px] truncate block">
                          {EWALLET_CONFIG[selectedEwallet].accountName}
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-gray-150">
                        <span className="text-[10px] text-gray-500 block">Catatan / Berita:</span>
                        <span className="font-mono font-bold text-[#2A4D24] text-[11px] truncate block">
                          {orderResult.orderId}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Panduan Singkat Transfer E-Wallet */}
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-[11px] text-gray-600 space-y-1">
                    <p className="font-semibold text-gray-800">Petunjuk Pembayaran {selectedEwallet}:</p>
                    <ol className="list-decimal list-inside space-y-0.5 text-[10px] text-gray-600">
                      <li>Buka aplikasi <strong>{selectedEwallet}</strong> di ponsel Anda.</li>
                      <li>Pilih menu <strong>Kirim / Transfer Saldo</strong>.</li>
                      <li>Masukkan nomor tujuan: <strong>{EWALLET_CONFIG[selectedEwallet].number}</strong> (a.n. <strong>{EWALLET_CONFIG[selectedEwallet].accountName}</strong>).</li>
                      <li>Masukkan jumlah pembayaran tepat: <strong>{formatRupiah(orderResult.amount)}</strong>.</li>
                      <li>Tulis catatan transfer dengan ID Pesanan: <strong>{orderResult.orderId}</strong>.</li>
                      <li>Konfirmasi pengiriman saldo dan masukkan PIN Anda.</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Button
                  onClick={handleConfirmPayment}
                  disabled={loading}
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-6 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Memverifikasi Pembayaran...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Saya Sudah Bayar (Buka Akses Bot WhatsApp)
                    </>
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="w-full text-center text-xs text-gray-500 hover:text-gray-800 py-2 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Ubah Metode atau Data Pembeli</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUKSES & BUKA KUNCI NOMOR WHATSAPP BOT */}
          {step === "success" && orderResult && (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto ring-8 ring-green-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                  PEMBAYARAN DIVERIFIKASI
                </span>
                <h3 className="font-bold text-xl text-[#2A4D24] mt-2">
                  Selamat, Akses WhatsApp Bot Terbuka!
                </h3>
                <p className="text-xs text-[#5F6B58] mt-1">
                  Nomor resmi TaniPintar Bot kini siap melayani konsultasi cabai & padi wilayah DIY dan Magelang 24/7.
                </p>
              </div>

              {/* Unlocked Credentials Card */}
              <div className="bg-[#FAF7F2] p-5 rounded-3xl border-2 border-[#2A4D24]/20 space-y-4 text-left">
                {/* Official Bot Number */}
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Nomor Resmi WhatsApp Bot TaniPintar:</span>
                    <span className="text-[10px] bg-green-600 text-white font-bold px-2 py-0.5 rounded-full">
                      ONLINE
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-gray-200">
                    <span className="font-mono font-bold text-base text-[#2A4D24]">
                      +62 821-4567-8901
                    </span>
                    <button
                      onClick={() => copyToClipboard("+6282145678901", "number")}
                      className="text-xs text-[#3D6B35] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedNumber ? "Tersalin!" : "Salin"}
                    </button>
                  </div>
                </div>

                {/* Activation Token */}
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Token / Lisensi Aktivasi Anda:</span>
                    <span className="text-[10px] text-amber-700 font-semibold">{plan.name}</span>
                  </div>
                  <div className="flex items-center justify-between bg-amber-50 px-4 py-3 rounded-2xl border border-amber-200">
                    <span className="font-mono font-bold text-base text-amber-900 tracking-wider">
                      {orderResult.activationCode}
                    </span>
                    <button
                      onClick={() => copyToClipboard(orderResult.activationCode, "code")}
                      className="text-xs text-amber-800 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedCode ? "Tersalin!" : "Salin Token"}
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-[#5F6B58] bg-white/80 p-3 rounded-xl border border-gray-100">
                  <strong>Petunjuk Memulai:</strong> Klik tombol hijau di bawah untuk langsung membuka WhatsApp. Bot akan otomatis mengenali nomor dan token Anda.
                </div>
              </div>

              {/* Direct Open WhatsApp Button */}
              <div className="space-y-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white py-4 rounded-2xl font-bold text-sm shadow-xl transition-all duration-200 hover:scale-[1.02]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Buka WhatsApp & Mulai Chat Bot Sekarang
                  <ExternalLink className="w-4 h-4" />
                </a>

                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full rounded-xl text-xs py-3 border-gray-200 cursor-pointer"
                >
                  Selesai & Tutup Jendela
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
