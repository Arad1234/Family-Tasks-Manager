import { Box } from "@mui/material";
import Room from "../Room/Room";
import { useAppSelector } from "../../../../redux/hooks";
import { Ref, forwardRef } from "react";
import NoRoomsFound from "./NoRoomsFound";
import IntersectionLoader from "./IntersectionLoader";
import { observerTargetElementStyle } from "../../../../utils/constants/genericConstants";

const AllRooms = forwardRef((_props, ref: Ref<HTMLDivElement>) => {
  const rooms = useAppSelector((state) => state.roomsReducer.rooms);
  const { isAllRooms, isIntersecting } = useAppSelector(
    (state) => state.paginationReducer
  );

  return rooms.length > 0 ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90vw",
        gap: "20px",
        marginTop: "40px",
      }}
    >
      {rooms.map((room) => {
        return (
          <Room
            key={room._id}
            room={room}
          />
        );
      })}
      {isAllRooms ? (
        <div style={observerTargetElementStyle}></div>
      ) : isIntersecting ? (
        <IntersectionLoader />
      ) : (
        <div
          style={observerTargetElementStyle}
          ref={ref}
        ></div>
      )}
    </Box>
  ) : (
    <NoRoomsFound />
  );
});

// Using "memo" to render the "AllRooms" component only when "searchQuery" props change.
export default AllRooms;