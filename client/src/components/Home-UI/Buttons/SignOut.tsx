import { Button } from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  const handleSignOut = () => {
    supabase.auth.signOut();
    navigate("/");
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
