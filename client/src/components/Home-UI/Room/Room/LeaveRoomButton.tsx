import { Button } from "@mui/material";
import { IMember } from "../../../../types";
import { useAppDispatch } from "../../../../redux/hooks";
import { setMemberForDelete } from "../../../../redux/slices/FamilyRoom/members-slice";
import { setCurrentRoom } from "../../../../redux/slices/Rooms/rooms-slice";
import { setShowModal } from "../../../../redux/slices/Modal/modal-slice";

interface Props {
  roomId: string;
  member: IMember;
}

const LeaveRoomButton = ({ roomId, member }: Props) => {
  const dispatch = useAppDispatch();

  const handleShowLeaveRoomModal = () => {
    dispatch(setMemberForDelete(member));
    dispatch(setCurrentRoom(roomId));
    dispatch(setShowModal({ isOpen: true, modalStatus: "leaveRoom" }));
  };

  return (
    <Button
      sx={{
        width: "130px",
        borderRadius: "6px",
        background: "rgba(200, 50, 50, 0.7)",
        color: "whitesmoke",
        height: "40px",
        textTransform: "none",
        fontSize: "16px",
        ":hover": { background: "rgba(200, 50, 50, 0.5)" },
      }}
      onClick={handleShowLeaveRoomModal}
      variant="contained"
    >
      Leave
    </Button>
  );
};

export default LeaveRoomButton;
