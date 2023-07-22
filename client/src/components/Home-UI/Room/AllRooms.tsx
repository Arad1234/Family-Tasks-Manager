import { Box, Typography } from "@mui/material";
import Room from "./Room";
import { useAppSelector } from "../../../redux/hooks";

interface Props {
  searchQuery: string;
}

const AllRooms = ({ searchQuery }: Props) => {
  const { rooms } = useAppSelector((state) => state.roomsReducer);

  const filteredRooms = rooms.filter((room) =>
    room.roomName.includes(searchQuery)
  );

  return filteredRooms.length > 0 ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        margin: "10px",
      }}
    >
      {filteredRooms.map((room) => {
        return (
          <Room
            key={room._id}
            room={room}
          />
        );
      })}
    </Box>
  ) : (
    <Typography sx={{ fontSize: "30px" }}>No Rooms Found</Typography>
  );
};

export default AllRooms;
