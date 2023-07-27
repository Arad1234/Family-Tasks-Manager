import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CreateRoomModal from "../../components/Home-UI/Modal/CreateRoomModal/CreateRoomModal";
import { Box } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import JoinRoomModal from "../../components/Home-UI/Modal/JoinRoomModal/JoinRoomModal";
import LinkComponent from "../../components/Link/LinkComponent";
import { socket } from "../../socket/socket";
import CreateButton from "../../components/Home-UI/Buttons/CreateRoomButton";
import { removeRoomsListeners } from "../../socket/Rooms/RemoveListeners";
import SearchInput from "../../components/Home-UI/SearchInput/SearchInput";
import DeleteRoomModal from "../../components/Home-UI/Modal/DeleteRoomModal/DeleteRoomModal";
import { getRoomsSocket } from "../../socket/Rooms/EventEmitters";
import AllRooms from "../../components/Home-UI/Room/AllRooms";
import ShowMembersModal from "../../components/Home-UI/Modal/ShowMembersModal/ShowMembersModal";
import { roomsListeners } from "../../socket/Rooms/Listeners";
import { errorListeners } from "../../socket/Errors/Listeners";
import { removeErrorListeners } from "../../socket/Errors/RemoveListeners";

const Home = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { loading } = useAppSelector((state) => state.authReducer);
  const { modalStatus } = useAppSelector((state) => state.modalReducer);
  const navigate = useNavigate();

  useEffect(() => {
    roomsListeners(socket, dispatch);
    errorListeners(socket, navigate, dispatch);

    socket.connect();

    getRoomsSocket(dispatch);

    return () => {
      removeRoomsListeners(socket);
      removeErrorListeners(socket);
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CreateButton />
        <LinkComponent href="/">Sign Out</LinkComponent>
      </Box>

      <SearchInput setSearchQuery={setSearchQuery} />

      <AllRooms searchQuery={searchQuery} />

      {modalStatus === "create" && <CreateRoomModal />}
      {modalStatus === "join" && <JoinRoomModal />}
      {modalStatus === "delete" && <DeleteRoomModal />}
      {modalStatus === "members" && <ShowMembersModal />}
    </Box>
  );
};

export default Home;
