import ModalComponent from "../../../Modal-Common/ModalComponent";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setShowModal } from "../../../../redux/slices/Modal/modal-slice";
import { Typography } from "@mui/material";
import { deleteRoomSocket } from "../../../../socket/Rooms/EventEmitters";
import DeleteModalButtons from "../../../Modal-Common/DeleteModalButtons";
import { IRoom } from "../../../../types";

const DeleteRoomModal = () => {
  const dispatch = useAppDispatch();
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);

  const handleDeleteRoom = () => {
    deleteRoomSocket(dispatch, (currentRoom as IRoom)._id);
  };

  const handleCancel = () => {
    dispatch(setShowModal({ isOpen: false, status: "" }));
  };

  return (
    <ModalComponent>
      <Typography variant="h6">
        Are you sure you want to delete "{currentRoom?.roomName}" room?
      </Typography>
      <DeleteModalButtons
        handleDelete={handleDeleteRoom}
        handleCancel={handleCancel}
        buttonOption={"Delete"}
      />
    </ModalComponent>
  );
};

export default DeleteRoomModal;
