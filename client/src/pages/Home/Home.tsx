import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getRoomsThunk } from "../../redux/actions/Room/rooms-actions";
import { reset } from "../../redux/slices/Auth/auth-slice";
import CreateRoomModal from "../../components/Home-UI/Modal/CreateRoomModal/CreateRoomModal";
import Buttons from "../../components/Home-UI/Buttons/Buttons";
import { Box, Typography } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import JoinRoomModal from "../../components/Home-UI/Modal/JoinRoomModal/JoinRoomModal";

const Home = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.authReducer);
  const { rooms } = useAppSelector((state) => state.roomsReducer);
  const { status } = useAppSelector((state) => state.modalReducer);
  const navigate = useNavigate();

  useEffect(() => {
    const getRooms = async () => {
      const response = await dispatch(getRoomsThunk());
      console.log(response);
      if (response.error) {
        alert(response.payload);
        dispatch(reset());
        navigate("/");
      }
    };
    getRooms();
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
    </Box>
  );
};

export default Home;
