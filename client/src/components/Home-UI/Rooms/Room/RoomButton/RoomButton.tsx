import { Button } from "@mui/material";

interface Props {
  children: React.ReactNode;
  handleClick: () => void;
  className?: string;
}

const RoomButton = ({ children, handleClick, className }: Props) => {
  return (
    <Button
      className={className}
      onClick={handleClick}
      variant="contained"
    >
      {children}
    </Button>
  );
};

export default RoomButton;
