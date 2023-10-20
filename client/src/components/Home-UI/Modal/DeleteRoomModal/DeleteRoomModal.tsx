import ModalComponent from "../../../Modal-Common/ModalComponent";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Typography } from "@mui/material";
import { deleteRoomSocket } from "../../../../redux/actions/rooms-actions";
import YesOrNoModalButtons from "../../../Modal-Common/YesOrNoModalButtons";
import { setHideModal } from "../../../../redux/slices/Modal/modal-slice";

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
