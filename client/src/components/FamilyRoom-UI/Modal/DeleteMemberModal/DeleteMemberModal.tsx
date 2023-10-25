import { Typography } from "@mui/material";
import YesOrNoModalButtons from "../../../Modal-Common/YesOrNoModalButtons";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { IUser } from "@Types/index";
import { setHideModal } from "@Redux/slices/Modal/modal-slice";
import { deleteMemberSocket } from "@Redux/actions/rooms-actions";

const DeleteMemberModal = () => {
  const dispatch = useAppDispatch();
  const memberForDelete = useAppSelector(
    (state) => state.membersReducer.memberForDelete
  );
  const familyRoom = useAppSelector(
    (state) => state.familyRoomReducer.familyRoom
  );

  const memberAsTypeUser = memberForDelete as IUser;

  const handleDeleteMember = () => {
    if (memberAsTypeUser && familyRoom) {
      dispatch(
        deleteMemberSocket({
          memberId: memberAsTypeUser.userId,
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
        Are you sure to want to delete {memberAsTypeUser.username} from family
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
