import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import WelcomeTitle from "../../components/FamilyRoom-UI/WelcomeTitle/WelcomeTitle";
import RoomHeader from "../../components/FamilyRoom-UI/RoomHeader/RoomHeader";
import RoomOptions from "../../components/FamilyRoom-UI/RoomOptions/RoomOptions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Tasks from "../../components/FamilyRoom-UI/Tasks/Tasks";
import Calender from "../../components/FamilyRoom-UI/Calender/Calender";
import Members from "../../components/FamilyRoom-UI/Members/Members";
import MenuModal from "../../components/FamilyRoom-UI/MenuModal/MenuModal";
import { useEffect, useState } from "react";
import { setCurrentRoom } from "../../redux/slices/Room/rooms-slice";

const FamilyRoom = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentRoom(state.currentRoom));
  }, []);

  const { currentRoom } = useAppSelector((state) => state.roomsReducer);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { option } = useAppSelector((state) => state.roomOptionsReducer);

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
        {option === "members" && <Members />}
      </Box>
    </Box>
  );
};

export default FamilyRoom;
