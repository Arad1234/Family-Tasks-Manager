import { FormikProps } from "formik";
import InputComponent from "../InputComponent";
import "./ResetPasswordForm.scss";
import AuthButton from "../AuthButton";
import FormTitleComponent from "../FormTitleComponent";
import FormBottomText from "../FormBottomText";
import { inputLabelPropsStyle } from "@Utils/constants/genericConstants";

interface Props {
  formik: FormikProps<{ newPassword: string; confirmPassword: string }>;
}

const ResetPasswordForm = ({ formik }: Props) => {
  const { values, errors, touched, handleSubmit } = formik;

  return (
    <form
      onSubmit={handleSubmit}
      className="resetPassword-form"
    >
      <FormTitleComponent>Reset Your Pasword</FormTitleComponent>
      <InputComponent
        formik={formik}
        name="newPassword"
        type="password"
        value={values.newPassword}
        label="New Password"
        InputLabelProps={inputLabelPropsStyle}
        inputTouched={touched.newPassword}
        inputError={errors.newPassword}
      />

      <InputComponent
        formik={formik}
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        label="Confirm Password"
        InputLabelProps={inputLabelPropsStyle}
        inputTouched={touched.confirmPassword}
        inputError={errors.confirmPassword}
      />

      <AuthButton>Create New Password</AuthButton>
      <FormBottomText
        actionText="Go To Login Page"
        navigateTo="/"
      />
    </form>
  );
};

export default ResetPasswordForm;
