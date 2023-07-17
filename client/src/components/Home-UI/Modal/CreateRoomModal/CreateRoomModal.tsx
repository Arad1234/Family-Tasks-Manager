import { createRoomThunk } from "../../../../redux/actions/Room/rooms-actions";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { resetRoom } from "../../../../redux/slices/Room/create-room";
import { useNavigate } from "react-router-dom";
import ModalButton from "../common/ModalButton";
import ModalInputs from "./ModalInputs";
import ModalTitle from "../common/ModalTitle";
import ModalComponent from "../common/ModalComponent";

const CreateRoomModal = () => {
  const { maxMembers, roomName } = useAppSelector(
    (state) => state.createRoomReducer
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreateRoom = async () => {
    const response = await dispatch(createRoomThunk({ roomName, maxMembers }));
    if (response.error) {
      if (response.payload === "Unauthorized!") {
        navigate("/");
      }
      alert(response.payload);
    }

    dispatch(resetRoom());
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
