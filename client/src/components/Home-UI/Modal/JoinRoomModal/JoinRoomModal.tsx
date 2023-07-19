import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setIsOpen } from "../../../../redux/slices/Modal/modal-slice";
import { socket } from "../../../../socket";
import { extractLocalStorage } from "../../../../utils/extractLocalStorage";
import ModalButton from "../common/ModalButton";
import ModalComponent from "../common/ModalComponent";
import ModalTitle from "../common/ModalTitle";
import ModalInputs from "./ModalInputs";

const JoinRoomModal = () => {
  const dispatch = useAppDispatch();
  const { roomId, roomPassword } = useAppSelector(
    (state) => state.joinRoomReducer
  );
  const userId = extractLocalStorage();

  const handleJoinRoom = () => {
    socket.emit("rooms:join", { roomId, userId, roomPassword });
    dispatch(setIsOpen({ isOpen: false, status: "" }));
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
