import { Button } from "@mui/material";

interface Props {
  children: React.ReactNode;
  handleClick: () => void;
  backgroundColor: string;
}

const RoomButton = ({ children, handleClick, backgroundColor }: Props) => {
  return (
    <Button
      sx={{
        width: "130px",
        borderRadius: "6px",
        background: `rgba(${backgroundColor}, 0.7)`,
        color: "whitesmoke",
        height: "40px",
        textTransform: "none",
        fontSize: "16px",
        ":hover": { background: `rgba(${backgroundColor}, 0.5)` },
      }}
      onClick={handleClick}
      variant="contained"
    >
      {children}
    </Button>
  );
};

export default RoomButton;
