import { useAppDispatch } from "../../../redux/hooks";
import { setShowModal } from "../../../redux/slices/Modal/modal-slice";
import { setCurrentRoom } from "../../../redux/slices/Room/rooms-slice";
import { IRoom } from "../../../types";
import RoomButton from "./common/RoomButton";

interface Props {
  room: IRoom;
}

const ShowMembersButton = ({ room }: Props) => {
  const dispatch = useAppDispatch();
  const handleShowMembers = () => {
    dispatch(setCurrentRoom(room));
    dispatch(setShowModal({ isOpen: true, modalStatus: "members" }));
  };
  return (
    <RoomButton
      handleClick={handleShowMembers}
      buttonWidth="147px"
    >
      Show Members
    </RoomButton>
  );
};

export default ShowMembersButton;
