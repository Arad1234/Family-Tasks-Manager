import { Button } from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../../axiosClient";
import variables from "../../../sass/variables.module.scss";

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
        backgroundColor: variables.actionColor,
        ":hover": {
          backgroundColor: variables.actionColor,
        },
        textTransform: "none",
        fontSize: "16px",
        width: "7.5rem",
      }}
      variant="contained"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
