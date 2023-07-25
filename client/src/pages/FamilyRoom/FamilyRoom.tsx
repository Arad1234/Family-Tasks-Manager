import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import WelcomeTitle from "../../components/FamilyRoom-UI/WelcomeTitle/WelcomeTitle";
import RoomHeader from "../../components/FamilyRoom-UI/RoomHeader/RoomHeader";
import RoomOptions from "../../components/FamilyRoom-UI/RoomOptions/RoomOptions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Tasks from "../../components/FamilyRoom-UI/Tasks/Tasks";
import Calender from "../../components/FamilyRoom-UI/Calender/Calender";
import MenuModal from "../../components/FamilyRoom-UI/MenuModal/MenuModal";
import { useEffect, useState } from "react";
import { setCurrentRoom, setRooms } from "../../redux/slices/Rooms/rooms-slice";
import AllMembers from "../../components/FamilyRoom-UI/Members/AllMembers";
import { familyRoomListeners } from "../../socket/FamilyRoom/familyRoomListeners";
import { socket } from "../../socket/socket";
import { removeFamilyRoomListeners } from "../../socket/FamilyRoom/removeFamilyRoomListeners";
import { extractRoomsFromLocalStorage } from "../../utils/LocalStorage/extractRooms";

const FamilyRoom = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();

  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const { option } = useAppSelector((state) => state.roomOptionsReducer);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    familyRoomListeners(socket, dispatch);

    const rooms = extractRoomsFromLocalStorage();

    // Setting the rooms when the page refresh.
    dispatch(setRooms(rooms));
    dispatch(setCurrentRoom(state.currentRoom));

    socket.connect();

    return () => {
      removeFamilyRoomListeners(socket);
      socket.disconnect();
    };
  }, []);

  return (
    <Box>
      <RoomHeader setAnchorEl={setAnchorEl}>{currentRoom.roomName}</RoomHeader>

      <MenuModal
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />

      <WelcomeTitle />

      <RoomOptions />

      <Box sx={{ padding: "10px" }}>
        {option === "tasks" && <Tasks />}
        {option === "calender" && <Calender />}
        {option === "members" && <AllMembers />}
      </Box>
    </Box>
  );
};

export default FamilyRoom;
