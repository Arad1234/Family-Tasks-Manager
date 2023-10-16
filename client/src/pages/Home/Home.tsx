import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Box } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import { socket } from "../../socket/socket";
import { removeRoomsListeners } from "../../socket/Rooms/RemoveListeners";
import AllRooms from "../../components/Home-UI/Room/AllRooms/AllRooms";
import { roomsListeners } from "../../socket/Rooms/Listeners";
import { errorListeners } from "../../socket/Errors/Listeners";
import { removeErrorListeners } from "../../socket/Errors/RemoveListeners";
import { commonListeners } from "../../socket/Common/Listeners";
import { removeCommonListeners } from "../../socket/Common/RemoveListeners";
import HomeHeader from "../../components/Home-UI/Header/HomeHeader";
import connectionListeners from "../../socket/Connection/Listeners";
import socketIDListeners from "../../socket/SocketID/Listeners";
import removeSocketIDListeners from "../../socket/SocketID/RemoveListeners";
import AllModals from "../../components/Modal-Common/AllModals";
import { getRoomsSocket } from "../../socket/Rooms/EventEmitters";

export const Home = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const page = useAppSelector((state) => state.roomsReducer.page);
  const { loading, userId } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    roomsListeners(dispatch);
    commonListeners(dispatch);
    errorListeners(navigate, dispatch);
    socketIDListeners(location, navigate, dispatch);
    connectionListeners(userId as string);

    return () => {
      removeRoomsListeners();
      removeCommonListeners();
      removeErrorListeners();
      removeSocketIDListeners();
    };
  }, []);

  // Using callBackRef to check if the "node" has been changed from null to an HTML elemen, if it does, the callback will be executed.
  const callBackRef = useCallback(
    (node: HTMLDivElement | null) => {
      const observer = new IntersectionObserver(
        (entries) => {

          if (entries[0].isIntersecting) {
            getRoomsSocket(dispatch, page);
          }
        },
        { threshold: 1 }
      );
      if (node !== null && !loading) {
        observer.observe(node);
      }
    },
    [loading]
  );

  useEffect(() => {
    getRoomsSocket(dispatch, page);
  }, []);

  return loading || !socket.connected ? (
    <Loader />
  ) : (
    <>
      <HomeHeader
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <AllRooms
          searchQuery={searchQuery}
          ref={callBackRef}
        />
      </Box>

      <AllModals />
    </>
  );
};

export default Home;
