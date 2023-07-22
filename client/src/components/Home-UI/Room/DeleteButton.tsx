import { useAppDispatch } from "../../../redux/hooks";
import { setCurrentRoom } from "../../../redux/slices/Room/rooms-slice";
import { setShowModal } from "../../../redux/slices/Modal/modal-slice";
import RoomButton from "./common/RoomButton";
import { IRoom } from "../../../types";

interface Props {
  room: IRoom;
}

const DeleteButton = ({ room }: Props) => {
  const dispatch = useAppDispatch();

  const handleOpenDeleteModal = () => {
    dispatch(setShowModal({ isOpen: true, modalStatus: "delete" }));
    dispatch(setCurrentRoom(room));
  };

  return (
    <RoomButton
      handleClick={handleOpenDeleteModal}
      buttonWidth="67px"
    >
      Delete
    </RoomButton>
  );
};

export default DeleteButton;
