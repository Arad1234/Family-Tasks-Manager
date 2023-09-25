import { IMember } from "../../../../types";
import { useAppDispatch } from "../../../../redux/hooks";
import { setMemberForDelete } from "../../../../redux/slices/FamilyRoom/members-slice";
import { setCurrentRoom } from "../../../../redux/slices/Rooms/rooms-slice";
import { setShowModal } from "../../../../redux/slices/Modal/modal-slice";
import variables from "../../../../sass/variables.module.scss";
import RoomButton from "./Common/RoomButton";

interface Props {
  roomId: string;
  member: IMember;
}

const LeaveButton = ({ roomId, member }: Props) => {
  const dispatch = useAppDispatch();

  const handleShowLeaveRoomModal = () => {
    dispatch(setMemberForDelete(member));
    dispatch(setCurrentRoom(roomId));
    dispatch(setShowModal({ isOpen: true, modalStatus: "leaveRoom" }));
  };

  return (
    <RoomButton
      handleClick={handleShowLeaveRoomModal}
      backgroundColor={variables.actionColor}
      width="120px"
    >
      Leave
    </RoomButton>
  );
};

export default LeaveButton;
