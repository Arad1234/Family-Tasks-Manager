import ModalInput from "../../../Modal-Common/ModalInput";
import ModalFormWrapper from "../../../Modal-Common/ModalFormWrapper";
import ModalButton from "../../../Modal-Common/ModalButton";
import { CreateTaskFormModal } from "../../../../types";
import { ObjectSchema } from "yup";
import useCustomFormik from "../../../../hooks/useCustomFormik";

interface Props {
  formInitialValues: CreateTaskFormModal;
  formValidationSchema: ObjectSchema<CreateTaskFormModal>;
  formHandleSubmit: (values: CreateTaskFormModal) => void;
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

  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    formik;

  return (
    <ModalFormWrapper onSubmit={handleSubmit}>
      <ModalInput
        onBlur={handleBlur}
        onChange={handleChange}
        label="Task name"
        placeholder="Enter task name"
        name="name"
        value={values.name}
        errorMessage={errors.name as string}
        touched={touched.name as boolean}
      />
      <ModalInput
        onBlur={handleBlur}
        onChange={handleChange}
        label="Description"
        placeholder="Enter description"
        name="description"
        value={values.description}
        errorMessage={errors.description as string}
        touched={touched.description as boolean}
      />
      <ModalInput
        onBlur={handleBlur}
        onChange={handleChange}
        type="datetime-local"
        label="Start Time"
        InputLabelProps={{ shrink: true }}
        name="startTime"
        value={values.startTime ? values.startTime : ""}
        errorMessage={errors.startTime as string}
        touched={touched.startTime as boolean}
      />
      <ModalInput
        onBlur={handleBlur}
        onChange={handleChange}
        type="datetime-local"
        label="End Time"
        disabled={!values.startTime}
        InputLabelProps={{ shrink: true }}
        name="endTime"
        value={values.endTime ? values.endTime : ""}
        errorMessage={errors.endTime as string}
        touched={touched.endTime as boolean}
      />
      <ModalButton>Add Task</ModalButton>
    </ModalFormWrapper>
  );
};

export default ModalForm;
