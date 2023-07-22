import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { joinRoomSocket } from "../../../../socket/socketEventEmitters";
import { extractUserIdLocalStorage } from "../../../../utils/extractLocalStorageData";
import ModalButton from "../common/ModalButton";
import ModalComponent from "../common/ModalComponent";
import ModalTitle from "../common/ModalTitle";
import ModalInputs from "./ModalInputs";

const JoinRoomModal = () => {
  const dispatch = useAppDispatch();
  const { roomPassword } = useAppSelector((state) => state.joinRoomReducer);
  const { room } = useAppSelector((state) => state.roomsReducer);
  const userId = extractUserIdLocalStorage();

  const handleJoinRoom = () => {
    joinRoomSocket(dispatch, { roomId: room._id, userId, roomPassword });
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
