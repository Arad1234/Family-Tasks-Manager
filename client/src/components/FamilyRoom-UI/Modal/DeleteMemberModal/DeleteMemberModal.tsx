import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { hideModal } from "../../../../utils/helpers/hideModal";
import DeleteModalButtons from "../../../Modal-Common/DeleteModalButtons";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import { deleteMemberSocket } from "../../../../socket/FamilyRoom/EventEmitters";

const DeleteMemberModal = () => {
  const dispatch = useAppDispatch();
  const { memberForDelete } = useAppSelector((state) => state.membersReducer);
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);

  const handleDeleteMember = () => {
    if (memberForDelete && currentRoom) {
      deleteMemberSocket(dispatch, memberForDelete.userId, currentRoom._id);
    }
  };

  const handleCancel = () => {
    hideModal(dispatch);
  };

  return (
    <ModalComponent>
      <Typography>
        Are you sure to want to delete {memberForDelete?.username} from family
        members?
      </Typography>
      <DeleteModalButtons
        handleDelete={handleDeleteMember}
        handleCancel={handleCancel}
        buttonOption={"Delete"}
      />
    </ModalComponent>
  );
};

export default DeleteMemberModal;
