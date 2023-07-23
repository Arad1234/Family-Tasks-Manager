import { useAppDispatch } from "../../../../redux/hooks";
import { setCurrentRoom } from "../../../../redux/slices/Room/rooms-slice";
import { setShowModal } from "../../../../redux/slices/Modal/modal-slice";
import { IRoom } from "../../../../types";
import "./DeleteButton.scss";
import { MdDelete } from "react-icons/md";

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
    <MdDelete
      color="red"
      className="delete-button"
      size={25}
      onClick={handleOpenDeleteModal}
    />
  );
};

export default DeleteButton;
