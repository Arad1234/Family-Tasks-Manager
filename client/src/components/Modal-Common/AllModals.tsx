import { useAppSelector } from "../../redux/hooks";
import RemovedYouMessageModal from "../Common/RemovedYouMessageModal";
import SignOutModal from "../Common/SignOutModal";
import AssignTaskModal from "../FamilyRoom-UI/Modal/AssignTaskModal/AssignTaskModal";
import DeleteEventModal from "../FamilyRoom-UI/Modal/DeleteEventModal/DeleteEventModal";
import DeleteMemberModal from "../FamilyRoom-UI/Modal/DeleteMemberModal/DeleteMemberModal";
import LeaveRoomModal from "../FamilyRoom-UI/Modal/LeaveRoomModal/LeaveRoomModal";
import CreateRoomModal from "../Home-UI/Modal/CreateRoomModal/CreateRoomModal";
import DeleteRoomModal from "../Home-UI/Modal/DeleteRoomModal/DeleteRoomModal";
import JoinRoomModal from "../Home-UI/Modal/JoinRoomModal/JoinRoomModal";

const AllModals = () => {
  const modalStatus = useAppSelector((state) => state.modalReducer.modalStatus);

  return (
    <>
      {modalStatus === "createRoom" && <CreateRoomModal />}
      {modalStatus === "joinRoom" && <JoinRoomModal />}
      {modalStatus === "deleteRoom" && <DeleteRoomModal />}
      {modalStatus === "adminRemovedYou" && <RemovedYouMessageModal />}
      {modalStatus === "deleteCalendarEvent" && <DeleteEventModal />}
      {modalStatus === "deleteMember" && <DeleteMemberModal />}
      {modalStatus === "assignTask" && <AssignTaskModal />}
      {modalStatus === "leaveRoom" && <LeaveRoomModal />}
      {modalStatus === "signOut" && <SignOutModal />}
    </>
  );
};

export default AllModals;
