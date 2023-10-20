import { object, string } from "yup";
import { joinRoomSocket } from "../../../../redux/actions/rooms-actions";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import ModalTitle from "../../../Modal-Common/ModalTitle";
import ModalForm from "./ModalForm";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

const JoinRoomModal = () => {
  const dispatch = useAppDispatch();
  const selectedRoom = useAppSelector(
    (state) => state.roomsReducer.selectedRoom
  );

  const formInitialValues = {
    roomPassword: "",
  };

  const formValidationSchema = object({
    roomPassword: string().required("Required Field"),
  });

  const formHandleSubmit = ({ roomPassword }: { roomPassword: string }) => {
    if (selectedRoom) {
      dispatch(joinRoomSocket({ roomId: selectedRoom._id, roomPassword }));
    }
  };

  return (
    <ModalComponent>
      <ModalTitle>Join Room</ModalTitle>
      <ModalForm
        formHandleSubmit={formHandleSubmit}
        formInitialValues={formInitialValues}
        formValidationSchema={formValidationSchema}
      />
    </ModalComponent>
  );
};

export default JoinRoomModal;
