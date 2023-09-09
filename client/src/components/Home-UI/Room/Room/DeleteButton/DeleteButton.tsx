import { useAppDispatch } from "../../../../../redux/hooks";
import { setCurrentRoom } from "../../../../../redux/slices/Rooms/rooms-slice";
import { setShowModal } from "../../../../../redux/slices/Modal/modal-slice";
import { IRoom } from "../../../../../types";
import "./DeleteButton.scss";
import { MdDelete } from "react-icons/md";

interface Props {
  room: IRoom;
}

const DeleteButton = ({ room }: Props) => {
  const dispatch = useAppDispatch();

  const handleOpenDeleteModal = () => {
    dispatch(setShowModal({ isOpen: true, modalStatus: "delete" }));
    dispatch(setCurrentRoom(room._id));
  };

  return (
    <MdDelete
      color="red"
      size={30}
      onClick={handleOpenDeleteModal}
    />
  );
};

export default DeleteButton;
