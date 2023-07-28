import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import GoogleButton from "react-google-button";
import { VITE_SCOPES } from "../../utils/constants";
import { Box } from "@mui/material";

const GoogleAuth = () => {
  const supabase = useSupabaseClient(); // talk to supabase!
  const session = useSession();

  const googleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: VITE_SCOPES,
      },
    });
    if (error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return session ? (
    <Box sx={{ margin: "20px" }}>
      <GoogleButton
        onClick={signOut}
        style={{ width: "9rem" }}
        label="Sign out"
      />
    </Box>
  ) : (
    <Box sx={{ margin: "20px" }}>
      <GoogleButton
        onClick={googleSignIn}
        style={{ width: "9rem" }}
        label="Sign in"
      />
    </Box>
  );
};

export default GoogleAuth;
