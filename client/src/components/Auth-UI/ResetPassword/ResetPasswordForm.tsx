import { FormikProps } from "formik";
import InputComponent from "../InputComponent/InputComponent";
import FormTitleComponent from "../FormTitleComponent/FormTitleComponent";
import FormBottomText from "../FormBottomText/FormBottomText";
import { inputLabelPropsStyle } from "@Utils/constants/genericConstants";
import { FormStyled } from "../styles/form.styled";
import { AuthButtonStyled } from "../AuthButton/AuthButton.styled";

interface Props {
  formik: FormikProps<{ newPassword: string; confirmPassword: string }>;
}

const ResetPasswordForm = ({ formik }: Props) => {
  const { values, errors, touched, handleSubmit } = formik;

  return (
    <FormStyled onSubmit={handleSubmit}>
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

      <AuthButtonStyled>Create New Password</AuthButtonStyled>
      <FormBottomText
        actionText="Go To Login Page"
        navigateTo="/"
      />
    </FormStyled>
  );
};

export default ResetPasswordForm;
