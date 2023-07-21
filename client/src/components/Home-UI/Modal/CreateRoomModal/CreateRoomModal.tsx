import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import ModalButton from "../common/ModalButton";
import ModalInputs from "./ModalInputs";
import ModalTitle from "../common/ModalTitle";
import ModalComponent from "../common/ModalComponent";
import { createRoomSocket } from "../../../../socket/socketEvents";

const CreateRoomModal = () => {
  const { maxMembers, roomName, roomPassword } = useAppSelector(
    (state) => state.createRoomReducer
  );
  const dispatch = useAppDispatch();

  const handleCreateRoom = async () => {
    createRoomSocket(dispatch, { maxMembers, roomName, roomPassword });
  };

  return (
    <ModalComponent>
      <ModalTitle>Room Creation</ModalTitle>
      <ModalInputs />
      <ModalButton handleClick={handleCreateRoom}>Create</ModalButton>
    </ModalComponent>
  );
};

export default CreateRoomModal;
