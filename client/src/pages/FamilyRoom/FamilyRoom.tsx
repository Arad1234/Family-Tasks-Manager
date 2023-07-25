import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import WelcomeTitle from "../../components/FamilyRoom-UI/WelcomeTitle/WelcomeTitle";
import RoomHeader from "../../components/FamilyRoom-UI/RoomHeader/RoomHeader";
import RoomOptions from "../../components/FamilyRoom-UI/RoomOptions/RoomOptions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Tasks from "../../components/FamilyRoom-UI/Tasks/Tasks";
import Calender from "../../components/FamilyRoom-UI/Calender/Calender";
import { useEffect } from "react";
import { setCurrentRoom, setRooms } from "../../redux/slices/Rooms/rooms-slice";
import AllMembers from "../../components/FamilyRoom-UI/Members/AllMembers";
import { familyRoomListeners } from "../../socket/FamilyRoom/familyRoomListeners";
import { socket } from "../../socket/socket";
import { removeFamilyRoomListeners } from "../../socket/FamilyRoom/removeFamilyRoomListeners";
import Loader from "../../components/Loader/Loader";

const FamilyRoom = () => {
  const { state: roomsState } = useLocation();
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.authReducer);
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const { option } = useAppSelector((state) => state.roomOptionsReducer);

  useEffect(() => {
    familyRoomListeners(socket, dispatch);

    // Setting the rooms when the page refresh.
    dispatch(setRooms(roomsState.rooms));
    dispatch(setCurrentRoom(roomsState.currentRoom));

    socket.connect();

    return () => {
      removeFamilyRoomListeners(socket);
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
          {option === "tasks" && <Tasks />}
          {option === "calender" && <Calender />}
          {option === "members" && <AllMembers />}
        </Box>
      )}
    </Box>
  );
};

export default FamilyRoom;
