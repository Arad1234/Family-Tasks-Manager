import FormTitleComponent from "../FormTitleComponent";
import InputComponent from "../InputComponent";
import AuthButton from "../AuthButton";
import FormBottomText from "../FormBottomText";
import { FormikProps } from "formik";
import SendEmailMessage from "./SendEmailMessage";
import { inputLabelPropsStyle } from "@Utils/constants/genericConstants";
import { FormStyled } from "../styles/form.styled";

interface Props {
  formik: FormikProps<{ email: string }>;
  sentEmailMessage: string | null;
}

const ForgotPasswordForm = ({ formik, sentEmailMessage }: Props) => {
  const { values, errors, touched, handleSubmit } = formik;

  return (
    <FormStyled onSubmit={handleSubmit}>
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
    </FormStyled>
  );
};

export default ForgotPasswordForm;
