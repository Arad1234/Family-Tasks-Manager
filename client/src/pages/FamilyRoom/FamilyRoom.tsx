import { Box, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import WelcomeTitle from "../../components/FamilyRoom-UI/WelcomeTitle/WelcomeTitle";
import RoomHeader from "../../components/FamilyRoom-UI/RoomHeader/RoomHeader";
import RoomOptions from "../../components/FamilyRoom-UI/RoomOptions/RoomOptions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AllTasks from "../../components/FamilyRoom-UI/Tasks/AllTasks";
import { useEffect } from "react";
import { setCurrentRoom } from "../../redux/slices/Rooms/rooms-slice";
import AllMembers from "../../components/FamilyRoom-UI/Members/AllMembers";
import { familyRoomListeners } from "../../socket/FamilyRoom/Listeners";
import { socket } from "../../socket/socket";
import { removeFamilyRoomListeners } from "../../socket/FamilyRoom/RemoveListeners";
import Loader from "../../components/Loader/Loader";
import { removeErrorListeners } from "../../socket/Errors/RemoveListeners";
import { errorListeners } from "../../socket/Errors/Listeners";
import { useSession } from "@supabase/auth-helpers-react";
import { fetchGoogleCalendarEvents } from "../../Supabase/Api";
import DeleteEventModal from "../../components/FamilyRoom-UI/Modal/DeleteEventModal/DeleteEventModal";
import MemberTasks from "../../components/FamilyRoom-UI/Members/MemberTasks/MemberTasks";
import DeleteMemberModal from "../../components/FamilyRoom-UI/Modal/DeleteMemberModal/DeleteMemberModal";
import AssignTaskModal from "../../components/FamilyRoom-UI/Modal/AssignTaskModal/AssignTaskModal";
import { commonListeners } from "../../socket/Common/Listeners";
import { removeCommonListeners } from "../../socket/Common/RemoveListeners";

const FamilyRoom = () => {
  const { roomId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const session = useSession();

  const { memberForTasks } = useAppSelector((state) => state.membersReducer);
  const { loading } = useAppSelector((state) => state.authReducer);
  const { currentRoom, rooms } = useAppSelector((state) => state.roomsReducer);
  const { option } = useAppSelector((state) => state.roomOptionsReducer);
  const { modalStatus } = useAppSelector((state) => state.modalReducer);

  useEffect(() => {
    familyRoomListeners(socket, dispatch);
    commonListeners(socket, dispatch);
    errorListeners(socket, navigate, dispatch);

    socket.connect();

    return () => {
      removeFamilyRoomListeners(socket);
      removeErrorListeners(socket);
      removeCommonListeners(socket);

      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (session?.provider_token) {
      fetchGoogleCalendarEvents(session, dispatch);
    }
  }, [session?.provider_token]);

  useEffect(() => {
    // Setting the current room when the page refresh or navigates to a different family room.
    dispatch(setCurrentRoom(roomId));
  }, [roomId, rooms]); // When the user add task, "rooms" state is changing, therefore I need to dispatch again the current room to reflect the changes.

  return (
    <>
      <RoomHeader>{currentRoom?.roomName}</RoomHeader>

      <WelcomeTitle />

      <RoomOptions />

      <Divider sx={{ margin: "10px 0" }} />

      {modalStatus === "deleteCalendarEvent" && <DeleteEventModal />}
      {modalStatus === "deleteMember" && <DeleteMemberModal />}
      {modalStatus === "assignTask" && <AssignTaskModal />}

      {loading || !session ? (
        <Loader height="65vh" />
      ) : (
        <Box sx={{ padding: "10px" }}>
          {option === "tasks" && currentRoom && <AllTasks />}
          {option === "members" &&
            (memberForTasks ? <MemberTasks /> : <AllMembers />)}
        </Box>
      )}
    </>
  );
};

export default FamilyRoom;
