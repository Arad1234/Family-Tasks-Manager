import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import DeleteModalButtons from "../../../Modal-Common/DeleteModalButtons";
import { hideModal } from "../../../../utils/helpers/hideModal";
import { deleteMemberSocket } from "../../../../socket/FamilyRoom/EventEmitters";

const LeaveRoomModal = () => {
  const dispatch = useAppDispatch();
  const memberForDelete = useAppSelector(
    (state) => state.membersReducer.memberForDelete
  );
  const selectedRoom = useAppSelector(
    (state) => state.roomsReducer.selectedRoom
  );
  const handleLeaveRoom = () => {
    if (memberForDelete && selectedRoom) {
      deleteMemberSocket(dispatch, memberForDelete as string, selectedRoom._id);
    }
  };

  return (
    <ModalComponent>
      <Typography>
        Are you sure you want to leave "{selectedRoom?.roomName}" room?
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
