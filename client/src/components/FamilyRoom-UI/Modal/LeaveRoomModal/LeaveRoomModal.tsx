import { Typography } from "@mui/material";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import YesOrNoModalButtons from "../../../Modal-Common/YesOrNoModalButtons";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { deleteMemberSocket } from "@Redux/actions/rooms-actions";
import { setHideModal } from "@Redux/slices/Modal/modal-slice";
import { IRoom } from "@Types/index";

const LeaveRoomModal = () => {
  const dispatch = useAppDispatch();
  const memberForDelete = useAppSelector(
    (state) => state.membersReducer.memberForDelete as string
  );
  const familyRoom = useAppSelector(
    (state) => state.familyRoomReducer.familyRoom as IRoom
  );

  const handleLeaveRoom = () => {
    dispatch(
      deleteMemberSocket({
        memberId: memberForDelete,
        roomId: familyRoom._id,
        source: "self",
      })
    );
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
