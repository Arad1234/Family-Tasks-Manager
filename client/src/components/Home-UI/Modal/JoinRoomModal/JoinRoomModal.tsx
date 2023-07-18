import { useAppDispatch } from "../../../../redux/hooks";
import { setIsOpen } from "../../../../redux/slices/Modal/modal-slice";
import ModalButton from "../common/ModalButton";
import ModalComponent from "../common/ModalComponent";
import ModalTitle from "../common/ModalTitle";
import ModalInputs from "./ModalInputs";

const JoinRoomModal = () => {
  const dispatch = useAppDispatch();
  const handleJoinRoom = () => {
    dispatch(setIsOpen(false));
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
