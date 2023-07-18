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
import JoinButton from "../../components/Home-UI/Buttons/JoinButton";
import Room from "../../components/Home-UI/Room/Room";

const Home = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.authReducer);
  const { rooms } = useAppSelector((state) => state.roomsReducer);
  const { status } = useAppSelector((state) => state.modalReducer);
  const navigate = useNavigate();

  useEffect(() => {
    initializeSocketEvents(socket, navigate, dispatch);

    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    socket.connect();

    socket.emit("rooms:read");

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box>
      <CreateButton />
      {rooms.map((room) => {
        return (
          <Room
            key={room._id}
            room={room}
          />
        );
      })}

      {status === "create" ? <CreateRoomModal /> : <JoinRoomModal />}
      <LinkComponent href="/">Sign Out</LinkComponent>
    </Box>
  );
};

export default Home;
