import ModalComponent from "../../../Modal-Common/ModalComponent";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Typography } from "@mui/material";
import { deleteRoomSocket } from "../../../../socket/Rooms/EventEmitters";
import DeleteModalButtons from "../../../Modal-Common/DeleteModalButtons";
import { setHideModal } from "../../../../redux/slices/Modal/modal-slice";

const DeleteRoomModal = () => {
  const dispatch = useAppDispatch();
  const { selectedRoom } = useAppSelector((state) => state.roomsReducer);

  const handleDeleteRoom = () => {
    deleteRoomSocket(dispatch, selectedRoom?._id);
  };

  return (
    <ModalComponent>
      <Typography variant="h6">
        Are you sure you want to delete "{selectedRoom?.roomName}" room?
      </Typography>
      <DeleteModalButtons
        handleDelete={handleDeleteRoom}
        handleCancel={() => dispatch(setHideModal())}
        buttonOption={"Delete"}
      />
    </ModalComponent>
  );
};

export default DeleteRoomModal;
