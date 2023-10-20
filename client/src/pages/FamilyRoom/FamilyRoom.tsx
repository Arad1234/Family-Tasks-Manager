import { Box } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RoomHeader from "@Components/FamilyRoom-UI/RoomHeader/RoomHeader";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import AllTasks from "@Components/FamilyRoom-UI/YourTasks/AllTasks";
import { useEffect, useState } from "react";
import AllMembers from "@Components/FamilyRoom-UI/Members/AllMembers";
import { familyRoomListeners } from "@Socket/FamilyRoom/Listeners";
import { removeFamilyRoomListeners } from "@Socket/FamilyRoom/RemoveListeners";
import Loader from "@Components/Loader/Loader";
import { removeErrorListeners } from "@Socket/Errors/RemoveListeners";
import { errorListeners } from "@Socket/Errors/Listeners";
import { useSession } from "@supabase/auth-helpers-react";
import { fetchGoogleCalendarEvents } from "../../supabase/Api";
import MemberTasks from "@Components/FamilyRoom-UI/Members/MemberTasks/MemberTasks";
import { removeCommonListeners } from "@Socket/Common/RemoveListeners";
import { getCurrentRoomSocket } from "@Socket/FamilyRoom/EventEmitters";
import removeSocketIDListeners from "@Socket/SocketID/RemoveListeners";
import AllModals from "@Components/Modal-Common/AllModals";
import { commonListeners } from "@Socket/Common/Listeners";
import socketIDListeners from "@Socket/SocketID/Listeners";
import SubHeader from "@Components/FamilyRoom-UI/SubHeader/SubHeader";

const FamilyRoom = () => {
  const { roomId } = useParams();
  const location = useLocation();
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

  useEffect(() => {
    familyRoomListeners(dispatch);
    commonListeners(dispatch, navigate);
    socketIDListeners(location, navigate, dispatch);
    errorListeners(navigate, dispatch);
    getCurrentRoomSocket(dispatch, roomId);

    return () => {
      removeFamilyRoomListeners();
      removeErrorListeners();
      removeCommonListeners();
      removeSocketIDListeners();
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

      <SubHeader
        setOption={setOption}
        option={option}
      />

      <AllModals />

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
