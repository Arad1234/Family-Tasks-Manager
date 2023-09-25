import { Button } from "@mui/material";

interface Props {
  children: React.ReactNode;
  handleClick: () => void;
  backgroundColor: string;
  width: string;
}

const RoomButton = ({
  children,
  handleClick,
  backgroundColor,
  width,
}: Props) => {
  return (
    <Button
      sx={{
        width: width,
        borderRadius: "20px",
        background: backgroundColor,
        height: "40px",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: "600",
        ":hover": { background: backgroundColor },
      }}
      onClick={handleClick}
      variant="contained"
    >
      {children}
    </Button>
  );
};

export default RoomButton;
