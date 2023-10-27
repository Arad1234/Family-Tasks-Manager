import { Typography } from "@mui/material";
import YesOrNoModalButtons from "../../../Common/Modal/YesOrNoModalButtons";
import ModalComponent from "../../../Common/Modal/ModalComponent";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { IMember } from "@Types/index";
import { setHideModal } from "@Redux/slices/Modal/modal-slice";
import { deleteMemberSocket } from "@Redux/actions/rooms-actions";

const DeleteMemberModal = () => {
  const dispatch = useAppDispatch();
  const memberForDelete = useAppSelector(
    (state) => state.membersReducer.memberForDelete as IMember
  );
  const familyRoom = useAppSelector(
    (state) => state.familyRoomReducer.familyRoom
  );

  const handleDeleteMember = () => {
    if (memberForDelete && familyRoom) {
      dispatch(
        deleteMemberSocket({
          memberId: memberForDelete.userId,
          roomId: familyRoom._id,
          source: "admin",
        })
      );
    }
  };

  const handleCancel = () => {
    dispatch(setHideModal());
  };

  return (
    <ModalComponent>
      <Typography>
        Are you sure to want to delete {memberForDelete.username} from family
        members?
      </Typography>
      <YesOrNoModalButtons
        handleOperation={handleDeleteMember}
        handleCancel={handleCancel}
        buttonOption={"Delete"}
      />
    </ModalComponent>
  );
};

export default DeleteMemberModal;
