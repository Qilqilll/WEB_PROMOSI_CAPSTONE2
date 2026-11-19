import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://tanipintar.id"),
  title: "TaniPintar Bot - Asisten Cerdas Pertanian di WhatsApp Anda",
  description:
    "Layanan konsultasi cerdas penyakit cabai dan padi via WhatsApp. TaniPintar Bot menggunakan AI untuk mendeteksi 11 penyakit tanaman, memantau harga pasar harian, dan rekomendasi jam semprot.",
  keywords: [
    "tanipintar",
    "bot whatsapp pertanian",
    "deteksi penyakit cabai",
    "konsultasi padi",
    "harga pasar pertanian",
    "kalkulator pupuk",
    "paket langganan tanipintar",
  ],
  icons: {
    icon: "/images/logo-tanipintar.jpg",
    apple: "/images/logo-tanipintar.jpg",
  },
  openGraph: {
    title: "TaniPintar Bot - Asisten Cerdas Pertanian di WhatsApp",
    description: "Deteksi hama & penyakit tanaman cabai dan padi instan di WhatsApp. Berlangganan mulai Rp 49.000 / musim.",
    type: "website",
    locale: "id_ID",
    images: ["/images/logo-tanipintar.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaniPintar Bot",
    description: "Asisten Cerdas Pertanian di WhatsApp Anda",
    images: ["/images/logo-tanipintar.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${plusJakarta.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
