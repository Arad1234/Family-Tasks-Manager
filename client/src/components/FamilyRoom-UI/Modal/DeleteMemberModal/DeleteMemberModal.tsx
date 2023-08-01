import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { hideModal } from "../../../../utils/helpers/hideModal";
import DeleteModalButtons from "../../../Modal-Common/DeleteModalButtons";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import { deleteMemberSocket } from "../../../../socket/FamilyRoom/EventEmitters";
import { IMember, IRoom } from "../../../../types";

const DeleteMemberModal = () => {
  const dispatch = useAppDispatch();
  const { memberForDelete } = useAppSelector((state) => state.membersReducer);
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const handleDeleteMember = () => {
    deleteMemberSocket(
      dispatch,
      (memberForDelete as IMember).userId,
      (currentRoom as IRoom)._id
    );
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
      />
    </ModalComponent>
  );
};

export default DeleteMemberModal;
