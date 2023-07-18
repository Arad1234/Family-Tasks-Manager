import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { resetRoomDetails } from "../../../../redux/slices/Room/create-room";
import ModalButton from "../common/ModalButton";
import ModalInputs from "./ModalInputs";
import ModalTitle from "../common/ModalTitle";
import ModalComponent from "../common/ModalComponent";
import { socket } from "../../../../socket";
import { setIsOpen } from "../../../../redux/slices/Modal/modal-slice";

const CreateRoomModal = () => {
  const { maxMembers, roomName, roomPassword } = useAppSelector(
    (state) => state.createRoomReducer
  );
  const dispatch = useAppDispatch();

  const handleCreateRoom = async () => {
    socket.emit("rooms:create", { roomName, maxMembers, roomPassword });
    dispatch(setIsOpen({ isOpen: false, status: "" }));
    dispatch(resetRoomDetails());
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
