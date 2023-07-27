import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import WelcomeTitle from "../../components/FamilyRoom-UI/WelcomeTitle/WelcomeTitle";
import RoomHeader from "../../components/FamilyRoom-UI/RoomHeader/RoomHeader";
import RoomOptions from "../../components/FamilyRoom-UI/RoomOptions/RoomOptions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AllTasks from "../../components/FamilyRoom-UI/Tasks/AllTasks";
import Calender from "../../components/FamilyRoom-UI/Calender/Calender";
import { useEffect } from "react";
import { setCurrentRoom } from "../../redux/slices/Rooms/rooms-slice";
import AllMembers from "../../components/FamilyRoom-UI/Members/AllMembers";
import { familyRoomListeners } from "../../socket/FamilyRoom/Listeners";
import { socket } from "../../socket/socket";
import { removeFamilyRoomListeners } from "../../socket/FamilyRoom/RemoveListeners";
import Loader from "../../components/Loader/Loader";
import { removeErrorListeners } from "../../socket/Errors/RemoveListeners";
import { errorListeners } from "../../socket/Errors/Listeners";

const FamilyRoom = () => {
  const { roomId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.authReducer);
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const { option } = useAppSelector((state) => state.roomOptionsReducer);

  useEffect(() => {
    familyRoomListeners(socket, dispatch);
    errorListeners(socket, navigate, dispatch);

    // Setting the current room when the page refresh.
    dispatch(setCurrentRoom(roomId));

    socket.connect();

    return () => {
      removeFamilyRoomListeners(socket);
      removeErrorListeners(socket);

      socket.disconnect();
    };
  }, []);

  return (
    <Box>
      <RoomHeader>{currentRoom?.roomName}</RoomHeader>

      <WelcomeTitle />

      <RoomOptions />

      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ padding: "10px" }}>
          {option === "tasks" && <AllTasks />}
          {option === "calender" && <Calender />}
          {option === "members" && <AllMembers />}
        </Box>
      )}
    </Box>
  );
};

export default FamilyRoom;
