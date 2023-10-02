import FormTitleComponent from "../FormTitleComponent";
import InputComponent from "../InputComponent";
import AuthButton from "../AuthButton";
import FormBottomText from "../FormBottomText";
import "./ForgotPassword.scss";
import { FormikProps } from "formik";
import SendEmailMessage from "./SendEmailMessage";
import { inputLabelPropsStyle } from "../../../utils/constants";

interface Props {
  formik: FormikProps<{ email: string }>;
  sentEmailMessage: string | null;
}

const ForgotPasswordForm = ({ formik, sentEmailMessage }: Props) => {
  const { values, errors, touched, handleSubmit } = formik;

  return (
    <form
      onSubmit={handleSubmit}
      className="forgotPassword-form"
    >
      {sentEmailMessage ? (
        <SendEmailMessage>{sentEmailMessage}</SendEmailMessage>
      ) : (
        <>
          <FormTitleComponent>Forgot Password</FormTitleComponent>
          <InputComponent
            formik={formik}
            name="email"
            type="email"
            value={values.email}
            label="Email"
            InputLabelProps={inputLabelPropsStyle}
            inputTouched={touched.email}
            inputError={errors.email}
          />

          <AuthButton>Send</AuthButton>
          <FormBottomText
            navigateTo="/"
            actionText="Go back"
          />
        </>
      )}
    </form>
  );
};

export default ForgotPasswordForm;
