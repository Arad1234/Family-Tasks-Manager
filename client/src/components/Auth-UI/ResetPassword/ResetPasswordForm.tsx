import { FormikProps } from "formik";
import InputComponent from "../InputComponent";
import InputLabelWrapper from "../InputLabelWrapper";
import LabelComponent from "../LabelComponent";
import "./ResetPasswordForm.scss";
import AuthButton from "../AuthButton";
import FormTitleComponent from "../FormTitleComponent";
import InputErrorMessage from "../InputErrorMessage";
import FormBottomText from "../FormBottomText";

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
      <InputLabelWrapper>
        <LabelComponent>New Password</LabelComponent>
        <InputComponent
          formik={formik}
          name="newPassword"
          type="password"
          value={values.newPassword}
        />
        {errors.newPassword && touched.newPassword && (
          <InputErrorMessage>{errors.newPassword}</InputErrorMessage>
        )}
      </InputLabelWrapper>

      <InputLabelWrapper>
        <LabelComponent>Confirm Password</LabelComponent>
        <InputComponent
          formik={formik}
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <InputErrorMessage>{errors.confirmPassword}</InputErrorMessage>
        )}
      </InputLabelWrapper>
      <AuthButton>Create New Password</AuthButton>
      <FormBottomText
        actionText="Go To Login Page"
        navigateTo="/"
      />
    </form>
  );
};

export default ResetPasswordForm;
