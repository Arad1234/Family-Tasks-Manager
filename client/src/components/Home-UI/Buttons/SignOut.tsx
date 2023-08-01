import { Button } from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const SignOut = () => {
  const supabase = useSupabaseClient();

  const handleSignOut = () => {
    // This will trigger the auth event "SIGNED_OUT".
    supabase.auth.signOut();
  };

  return (
    <Button
      variant="outlined"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
