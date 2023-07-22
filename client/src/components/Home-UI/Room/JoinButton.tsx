import { useAppDispatch } from "../../../redux/hooks";
import { setShowModal } from "../../../redux/slices/Modal/modal-slice";
import { setCurrentRoom } from "../../../redux/slices/Room/rooms-slice";
import { IRoom } from "../../../types";
import RoomButton from "./common/RoomButton";

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
    <RoomButton
      handleClick={handleOpenJoinModal}
      buttonWidth="60px"
    >
      Join
    </RoomButton>
  );
};

export default JoinButton;
