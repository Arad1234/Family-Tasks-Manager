import { useAppDispatch } from "../../../../redux/hooks";
import { setShowModal } from "../../../../redux/slices/Modal/modal-slice";
import { setCurrentRoom } from "../../../../redux/slices/Rooms/rooms-slice";
import { IRoom } from "../../../../types";
import RoomButton from "./Common/RoomButton";
import variables from "../../../../sass/variables.module.scss";

interface Props {
  room: IRoom;
}

const JoinButton = ({ room }: Props) => {
  const dispatch = useAppDispatch();

  const handleOpenJoinModal = () => {
    dispatch(setShowModal({ isOpen: true, modalStatus: "join" }));

    // When the "Join" button is clicked I set the roomId to the redux store.
    dispatch(setCurrentRoom(room._id));
  };

  return (
    <RoomButton
      backgroundColor={variables.actionColor}
      handleClick={handleOpenJoinModal}
      width="130px"
    >
      Join
    </RoomButton>
  );
};

export default JoinButton;
