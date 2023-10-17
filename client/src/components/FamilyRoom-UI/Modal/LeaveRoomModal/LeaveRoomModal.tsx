import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import YesOrNoModalButtons from "../../../Modal-Common/YesOrNoModalButtons";
import { deleteMemberSocket } from "../../../../socket/FamilyRoom/EventEmitters";
import { setHideModal } from "../../../../redux/slices/Modal/modal-slice";
import { IRoom } from "../../../../types";

const LeaveRoomModal = () => {
  const dispatch = useAppDispatch();
  const memberForDelete = useAppSelector(
    (state) => state.membersReducer.memberForDelete as string
  );
  const familyRoom = useAppSelector(
    (state) => state.familyRoomReducer.familyRoom as IRoom
  );

  const handleLeaveRoom = () => {
    deleteMemberSocket(dispatch, memberForDelete, familyRoom._id, "self");
  };

  return (
    <ModalComponent>
      <Typography>
        Are you sure you want to leave "{familyRoom.roomName}" room?
        <Typography
          sx={{ display: "block", fontWeight: "600" }}
          component={"span"}
        >
          All your tasks will be deleted
        </Typography>
      </Typography>
      <YesOrNoModalButtons
        width="6rem"
        handleOperation={handleLeaveRoom}
        handleCancel={() => dispatch(setHideModal())}
        buttonOption={"Leave"}
      />
    </ModalComponent>
  );
};

export default LeaveRoomModal;
