import ModalComponent from "../../../Modal-Common/ModalComponent";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setShowModal } from "../../../../redux/slices/Modal/modal-slice";
import { Typography } from "@mui/material";
import ModalButtons from "./ModalButtons";
import { deleteRoomSocket } from "../../../../socket/socketEventEmitters";

const DeleteRoomModal = () => {
  const dispatch = useAppDispatch();
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const handleDeleteRoom = () => {
    deleteRoomSocket(dispatch, currentRoom._id);
  };

  const handleCancel = () => {
    dispatch(setShowModal({ isOpen: false, status: "" }));
  };
  return (
    <ModalComponent>
      <Typography variant="h6">Are you sure you want to delete?</Typography>
      <ModalButtons
        handleDeleteRoom={handleDeleteRoom}
        handleCancel={handleCancel}
      />
    </ModalComponent>
  );
};

export default DeleteRoomModal;
