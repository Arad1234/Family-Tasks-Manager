import ModalInput from "../../../Modal-Common/ModalInput";
import ModalButton from "../../../Modal-Common/ModalButton";
import ModalFormWrapper from "../../../Modal-Common/ModalFormWrapper";
import { ObjectSchema } from "yup";
import { CreateRoomFormModal } from "@Types/index";
import useCustomFormik from "@Hooks/useCustomFormik";

interface Props {
  formInitialValues: CreateRoomFormModal;
  formValidationSchema: ObjectSchema<CreateRoomFormModal>;
  formHandleSubmit: (values: CreateRoomFormModal) => void;
}

const ModalForm = ({
  formHandleSubmit,
  formInitialValues,
  formValidationSchema,
}: Props) => {
  const formik = useCustomFormik({
    formHandleSubmit,
    formInitialValues,
    formValidationSchema,
  });

  const { handleSubmit, values, errors, touched, handleChange, handleBlur } =
    formik;

  return (
    <ModalFormWrapper onSubmit={handleSubmit}>
      <ModalInput
        onBlur={handleBlur}
        onChange={handleChange}
        label="Room name"
        placeholder="Enter room name"
        name="roomName"
        value={values.roomName}
        errorMessage={errors.roomName as string}
        touched={touched.roomName as boolean}
      />
      <ModalInput
        onBlur={handleBlur}
        onChange={handleChange}
        type="number"
        label="Maximum members"
        placeholder="Enter max members"
        name="maxMembers"
        value={values.maxMembers ? values.maxMembers : ""}
        errorMessage={errors.maxMembers as string}
        touched={touched.maxMembers as boolean}
      />
      <ModalInput
        onBlur={handleBlur}
        onChange={handleChange}
        type="password"
        label="Room Password"
        placeholder="Enter room password"
        name="roomPassword"
        value={values.roomPassword}
        errorMessage={errors.roomPassword as string}
        touched={touched.roomPassword as boolean}
      />
      <ModalButton>Create</ModalButton>
    </ModalFormWrapper>
  );
};

export default ModalForm;
