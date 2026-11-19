import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const isSupabaseConfigured = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes("placeholder-project") && !url.includes("your-project"));
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: number;
          created_at: string;
          nama: string;
          nomor_wa: string;
          komoditas: string;
          lokasi: string;
          pesan: string | null;
        };
        Insert: {
          nama: string;
          nomor_wa: string;
          komoditas: string;
          lokasi: string;
          pesan?: string | null;
        };
      };
      orders: {
        Row: {
          id: number;
          created_at: string;
          order_id: string;
          nama: string;
          nomor_wa: string;
          komoditas: string | null;
          paket_id: string;
          paket_nama: string;
          amount: number;
          payment_method: string;
          status: string;
          activation_code: string;
        };
        Insert: {
          order_id: string;
          nama: string;
          nomor_wa: string;
          komoditas?: string | null;
          paket_id: string;
          paket_nama: string;
          amount: number;
          payment_method: string;
          status?: string;
          activation_code: string;
        };
      };
      commodity_prices: {
        Row: {
          id: number;
          created_at: string;
          komoditas: string;
          varietas: string | null;
          wilayah: string;
          harga_per_kg: number;
          tanggal: string;
          sumber: string | null;
        };
        Insert: {
          komoditas: string;
          varietas?: string | null;
          wilayah: string;
          harga_per_kg: number;
          tanggal?: string;
          sumber?: string | null;
        };
      };
      testimoni: {
        Row: {
          id: number;
          created_at: string;
          nama: string;
          lokasi: string;
          komoditas: string;
          rating: number;
          komentar: string;
          is_approved: boolean;
          avatar_url: string | null;
        };
        Insert: {
          nama: string;
          lokasi: string;
          komoditas: string;
          rating: number;
          komentar: string;
          is_approved?: boolean;
          avatar_url?: string | null;
        };
      };
      page_views: {
        Row: {
          id: number;
          created_at: string;
          path: string;
        };
        Insert: {
          path: string;
        };
      };
    };
  };
};
