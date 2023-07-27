import { Button } from "@mui/material";
import { useAppDispatch } from "../../../../redux/hooks";
import { setShowModal } from "../../../../redux/slices/Modal/modal-slice";
import { setCurrentRoom } from "../../../../redux/slices/Rooms/rooms-slice";
import { IRoom } from "../../../../types";

interface Props {
  room: IRoom;
}

const JoinButton = ({ room }: Props) => {
  const dispatch = useAppDispatch();

  const handleOpenJoinModal = () => {
    dispatch(setShowModal({ isOpen: true, modalStatus: "join" }));

    // When the "Join" button is clicked I set the roomId to the redux store.
    dispatch(setCurrentRoom(room));
  };

  return (
    <Button
      sx={{
        width: "60px",
        borderRadius: "25px",
        backgroundColor: "rgb(100, 230, 189)",
        ":hover": { backgroundColor: "rgba(100, 230, 189, 0.8)" },
      }}
      onClick={handleOpenJoinModal}
      variant="contained"
    >
      Join
    </Button>
  );
};

export default JoinButton;
