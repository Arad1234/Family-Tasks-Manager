import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Box } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import { socket } from "../../socket/socket";
import { removeRoomsListeners } from "../../socket/Rooms/RemoveListeners";
import { getRoomsSocket } from "../../socket/Rooms/EventEmitters";
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

const Home = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const loading = useAppSelector((state) => state.authReducer.loading);
  const userId = useAppSelector((state) => state.authReducer.userId as string);

  useEffect(() => {
    roomsListeners(dispatch);
    commonListeners(dispatch);
    errorListeners(navigate, dispatch);
    socketIDListeners(location, navigate, dispatch);
    connectionListeners(userId);
    getRoomsSocket(dispatch);

    return () => {
      removeRoomsListeners();
      removeCommonListeners();
      removeErrorListeners();
      removeSocketIDListeners();
    };
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
        <AllRooms searchQuery={searchQuery} />
      </Box>

      <AllModals />
    </>
  );
};

export default Home;
