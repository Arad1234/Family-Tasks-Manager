import ModalComponent from "../../../Modal-Common/ModalComponent";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Typography } from "@mui/material";
import { deleteRoomSocket } from "../../../../socket/Rooms/EventEmitters";
import DeleteModalButtons from "../../../Modal-Common/DeleteModalButtons";
import { IRoom } from "../../../../types";
import { hideModal } from "../../../../utils/helpers/hideModal";

const DeleteRoomModal = () => {
  const dispatch = useAppDispatch();
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);

  const handleDeleteRoom = () => {
    deleteRoomSocket(dispatch, (currentRoom as IRoom)._id);
  };

  return (
    <ModalComponent>
      <Typography variant="h6">
        Are you sure you want to delete "{currentRoom?.roomName}" room?
      </Typography>
      <DeleteModalButtons
        handleDelete={handleDeleteRoom}
        handleCancel={() => hideModal(dispatch)}
        buttonOption={"Delete"}
      />
    </ModalComponent>
  );
};

export default DeleteRoomModal;
