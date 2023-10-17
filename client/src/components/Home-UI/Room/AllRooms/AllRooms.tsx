import { Box } from "@mui/material";
import Room from "../Room/Room";
import { useAppSelector } from "../../../../redux/hooks";
import { Ref, forwardRef, memo, useMemo } from "react";
import NoRoomsFound from "./NoRoomsFound";
import IntersectionLoader from "./IntersectionLoader";

interface Props {
  searchQuery: string;
}

const AllRooms = forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
  const rooms = useAppSelector((state) => state.roomsReducer.rooms);
  const { isAllRooms, isIntersecting } = useAppSelector(
    (state) => state.paginationReducer
  );

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      return room.roomName.includes(props.searchQuery);
    });
  }, [rooms, props.searchQuery]);

  return filteredRooms.length > 0 ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90vw",
        gap: "20px",
        marginTop: "40px",
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
      {isAllRooms ? (
        <div style={{ height: "40px", width: "100%", marginTop: "0vh" }}></div>
      ) : isIntersecting ? (
        <IntersectionLoader />
      ) : (
        <div
          style={{ height: "40px", width: "100%", marginTop: "0vh" }}
          ref={ref}
        ></div>
      )}
    </Box>
  ) : (
    <NoRoomsFound />
  );
});

// Using "memo" to render the "AllRooms" component only when "searchQuery" props change.
export default memo(AllRooms);
