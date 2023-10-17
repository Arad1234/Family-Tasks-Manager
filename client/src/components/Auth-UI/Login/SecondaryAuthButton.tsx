import { Button } from "@mui/material";
import { toast } from "react-toastify";

interface Props {
  loginWithGoogle: () => void;
}

const SecondaryAuthButton = ({ loginWithGoogle }: Props) => {
  return (
    <Button
      sx={{
        padding: "13px",
        height: "50px",
        borderRadius: "5px",
        outline: "none",
        backgroundColor: "#E5E4E2",
        fontWeight: "600",
        fontSize: "18px",
        width: "62vw",
        textTransform: "none",
        color: "black",
        ":hover": { backgroundColor: "#E5E4E2" },
      }}
      onClick={() => toast.info("Dont work!")}
    >
      Login with google
    </Button>
  );
};

export default SecondaryAuthButton;
