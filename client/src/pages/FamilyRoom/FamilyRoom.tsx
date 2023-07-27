import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import WelcomeTitle from "../../components/FamilyRoom-UI/WelcomeTitle/WelcomeTitle";
import RoomHeader from "../../components/FamilyRoom-UI/RoomHeader/RoomHeader";
import RoomOptions from "../../components/FamilyRoom-UI/RoomOptions/RoomOptions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AllTasks from "../../components/FamilyRoom-UI/Tasks/AllTasks";
import Calender from "../../components/FamilyRoom-UI/Calender/Calender";
import { useEffect } from "react";
import { setCurrentRoom, setRooms } from "../../redux/slices/Rooms/rooms-slice";
import AllMembers from "../../components/FamilyRoom-UI/Members/AllMembers";
import { familyRoomListeners } from "../../socket/FamilyRoom/familyRoomListeners";
import { socket } from "../../socket/socket";
import { removeFamilyRoomListeners } from "../../socket/FamilyRoom/removeFamilyRoomListeners";
import Loader from "../../components/Loader/Loader";
import { removeErrorListeners } from "../../socket/Errors/removeErrorListeners";
import { errorListeners } from "../../socket/Errors/errorListeners";

const FamilyRoom = () => {
  const { state: roomsState } = useLocation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.authReducer);
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const { option } = useAppSelector((state) => state.roomOptionsReducer);

  useEffect(() => {
    familyRoomListeners(socket, dispatch);
    errorListeners(socket, navigate, dispatch);

    // Setting the rooms when the page refresh.
    dispatch(setRooms(roomsState.rooms));
    dispatch(setCurrentRoom(roomsState.currentRoom));

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
