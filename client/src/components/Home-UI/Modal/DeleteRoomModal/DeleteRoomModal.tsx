import ModalComponent from "../../../Modal-Common/ModalComponent";
import { Typography } from "@mui/material";
import YesOrNoModalButtons from "../../../Modal-Common/YesOrNoModalButtons";
import { setHideModal } from "@Redux/slices/Modal/modal-slice";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { deleteRoomSocket } from "@Redux/actions/rooms-actions";

const DeleteRoomModal = () => {
  const dispatch = useAppDispatch();
  const { selectedRoom } = useAppSelector((state) => state.roomsReducer);

  const handleDeleteRoom = () => {
    dispatch(deleteRoomSocket(selectedRoom?._id));
  };

  return (
    <ModalComponent>
      <Typography variant="h6">
        Are you sure you want to delete "{selectedRoom?.roomName}" room?
      </Typography>
      <YesOrNoModalButtons
        width="6rem"
        handleOperation={handleDeleteRoom}
        handleCancel={() => dispatch(setHideModal())}
        buttonOption={"Delete"}
      />
    </ModalComponent>
  );
};

export default DeleteRoomModal;
