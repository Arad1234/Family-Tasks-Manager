import { FormikValues, useFormik } from "formik";
import { ObjectSchema } from "yup";

const useCustomFormik = <T extends FormikValues>(options: {
  formHandleSubmit: (values: T) => void;
  formInitialValues: T;
  formValidationSchema: ObjectSchema<T>;
}) => {
  const formik = useFormik({
    initialValues: options.formInitialValues,
    validationSchema: options.formValidationSchema,
    onSubmit: options.formHandleSubmit,
  });

  return formik;
};

export default useCustomFormik;
