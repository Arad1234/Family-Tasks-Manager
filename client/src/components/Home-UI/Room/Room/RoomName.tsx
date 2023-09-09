import { Typography } from "@mui/material";

interface Props {
  roomName: string;
}

const RoomName = ({ roomName }: Props) => {
  return (
    <Typography
      sx={{
        fontSize: "30px",
        fontWeight: 600,
        color: "white",
      }}
    >
      {roomName}
    </Typography>
  );
};

export default RoomName;
