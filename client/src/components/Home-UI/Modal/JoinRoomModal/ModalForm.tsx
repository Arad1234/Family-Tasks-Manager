import ModalInput from "../../../Modal-Common/ModalInput";
import ModalFormWrapper from "../../../Modal-Common/ModalFormWrapper";
import ModalButton from "../../../Modal-Common/ModalButton";
import { ObjectSchema } from "yup";
import useCustomFormik from "../../../../hooks/useCustomFormik";

interface Props {
  formInitialValues: { roomPassword: string };
  formValidationSchema: ObjectSchema<{ roomPassword: string }>;
  formHandleSubmit: (values: { roomPassword: string }) => void;
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

  const { handleBlur, handleSubmit, handleChange, values, errors, touched } =
    formik;
  return (
    <ModalFormWrapper onSubmit={handleSubmit}>
      <ModalInput
        onBlur={handleBlur}
        onChange={handleChange}
        type="password"
        label="Room Password"
        name="roomPassword"
        placeholder="Enter room password"
        value={values.roomPassword}
        errorMessage={errors.roomPassword as string}
        touched={touched.roomPassword as boolean}
      />
      <ModalButton>Join</ModalButton>
    </ModalFormWrapper>
  );
};

export default ModalForm;
