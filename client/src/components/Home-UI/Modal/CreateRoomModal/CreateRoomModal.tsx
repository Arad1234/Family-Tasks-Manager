import ModalTitle from "../../../Modal-Common/ModalTitle";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import { number, object, string } from "yup";
import ModalForm from "./ModalForm";
import { CreateRoomFormModal } from "../../../../types";
import { createRoomSocket } from "../../../../socket/Rooms/EventEmitters";
import { useAppDispatch } from "../../../../redux/hooks";

const CreateRoomModal = () => {
  const dispatch = useAppDispatch();

  const formInitialValues = {
    roomName: "",
    maxMembers: null,
    roomPassword: "",
  };

  const formValidationSchema = object({
    roomName: string().required("Required Field"),
    maxMembers: number()
      .required("Required Field")
      .min(2, "Must be min 2 and max 10")
      .max(10, "Must be min 2 and max 10"),
    roomPassword: string()
      .required("Required Field")
      .min(6, "Must be at least 6 chars"),
  });

  const formHandleSubmit = ({
    maxMembers,
    roomName,
    roomPassword,
  }: CreateRoomFormModal) => {
    createRoomSocket(dispatch, {
      maxMembers,
      roomName,
      roomPassword,
    });
  };

  return (
    <ModalComponent>
      <ModalTitle>Room Creation</ModalTitle>
      <ModalForm
        formInitialValues={formInitialValues}
        formValidationSchema={formValidationSchema}
        formHandleSubmit={formHandleSubmit}
      />
    </ModalComponent>
  );
};

export default CreateRoomModal;
