import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CreateRoomModal from "../../components/Home-UI/Modal/CreateRoomModal/CreateRoomModal";
import Buttons from "../../components/Home-UI/Buttons/Buttons";
import { Box, Typography } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import JoinRoomModal from "../../components/Home-UI/Modal/JoinRoomModal/JoinRoomModal";
import LinkComponent from "../../components/Auth-UI/LinkComponent";
import { socket } from "../../socket";
import { initializeSocketEvents } from "../../utils/initializeSocketEvents";
const Home = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.authReducer);
  const { rooms } = useAppSelector((state) => state.roomsReducer);
  const { status } = useAppSelector((state) => state.modalReducer);
  const navigate = useNavigate();

  useEffect(() => {
    const getRooms = async () => {
      socket.emit("rooms:read");
    };
    initializeSocketEvents(socket, navigate, dispatch);
    socket.on("connect_error", (err) => {
      console.log(err.message);
    });
    socket.connect();

    getRooms();

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <Box>
      {rooms.map((room) => {
        return (
          <Box key={room._id}>
            <Typography variant="h2">{room.roomName}</Typography>
            <Typography>{room.maxMembers}</Typography>
          </Box>
        );
      })}
      <Buttons />
      {status === "create" ? <CreateRoomModal /> : <JoinRoomModal />}
      <LinkComponent href="/">Sign Out</LinkComponent>
    </Box>
  );
};

export default Home;
