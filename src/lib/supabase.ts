import { createClient } from "@supabase/supabase-js";

// Supabase environment variables with safe fallback for demo mode
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo-radhix-clinic.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo-radhix-clinic-key";

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("demo-radhix-clinic")
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
