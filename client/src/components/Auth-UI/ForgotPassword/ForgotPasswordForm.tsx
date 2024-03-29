import FormTitleComponent from "../FormTitleComponent";
import InputLabelWrapper from "../InputLabelWrapper";
import LabelComponent from "../LabelComponent";
import InputComponent from "../InputComponent";
import AuthButton from "../AuthButton";
import InputErrorMessage from "../InputErrorMessage";
import FormBottomText from "../FormBottomText";
import "./ForgotPassword.scss";
import { FormikProps } from "formik";

interface Props {
  formik: FormikProps<{ email: string }>;
}

const ForgotPasswordForm = ({ formik }: Props) => {
  const { values, errors, touched, handleSubmit } = formik;

  return (
    <form
      onSubmit={handleSubmit}
      className="forgotPassword-form"
    >
      <FormTitleComponent>Forgot Password</FormTitleComponent>
      <InputLabelWrapper>
        <LabelComponent>Email</LabelComponent>
        <InputComponent
          formik={formik}
          name="email"
          type="email"
          value={values.email}
        />
        {errors.email && touched.email && (
          <InputErrorMessage>{errors.email}</InputErrorMessage>
        )}
      </InputLabelWrapper>
      <AuthButton>Send</AuthButton>
      <FormBottomText
        navigateTo="/"
        actionText="Go Back"
      />
    </form>
  );
};

export default ForgotPasswordForm;
