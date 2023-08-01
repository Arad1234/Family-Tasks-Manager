import { SupabaseClient } from "@supabase/supabase-js";
import { VITE_SCOPES } from "../utils/constants";

export const SignInWithOAuth = async (supabase: SupabaseClient) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:5173/home",
      scopes: VITE_SCOPES,
    },
  });
  return { error };
};
