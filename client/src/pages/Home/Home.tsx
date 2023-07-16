import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getRoomsThunk } from "../../store/actions/Room/rooms-actions";
import { reset } from "../../store/slices/Auth/auth-slice";
import CreateRoomModal from "../../components/Home-UI/ModalComponent/CreateRoomModal";
import Buttons from "../../components/Home-UI/Buttons/Buttons";
import { Box, Typography } from "@mui/material";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.authReducer);
  const { rooms } = useAppSelector((state) => state.roomsReducer);
  const navigate = useNavigate();

  useEffect(() => {
    const getRooms = async () => {
      const response = await dispatch(getRoomsThunk());
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
      <CreateRoomModal />
    </Box>
  );
};

export default Home;
