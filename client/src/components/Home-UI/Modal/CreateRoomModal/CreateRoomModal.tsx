import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import ModalButton from "../../../Modal-Common/ModalButton";
import ModalInputs from "./ModalInputs";
import ModalTitle from "../../../Modal-Common/ModalTitle";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import { createRoomSocket } from "../../../../socket/socketEventEmitters";

const CreateRoomModal = () => {
  const { maxMembers, roomName, roomPassword } = useAppSelector(
    (state) => state.createRoomReducer
  );
  const dispatch = useAppDispatch();

  const handleCreateRoom = async () => {
    createRoomSocket(dispatch, {
      maxMembers,
      roomName,
      roomPassword,
    });
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
