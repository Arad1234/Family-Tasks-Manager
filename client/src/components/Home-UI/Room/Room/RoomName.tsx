import { Typography } from "@mui/material";

interface Props {
  roomName: string;
}

const RoomName = ({ roomName }: Props) => {
  return (
    <Typography
      sx={{
        fontSize: "30px",
        textAlign: "center",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: "320px",
        fontWeight: 600,
      }}
    >
      {roomName}
    </Typography>
  );
};

export default RoomName;
