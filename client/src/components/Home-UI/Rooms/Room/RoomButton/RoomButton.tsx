import { Fab } from "@mui/material";

interface Props {
  children: React.ReactNode;
  handleClick: () => void;
  className?: string;
}

const RoomButton = ({ children, handleClick, className }: Props) => {
  return (
    <Fab
      className={className}
      onClick={handleClick}
    >
      {children}
    </Fab>
  );
};

export default RoomButton;
