import { useAppDispatch } from "@Redux/hooks";
import { setOpenModal } from "@Redux/slices/Modal/modal-slice";
import { setSelectedRoom } from "@Redux/slices/Rooms/rooms-slice";
import { IRoom } from "@Types/index";
import { JOIN_ROOM_MODAL } from "@Utils/constants/modalStatusConstants";
import RoomButtonStyled from "./RoomButton/RoomButton.styled";
import { Box } from "@mui/material";

interface Props {
  room: IRoom;
}

const JoinButton = ({ room }: Props) => {
  const dispatch = useAppDispatch();

  const handleOpenJoinRoomModal = () => {
    dispatch(setOpenModal(JOIN_ROOM_MODAL));

    // When the "Join" button is clicked I set the room to the redux store.
    dispatch(setSelectedRoom(room));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <RoomButtonStyled
        handleClick={handleOpenJoinRoomModal}
        width="130px"
      >
        Join
      </RoomButtonStyled>
    </Box>
  );
};

export default JoinButton;
