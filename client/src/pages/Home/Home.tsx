import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import AllRooms from "../../components/Home-UI/Room/AllRooms";
import { roomsListeners } from "../../socket/Rooms/Listeners";
import { errorListeners } from "../../socket/Errors/Listeners";
import { removeErrorListeners } from "../../socket/Errors/RemoveListeners";
import { commonListeners } from "../../socket/Common/Listeners";
import { removeCommonListeners } from "../../socket/Common/RemoveListeners";
import HomeHeader from "../../components/Home-UI/Header/HomeHeader";

const Home = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { loading } = useAppSelector((state) => state.authReducer);
  const { modalStatus } = useAppSelector((state) => state.modalReducer);
  const navigate = useNavigate();

  useEffect(() => {
    roomsListeners(socket, dispatch);
    commonListeners(socket, dispatch);
    errorListeners(socket, navigate, dispatch);
    getRoomsSocket(dispatch);

    return () => {
      removeRoomsListeners(socket);
      removeCommonListeners(socket);
      removeErrorListeners(socket);
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
    </>
  );
};

export default Home;
