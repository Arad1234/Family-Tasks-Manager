import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { Box } from "@mui/material";
import Loader from "@Components/Common/Loader";
import { socket } from "@Socket/socket";
import AllRooms from "@Components/Home-UI/Rooms/AllRooms/AllRooms";
import HomeHeader from "@Components/Home-UI/Header/HomeHeader";
import { getRoomsSocket } from "@Redux/actions/rooms-actions";
import useIntersectionObserver from "@Hooks/useIntersectionObserver";

export const Home = () => {
  const dispatch = useAppDispatch();

  const page = useAppSelector((state) => state.paginationReducer.page);
  const isSearchRoom = useAppSelector(
    (state) => state.roomsReducer.isSearchRoom
  );
  const { loading } = useAppSelector((state) => state.authReducer);

  // Using callback ref to call the "callBackRef" function whenever a ref is created in the child component ((node) => callBackRef(node)).
  const callBackRef = useIntersectionObserver<number>(page);

  useEffect(() => {
    dispatch(getRoomsSocket({ page }));
  }, []);

  return loading || !socket.connected ? (
    <Loader />
  ) : (
    <>
      <HomeHeader />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {isSearchRoom ? (
          <Loader height="88vh" />
        ) : (
          <AllRooms ref={callBackRef} />
        )}
      </Box>
    </>
  );
};

export default Home;
