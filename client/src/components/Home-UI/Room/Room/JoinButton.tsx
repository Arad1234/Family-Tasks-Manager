import { useAppDispatch } from "@Redux/hooks";
import { setOpenModal } from "@Redux/slices/Modal/modal-slice";
import { setSelectedRoom } from "@Redux/slices/Rooms/rooms-slice";
import { IRoom } from "@Types/index";
import RoomButton from "./Common/RoomButton";
import variables from "@Sass/variables.module.scss";
import { JOIN_ROOM_MODAL } from "@Utils/constants/modalStatusConstants";

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
    <RoomButton
      backgroundColor={variables.actionColor}
      handleClick={handleOpenJoinRoomModal}
      width="130px"
    >
      Join
    </RoomButton>
  );
};

export default JoinButton;
