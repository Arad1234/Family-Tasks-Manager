import TitleComponent from "../TitleComponent";
import InputLabelWrapper from "../InputLabelWrapper";
import LabelComponent from "../LabelComponent";
import InputComponent from "../InputComponent";
import AuthButton from "../AuthButton";
import { formikPropsType } from "../../../types";
import InputErrorMessage from "../InputErrorMessage";
import FormBottomText from "../FormBottomText";
import "./ForgotPassword.scss";

interface Props {
  formik: formikPropsType;
}

const ForgotPasswordForm = ({ formik }: Props) => {
  const { values, errors, touched, handleSubmit } = formik;

  return (
    <form
      onSubmit={handleSubmit}
      className="forgotPassword-form"
    >
      <TitleComponent>Forgot Password</TitleComponent>
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
