import { Box } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import WelcomeTitle from "../../components/FamilyRoom-UI/WelcomeTitle/WelcomeTitle";
import RoomHeader from "../../components/FamilyRoom-UI/RoomHeader/RoomHeader";
import RoomOptions from "../../components/FamilyRoom-UI/RoomOptions/RoomOptions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AllTasks from "../../components/FamilyRoom-UI/YourTasks/AllTasks";
import { useEffect, useState } from "react";
import AllMembers from "../../components/FamilyRoom-UI/Members/AllMembers";
import { familyRoomListeners } from "../../socket/FamilyRoom/Listeners";
import { removeFamilyRoomListeners } from "../../socket/FamilyRoom/RemoveListeners";
import Loader from "../../components/Loader/Loader";
import { removeErrorListeners } from "../../socket/Errors/RemoveListeners";
import { errorListeners } from "../../socket/Errors/Listeners";
import { useSession } from "@supabase/auth-helpers-react";
import { fetchGoogleCalendarEvents } from "../../supabase/Api";
import MemberTasks from "../../components/FamilyRoom-UI/Members/MemberTasks/MemberTasks";
import { removeCommonListeners } from "../../socket/Common/RemoveListeners";
import variables from "../../sass/variables.module.scss";
import { getCurrentRoomSocket } from "../../socket/FamilyRoom/EventEmitters";
import removeSocketIDListeners from "../../socket/SocketID/RemoveListeners";
import AllModals from "../../components/Modal-Common/AllModals";
import { commonListeners } from "../../socket/Common/Listeners";
import socketIDListeners from "../../socket/SocketID/Listeners";

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
