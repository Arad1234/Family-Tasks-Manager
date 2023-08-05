import { IMember } from "../../../../types";
import { useAppDispatch } from "../../../../redux/hooks";
import { setMemberForDelete } from "../../../../redux/slices/FamilyRoom/members-slice";
import { setCurrentRoom } from "../../../../redux/slices/Rooms/rooms-slice";
import { setShowModal } from "../../../../redux/slices/Modal/modal-slice";
import RoomButton from "./Common/RoomButton";

interface Props {
  roomId: string;
  member: IMember;
}

const LeaveRoomButton = ({ roomId, member }: Props) => {
  const dispatch = useAppDispatch();

  const handleShowLeaveRoomModal = () => {
    dispatch(setMemberForDelete(member));
    dispatch(setCurrentRoom(roomId));
    dispatch(setShowModal({ isOpen: true, modalStatus: "leaveRoom" }));
  };

  return (
    <RoomButton
      backgroundColor="200, 50, 50"
      handleClick={handleShowLeaveRoomModal}
      width="70px"
    >
      Leave
    </RoomButton>
  );
};

export default LeaveRoomButton;
