import { Button } from "@mui/material";

const InviteMembersButton = () => {
  return (
    <Button
      variant="outlined"
      sx={{
        padding: "10px",
        width: "9rem",
        height: "50px",
        textTransform: "none",
        fontSize: "20px",
        background: "rgba(80, 130, 255, 0.8)",
        color: "white",
        fontWeight: "600",
        ":hover": { background: "rgba(80, 130, 255, 0.6)" },
      }}
    >
      Invite
    </Button>
  );
};

export default InviteMembersButton;
