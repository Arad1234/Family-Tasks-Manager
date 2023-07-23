import { Typography } from "@mui/material";

interface Props {
  roomName: string;
}

const RoomName = ({ roomName }: Props) => {
  return (
    <Typography
      sx={{ fontSize: "30px", fontWeight: 600, color: "rgb(50, 50, 50)" }}
    >
      {roomName}
    </Typography>
  );
};

export default RoomName;
