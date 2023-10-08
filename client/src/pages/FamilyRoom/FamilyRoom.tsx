import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import WelcomeTitle from "../../components/FamilyRoom-UI/WelcomeTitle/WelcomeTitle";
import RoomHeader from "../../components/FamilyRoom-UI/RoomHeader/RoomHeader";
import RoomOptions from "../../components/FamilyRoom-UI/RoomOptions/RoomOptions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AllTasks from "../../components/FamilyRoom-UI/YourTasks/AllTasks";
import { useEffect, useState } from "react";
import AllMembers from "../../components/FamilyRoom-UI/Members/AllMembers";
import { familyRoomListeners } from "../../socket/FamilyRoom/Listeners";
import { socket } from "../../socket/socket";
import { removeFamilyRoomListeners } from "../../socket/FamilyRoom/RemoveListeners";
import Loader from "../../components/Loader/Loader";
import { removeErrorListeners } from "../../socket/Errors/RemoveListeners";
import { errorListeners } from "../../socket/Errors/Listeners";
import { useSession } from "@supabase/auth-helpers-react";
import { fetchGoogleCalendarEvents } from "../../supabase/Api";
import DeleteEventModal from "../../components/FamilyRoom-UI/Modal/DeleteEventModal/DeleteEventModal";
import MemberTasks from "../../components/FamilyRoom-UI/Members/MemberTasks/MemberTasks";
import DeleteMemberModal from "../../components/FamilyRoom-UI/Modal/DeleteMemberModal/DeleteMemberModal";
import AssignTaskModal from "../../components/FamilyRoom-UI/Modal/AssignTaskModal/AssignTaskModal";
import { commonListeners } from "../../socket/Common/Listeners";
import { removeCommonListeners } from "../../socket/Common/RemoveListeners";
import variables from "../../sass/variables.module.scss";
import { getCurrentRoomSocket } from "../../socket/FamilyRoom/EventEmitters";
import LeaveRoomModal from "../../components/FamilyRoom-UI/Modal/LeaveRoomModal/LeaveRoomModal";

const FamilyRoom = () => {
  const { roomId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const session = useSession();
  const [option, setOption] = useState<"tasks" | "members">("tasks");

  const memberForTasks = useAppSelector(
    (state) => state.membersReducer.memberForTasks
  );
  const loading = useAppSelector((state) => state.authReducer.loading);
  const familyRoom = useAppSelector(
    (state) => state.familyRoomReducer.familyRoom
  );
  const modalStatus = useAppSelector((state) => state.modalReducer.modalStatus);

  useEffect(() => {
    familyRoomListeners(socket, dispatch);
    commonListeners(socket, dispatch, navigate);
    errorListeners(socket, navigate, dispatch);
    getCurrentRoomSocket(dispatch, roomId);

    return () => {
      removeFamilyRoomListeners(socket);
      removeErrorListeners(socket);
      removeCommonListeners(socket);
    };
  }, [roomId]);

  useEffect(() => {
    if (session?.provider_token) {
      fetchGoogleCalendarEvents(session, dispatch);
    }
  }, [session?.provider_token]);

  return !familyRoom || loading ? (
    <Loader />
  ) : (
    <>
      <RoomHeader />

      <Box
        sx={{
          backgroundColor: variables.secondaryColor,
          boxShadow: "0px 5px 8px 0px black",
        }}
      >
        <WelcomeTitle />
        <RoomOptions
          option={option}
          setOption={setOption}
        />
      </Box>

      {modalStatus === "deleteCalendarEvent" && <DeleteEventModal />}
      {modalStatus === "deleteMember" && <DeleteMemberModal />}
      {modalStatus === "assignTask" && <AssignTaskModal />}
      {modalStatus === "leaveRoom" && <LeaveRoomModal />}

      {loading ? (
        <Loader height="65vh" />
      ) : (
        <Box sx={{ padding: "10px" }}>
          {option === "tasks" && <AllTasks />}
          {option === "members" &&
            (memberForTasks ? <MemberTasks /> : <AllMembers />)}
        </Box>
      )}
    </>
  );
};

export default FamilyRoom;
