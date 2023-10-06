import { Box, Typography } from "@mui/material";
import Room from "./Room/Room";
import { useAppSelector } from "../../../redux/hooks";
import { memo, useMemo } from "react";

interface Props {
  searchQuery: string;
}

const AllRooms = ({ searchQuery }: Props) => {
  const rooms = useAppSelector((state) => state.roomsReducer.rooms);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      return room.roomName.includes(searchQuery);
    });
  }, [rooms, searchQuery]);

  return filteredRooms.length > 0 ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90vw",
        gap: "20px",
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <Typography variant="h4">No Rooms Found</Typography>
    </Box>
  );
};

// Using "memo" to render the "AllRooms" component only when "searchQuery" props change.
export default memo(AllRooms);
