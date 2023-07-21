import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CreateRoomModal from "../../components/Home-UI/Modal/CreateRoomModal/CreateRoomModal";
import { Box, Typography } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import JoinRoomModal from "../../components/Home-UI/Modal/JoinRoomModal/JoinRoomModal";
import LinkComponent from "../../components/Link/LinkComponent";
import { socket } from "../../socket/socket";
import { initializeErrorSocket } from "../../utils/initializeSocketEvents";
import CreateButton from "../../components/Home-UI/Buttons/CreateRoomButton";
import Room from "../../components/Home-UI/Room/Room";
import { removeErrorSocket } from "../../utils/removeSocketEvents";
import SearchInput from "../../components/Home-UI/SearchInput/SearchInput";
import DeleteRoomModal from "../../components/Home-UI/Modal/DeleteRoomModal/DeleteRoomModal";
import { getRoomsSocket } from "../../socket/socketEvents";

const Home = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { loading } = useAppSelector((state) => state.authReducer);
  const { rooms } = useAppSelector((state) => state.roomsReducer);
  const { modalStatus } = useAppSelector((state) => state.modalReducer);
  const navigate = useNavigate();

  const filteredRooms = rooms.filter((room) =>
    room.roomName.includes(searchQuery)
  );

  useEffect(() => {
    initializeErrorSocket(socket, navigate, dispatch);

    socket.connect();

    getRoomsSocket(dispatch);
    return () => {
      removeErrorSocket(socket);
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

      {filteredRooms.length > 0 ? (
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
      )}

      {modalStatus === "create" && <CreateRoomModal />}
      {modalStatus === "join" && <JoinRoomModal />}
      {modalStatus === "delete" && <DeleteRoomModal />}
    </Box>
  );
};

export default Home;
