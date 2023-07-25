import { Button } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { setShowModal } from "../../../redux/slices/Modal/modal-slice";
import { setCurrentRoom } from "../../../redux/slices/Rooms/rooms-slice";
import { IRoom } from "../../../types";

interface Props {
  room: IRoom;
}

const ShowMembersButton = ({ room }: Props) => {
  const dispatch = useAppDispatch();
  const handleShowMembers = () => {
    dispatch(setCurrentRoom(room));
    dispatch(setShowModal({ isOpen: true, modalStatus: "members" }));
  };
  return (
    <Button
      sx={{
        background: "rgba(50, 40, 300, 0.6)",
        height: "30px",
        borderRadius: "25px",
        color: "whitesmoke",
        ":hover": { backgroundColor: "rgba(50, 40, 300, 0.5)" },
      }}
      onClick={handleShowMembers}
    >
      Show
    </Button>
  );
};

export default ShowMembersButton;
