import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const createSupabaseClient = (
  supabaseAccessToken?: string
): SupabaseClient =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken || ""}`,
        },
      },
    }
  );
