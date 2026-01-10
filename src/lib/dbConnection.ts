import { createClient } from "@supabase/supabase-js";

const dbUrl = import.meta.env.VITE_SUPABASE_URL as string;
const dbAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!dbUrl || !dbAnonKey) {
  throw new Error(
    "Database URL or Anon Key is not defined in environment variables."
  );
}

export const supabase = createClient(dbUrl, dbAnonKey);
