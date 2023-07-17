import ModalButton from "../common/ModalButton";
import ModalComponent from "../common/ModalComponent";
import ModalTitle from "../common/ModalTitle";
import ModalInputs from "./ModalInputs";

const JoinRoomModal = () => {
  const handleJoinRoom = () => {};
  return (
    <ModalComponent>
      <ModalTitle>Join Room</ModalTitle>
      <ModalInputs />
      <ModalButton handleClick={handleJoinRoom}>Join</ModalButton>
    </ModalComponent>
  );
};

export default JoinRoomModal;
