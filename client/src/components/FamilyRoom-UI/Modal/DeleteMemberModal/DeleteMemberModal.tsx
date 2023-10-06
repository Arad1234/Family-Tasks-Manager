import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import DeleteModalButtons from "../../../Modal-Common/DeleteModalButtons";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import { deleteMemberSocket } from "../../../../socket/FamilyRoom/EventEmitters";
import { IUser } from "../../../../types";
import { setHideModal } from "../../../../redux/slices/Modal/modal-slice";

const DeleteMemberModal = () => {
  const dispatch = useAppDispatch();
  const memberForDelete = useAppSelector(
    (state) => state.membersReducer.memberForDelete
  );
  const familyRoom = useAppSelector((state) => state.roomsReducer.familyRoom);

  const memberAsTypeUser = memberForDelete as IUser;

  const handleDeleteMember = () => {
    if (memberAsTypeUser && familyRoom) {
      deleteMemberSocket(dispatch, memberAsTypeUser._id, familyRoom._id);
    }
  };

  const handleCancel = () => {
    dispatch(setHideModal());
  };

  return (
    <ModalComponent>
      <Typography>
        Are you sure to want to delete {memberAsTypeUser.username} from family
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
