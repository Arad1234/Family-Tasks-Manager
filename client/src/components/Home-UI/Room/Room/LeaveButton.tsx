import { useAppDispatch } from "../../../../redux/hooks";
import { setMemberForDelete } from "../../../../redux/slices/FamilyRoom/members-slice";
import { setSelectedRoom } from "../../../../redux/slices/Rooms/rooms-slice";
import { setShowModal } from "../../../../redux/slices/Modal/modal-slice";
import variables from "../../../../sass/variables.module.scss";
import RoomButton from "./Common/RoomButton";
import { IRoom } from "../../../../types";

interface Props {
  room: IRoom;
  memberId: string;
}

const LeaveButton = ({ room, memberId }: Props) => {
  const dispatch = useAppDispatch();

  const handleShowLeaveRoomModal = () => {
    dispatch(setMemberForDelete(memberId));
    dispatch(setSelectedRoom(room));
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
