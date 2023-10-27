import { useAppSelector } from "@Redux/hooks";
import RemovedYouMessageModal from "../Common/RemovedYouMessageModal";
import SignOutModal from "../Common/SignOutModal";
import AssignTaskModal from "../FamilyRoom-UI/Modal/AssignTaskModal/AssignTaskModal";
import DeleteEventModal from "../FamilyRoom-UI/Modal/DeleteEventModal/DeleteEventModal";
import DeleteMemberModal from "../FamilyRoom-UI/Modal/DeleteMemberModal/DeleteMemberModal";
import LeaveRoomModal from "../FamilyRoom-UI/Modal/LeaveRoomModal/LeaveRoomModal";
import CreateRoomModal from "../Home-UI/Modal/CreateRoomModal/CreateRoomModal";
import DeleteRoomModal from "../Home-UI/Modal/DeleteRoomModal/DeleteRoomModal";
import JoinRoomModal from "../Home-UI/Modal/JoinRoomModal/JoinRoomModal";
import {
  ADMIN_REMOVED_YOU_MODAL,
  ASSIGN_TASK_MODAL,
  CREATE_ROOM_MODAL,
  DELETE_CALENDAR_EVENT_MODAL,
  DELETE_MEMBER_MODAL,
  DELETE_ROOM_MODAL,
  JOIN_ROOM_MODAL,
  LEAVE_ROOM_MODAL,
  SIGN_OUT_MODAL,
} from "@Utils/constants/modalStatusConstants";

const AllModals = () => {
  const modalStatus = useAppSelector((state) => state.modalReducer.modalStatus);

  return (
    <>
      {modalStatus === CREATE_ROOM_MODAL && <CreateRoomModal />}
      {modalStatus === JOIN_ROOM_MODAL && <JoinRoomModal />}
      {modalStatus === DELETE_ROOM_MODAL && <DeleteRoomModal />}
      {modalStatus === ADMIN_REMOVED_YOU_MODAL && <RemovedYouMessageModal />}
      {modalStatus === DELETE_CALENDAR_EVENT_MODAL && <DeleteEventModal />}
      {modalStatus === DELETE_MEMBER_MODAL && <DeleteMemberModal />}
      {modalStatus === ASSIGN_TASK_MODAL && <AssignTaskModal />}
      {modalStatus === LEAVE_ROOM_MODAL && <LeaveRoomModal />}
      {modalStatus === SIGN_OUT_MODAL && <SignOutModal />}
    </>
  );
};

export default AllModals;
