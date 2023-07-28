import { SupabaseClient } from "@supabase/supabase-js";
import { VITE_SCOPES } from "../utils/constants";

export const SignInWithOAuth = async (supabase: SupabaseClient) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      scopes: VITE_SCOPES,
    },
  });
  return { error };
};
