-- TaniPintar Bot Database Schema
-- Run this in Supabase SQL Editor: https://app.supabase.com

-- =============================================
-- TABLE: leads (Pendaftaran Petani)
-- =============================================
CREATE TABLE IF NOT EXISTS public.leads (
  id         BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  nama       TEXT NOT NULL,
  nomor_wa   TEXT NOT NULL,
  komoditas  TEXT NOT NULL CHECK (komoditas IN ('cabai', 'padi', 'keduanya', 'lainnya')),
  lokasi     TEXT NOT NULL,
  pesan      TEXT
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon can insert leads" ON public.leads
  FOR INSERT TO anon WITH CHECK (true);

-- =============================================
-- TABLE: orders (Transaksi Paket Langganan WA Bot)
-- =============================================
CREATE TABLE IF NOT EXISTS public.orders (
  id              BIGSERIAL PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  order_id        TEXT UNIQUE NOT NULL,
  nama            TEXT NOT NULL,
  nomor_wa        TEXT NOT NULL,
  komoditas       TEXT,
  paket_id        TEXT NOT NULL,
  paket_nama      TEXT NOT NULL,
  amount          INTEGER NOT NULL,
  payment_method  TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'paid',
  activation_code TEXT NOT NULL
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon can insert orders" ON public.orders
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon can read orders" ON public.orders
  FOR SELECT TO anon USING (true);

-- =============================================
-- TABLE: commodity_prices (Harga Pasar DIY & Magelang)
-- =============================================
CREATE TABLE IF NOT EXISTS public.commodity_prices (
  id           BIGSERIAL PRIMARY KEY,
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  komoditas    TEXT NOT NULL,
  varietas     TEXT,
  wilayah      TEXT NOT NULL,
  harga_per_kg INTEGER NOT NULL,
  tanggal      DATE NOT NULL DEFAULT CURRENT_DATE,
  sumber       TEXT DEFAULT 'Admin Override',
  UNIQUE (komoditas, wilayah, tanggal)
);

ALTER TABLE public.commodity_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can read commodity_prices" ON public.commodity_prices
  FOR SELECT TO anon USING (true);

CREATE POLICY "anon can upsert commodity_prices" ON public.commodity_prices
  FOR INSERT TO anon WITH CHECK (true);

-- Sample initial prices for DIY and Magelang
INSERT INTO public.commodity_prices (komoditas, varietas, wilayah, harga_per_kg, sumber) VALUES
  ('Cabai Rawit Merah', 'Ori 212 / Asmoro', 'DI Yogyakarta (Beringharjo & Prambanan)', 58000, 'Acuan Pasar Nasional'),
  ('Cabai Merah Keriting', 'TM 99 / Kastilo', 'Kab. Magelang (Pasar Agrobisnis Sewukan)', 42000, 'Acuan Pasar Lokal'),
  ('Gabah Kering Panen (GKP)', 'Ciherang / Inpari 32', 'DI Yogyakarta (Sleman & Bantul)', 7200, 'Kementan / Bapanas'),
  ('Beras Medium', 'C4 / IR 64', 'Kab. Magelang (Muntilan & Secang)', 13500, 'Bapanas DIY-Jateng')
ON CONFLICT (komoditas, wilayah, tanggal) DO NOTHING;

-- =============================================
-- TABLE: testimoni (Testimoni Petani)
-- =============================================
CREATE TABLE IF NOT EXISTS public.testimoni (
  id          BIGSERIAL PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  nama        TEXT NOT NULL,
  lokasi      TEXT NOT NULL,
  komoditas   TEXT NOT NULL CHECK (komoditas IN ('cabai', 'padi', 'keduanya')),
  rating      SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  komentar    TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE NOT NULL,
  avatar_url  TEXT
);

ALTER TABLE public.testimoni ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can read approved testimoni" ON public.testimoni
  FOR SELECT TO anon USING (is_approved = true);

CREATE POLICY "anon can insert testimoni" ON public.testimoni
  FOR INSERT TO anon WITH CHECK (true);

-- =============================================
-- TABLE: page_views (Analytics Sederhana)
-- =============================================
CREATE TABLE IF NOT EXISTS public.page_views (
  id         BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  path       TEXT NOT NULL DEFAULT '/'
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon can insert page_views" ON public.page_views
  FOR INSERT TO anon WITH CHECK (true);

-- =============================================
-- Sample data: approved testimoni
-- =============================================
INSERT INTO public.testimoni (nama, lokasi, komoditas, rating, komentar, is_approved) VALUES
  ('Pak Slamet Riyadi', 'Kab. Magelang, Jawa Tengah', 'cabai', 5, 'Luar biasa! Tanaman cabai saya terserang virus kuning di Sewukan, langsung saya foto kirim ke bot. Dalam hitungan detik sudah ada jawaban lengkap beserta cara penanganannya.', true),
  ('Bu Sari Dewi', 'Kab. Sleman, D.I. Yogyakarta', 'padi', 5, 'Fitur prediksi cuaca dan jam semprot sangat berguna untuk sawah saya di Kalasan. Dulu sering rugi karena nyemprot saat mau hujan, sekarang tidak lagi.', true),
  ('Mas Hendra Kurnia', 'Kab. Bantul, D.I. Yogyakarta', 'keduanya', 4, 'Praktis banget, langsung dari WA tanpa install app baru. Harga pasar harian Prambanan dan Beringharjo sangat membantu saya menentukan kapan waktu terbaik jual cabai.', true);
