import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import YesOrNoModalButtons from "../../../Modal-Common/YesOrNoModalButtons";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import { deleteMemberSocket } from "../../../../redux/actions/rooms-actions";
import { IUser } from "../../../../types";
import { setHideModal } from "../../../../redux/slices/Modal/modal-slice";

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
          memberId: memberAsTypeUser._id,
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
