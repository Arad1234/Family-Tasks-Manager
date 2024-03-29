import { Button } from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../../axiosClient";

const SignOut = () => {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    navigate("/");
    // This will trigger the auth event "SIGNED_OUT".
    await supabase.auth.signOut();
    await axiosClient.post("/user/logout");
  };

  return (
    <Button
      sx={{
        borderRadius: "20px",
        backgroundColor: "rgba(200, 20, 20, 0.9)",
        ":hover": {
          backgroundColor: "rgba(200, 20, 20, 0.7)",
        },
        textTransform: "none",
        fontSize: "16px",
      }}
      variant="contained"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
