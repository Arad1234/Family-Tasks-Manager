import { Typography } from "@mui/material";

interface Props {
  roomName: string;
  className?: string;
}

const RoomName = ({ roomName, className }: Props) => {
  return <Typography className={className}>{roomName}</Typography>;
};

export default RoomName;
