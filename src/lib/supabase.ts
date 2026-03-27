import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Browser-side Supabase client.
 * Returns null if env vars are not configured (graceful degradation to localStorage).
 */
export const supabase =
  url && anonKey ? createClient(url, anonKey) : null;
