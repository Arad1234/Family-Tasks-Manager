import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { joinRoomSocket } from "../../../../socket/Rooms/EventEmitters";
import ModalButton from "../../../Modal-Common/ModalButton";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import ModalTitle from "../../../Modal-Common/ModalTitle";
import ModalInputs from "./ModalInputs";

const JoinRoomModal = () => {
  const dispatch = useAppDispatch();
  const { roomPassword } = useAppSelector((state) => state.joinRoomReducer);
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);

  const handleJoinRoom = () => {
    joinRoomSocket(dispatch, { roomId: currentRoom._id, roomPassword });
  };

  return (
    <ModalComponent>
      <ModalTitle>Join Room</ModalTitle>
      <ModalInputs />
      <ModalButton handleClick={handleJoinRoom}>Join</ModalButton>
    </ModalComponent>
  );
};

export default JoinRoomModal;
