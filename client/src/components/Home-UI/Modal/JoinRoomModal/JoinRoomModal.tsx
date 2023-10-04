import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { joinRoomSocket } from "../../../../socket/Rooms/EventEmitters";
import ModalButton from "../../../Modal-Common/ModalButton";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import ModalTitle from "../../../Modal-Common/ModalTitle";
import ModalInputs from "./ModalInputs";

const JoinRoomModal = () => {
  const dispatch = useAppDispatch();
  const { roomPassword } = useAppSelector((state) => state.joinRoomReducer);
  const { selectedRoom } = useAppSelector((state) => state.roomsReducer);

  const handleJoinRoom = () => {
    if (selectedRoom) {
      joinRoomSocket(dispatch, { roomId: selectedRoom._id, roomPassword });
    }
  };

  return (
    <ModalComponent>
      <ModalTitle>Join Room</ModalTitle>
      <ModalInputs />
      <ModalButton onClick={handleJoinRoom}>Join</ModalButton>
    </ModalComponent>
  );
};

export default JoinRoomModal;
