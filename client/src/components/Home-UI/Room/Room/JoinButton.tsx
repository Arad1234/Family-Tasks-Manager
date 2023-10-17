import { useAppDispatch } from "../../../../redux/hooks";
import { setOpenModal } from "../../../../redux/slices/Modal/modal-slice";
import { setSelectedRoom } from "../../../../redux/slices/Rooms/rooms-slice";
import { IRoom } from "../../../../types";
import RoomButton from "./Common/RoomButton";
import variables from "../../../../sass/variables.module.scss";

interface Props {
  room: IRoom;
}

const JoinButton = ({ room }: Props) => {
  const dispatch = useAppDispatch();

  const handleOpenJoinRoomModal = () => {
    dispatch(setOpenModal("joinRoom"));

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
