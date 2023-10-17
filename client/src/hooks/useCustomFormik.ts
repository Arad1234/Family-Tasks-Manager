import { useFormik } from "formik";
import { ObjectSchema } from "yup";

const useCustomFormik = (options: {
  formHandleSubmit: (values: any) => void;
  formInitialValues: any;
  formValidationSchema: ObjectSchema<any>;
}) => {
  const formik = useFormik({
    initialValues: options.formInitialValues,
    validationSchema: options.formValidationSchema,
    onSubmit: options.formHandleSubmit,
  });

  return formik;
};

export default useCustomFormik;
