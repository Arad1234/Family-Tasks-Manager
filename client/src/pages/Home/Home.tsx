import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CreateRoomModal from "../../components/Home-UI/Modal/CreateRoomModal/CreateRoomModal";
import { Box, Typography } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import JoinRoomModal from "../../components/Home-UI/Modal/JoinRoomModal/JoinRoomModal";
import LinkComponent from "../../components/Auth-UI/LinkComponent";
import { socket } from "../../socket";
import { initializeSocketEvents } from "../../utils/initializeSocketEvents";
import CreateButton from "../../components/Home-UI/Buttons/CreateButton";
import Room from "../../components/Home-UI/Room/Room";
import { removeSocketEvents } from "../../utils/removeSocketEvents";
import SearchInput from "../../components/Home-UI/SearchInput/SearchInput";

const Home = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.authReducer);
  const { filteredRooms } = useAppSelector((state) => state.roomsReducer);
  const { status } = useAppSelector((state) => state.modalReducer);
  const navigate = useNavigate();

  useEffect(() => {
    initializeSocketEvents(socket, navigate, dispatch);

    socket.connect();

    socket.emit("rooms:read");

    return () => {
      socket.disconnect();
      removeSocketEvents(socket);
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

      <SearchInput />

      {filteredRooms.length > 0 ? (
        filteredRooms.map((room) => {
          return (
            <Room
              key={room._id}
              room={room}
            />
          );
        })
      ) : (
        <Typography sx={{ fontSize: "30px" }}>No Rooms Found</Typography>
      )}

      {status === "create" ? <CreateRoomModal /> : <JoinRoomModal />}
    </Box>
  );
};

export default Home;
