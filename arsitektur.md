# 🏗️ Arsitektur Sistem — TaniPintar Web Promosi & Pembelian Lisensi

> Stack: Next.js 16 (App Router + Middleware) + Shadcn UI + Supabase (PostgreSQL) + Vercel  
> Model Akses: Paid Subscription Paywall (WhatsApp Bot Activation via QRIS/VA)  
> Batasan Wilayah: Daerah Istimewa Yogyakarta dan Magelang  
> Batasan Komoditas: Khusus Cabai & Padi (11 Penyakit Utama)

---

## 1. Diagram Arsitektur Sistem

```
+-------------------------------------------------------------------------+
|                          VERCEL CDN / Edge                              |
|                   (Global Edge Network, Auto HTTPS)                     |
+-------------------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------------------+
|                       MIDDLEWARE (Edge Runtime)                         |
|      (Security Headers: CSP, X-Frame-Options, CORS, Permissions)        |
+-------------------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------------------+
|                     NEXT.JS 16 APPLICATION                              |
|                    (App Router + TypeScript)                            |
|                                                                         |
|  +-------------+   +--------------+   +-----------------------------+   |
|  |   Layouts   |   |    Pages     |   |    API Routes (Serverless)  |   |
|  |  layout.tsx |   |  page.tsx    |   |  /api/orders       POST/GET |   |
|  |  (Metadata) |   |  (Prerender) |   |  /api/v1/prices    GET      |   |
|  +-------------+   +--------------+   |  /api/v1/admin/prices POST  |   |
|                                       |  /api/leads        POST/GET |   |
|                                       |  /api/testimoni    POST/GET |   |
|                                       +-----------------------------+   |
|  +------------------------------------------------+                     |
|  |              CLIENT COMPONENTS (React)         |                     |
|  |  Navbar • HeroSection (Real WA Screenshot)     |                     |
|  |  FiturSection (6 MVP Modules + Scope Box)      |                     |
|  |  KeunggulanSection • CaraPakaiSection          |                     |
|  |  PricingSection (3 Paket + DIY-Mgl Scope)      |                     |
|  |  PaymentModal (Form Ringkas Tanpa Komoditas/Icon)|                   |
|  |  LeadsSection • TestimoniSection • Footer      |                     |
|  +------------------------------------------------+                     |
+-------------------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------------------+
|                       SUPABASE (BaaS)                                   |
|                   (PostgreSQL + Auth + Storage)                         |
|                                                                         |
|  +------------+   +-------------------+   +------------+   +----------+ |
|  |   orders   |   | commodity_prices  |   |   leads    |   |testimoni | |
|  +------------+   +-------------------+   +------------+   +----------+ |
|  | Storage Bucket: crop-symptoms (Pengarsipan Bukti Foto Tanaman Sakit)| |
+-------------------------------------------------------------------------+
```

---

## 2. Fitur Arsitektur Kunci

1. **Next.js Middleware (`src/middleware.ts`)**:
   - Menyuntikkan Security Headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, CSP).
   - Menangani CORS untuk endpoint `/api/*`.
2. **Admin Override API (`/api/v1/admin/prices`)**:
   - Memungkinkan admin menginput update harga acuan komoditas lokal (Cabai Rawit Merah, Cabai Merah Keriting, Gabah Kering Panen, Beras Medium) untuk pasar DIY & Magelang.
3. **Formulir Pembayaran Ringkas (`PaymentModal.tsx`)**:
   - Field komoditas utama telah dihilangkan.
   - Pilihan metode pembayaran disajikan dalam layout text-based tanpa ikon.
   - Menampilkan alert batasan operasional: Wilayah DIY & Magelang, serta komoditas Cabai & Padi.
