import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import DeleteModalButtons from "../../../Modal-Common/DeleteModalButtons";
import { hideModal } from "../../../../utils/helpers/hideModal";
import { deleteMemberSocket } from "../../../../socket/FamilyRoom/EventEmitters";

const LeaveRoomModal = () => {
  const dispatch = useAppDispatch();
  const { memberForDelete } = useAppSelector((state) => state.membersReducer);
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);

  const handleLeaveRoom = () => {
    if (memberForDelete && currentRoom) {
      deleteMemberSocket(dispatch, memberForDelete.userId, currentRoom._id);
    }
  };

  return (
    <ModalComponent>
      <Typography>
        Are you sure you want to leave "{currentRoom?.roomName}" room?
      </Typography>
      <DeleteModalButtons
        handleDelete={handleLeaveRoom}
        handleCancel={() => hideModal(dispatch)}
        buttonOption={"Leave"}
      />
    </ModalComponent>
  );
};

export default LeaveRoomModal;
