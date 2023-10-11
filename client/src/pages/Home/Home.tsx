import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CreateRoomModal from "../../components/Home-UI/Modal/CreateRoomModal/CreateRoomModal";
import { Box } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import JoinRoomModal from "../../components/Home-UI/Modal/JoinRoomModal/JoinRoomModal";
import { socket } from "../../socket/socket";
import { removeRoomsListeners } from "../../socket/Rooms/RemoveListeners";
import SearchInput from "../../components/Home-UI/SearchInput/SearchInput";
import DeleteRoomModal from "../../components/Home-UI/Modal/DeleteRoomModal/DeleteRoomModal";
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
import RemovedYouMessageModal from "../../components/Common/RemovedYouMessageModal";

const Home = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const loading = useAppSelector((state) => state.authReducer.loading);
  const modalStatus = useAppSelector((state) => state.modalReducer.modalStatus);
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
      <HomeHeader />

      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <AllRooms searchQuery={searchQuery} />
      </Box>

      {modalStatus === "create" && <CreateRoomModal />}
      {modalStatus === "join" && <JoinRoomModal />}
      {modalStatus === "delete" && <DeleteRoomModal />}
      {modalStatus === "adminRemovedYou" && <RemovedYouMessageModal />}
    </>
  );
};

export default Home;
