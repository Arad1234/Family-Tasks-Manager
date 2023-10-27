import FormTitleComponent from "../FormTitleComponent/FormTitleComponent";
import InputComponent from "../InputComponent/InputComponent";
import { FormikProps } from "formik";
import FormBottomText from "../FormBottomText/FormBottomText";
import { inputLabelPropsStyle } from "@Utils/constants/genericConstants";
import { FormStyled } from "../styles/form.styled";
import { AuthButtonStyled } from "../AuthButton/AuthButton.styled";

interface Props {
  formik: FormikProps<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>;
}

const RegisterFormComponent = ({ formik }: Props) => {
  const { values, errors, touched, handleSubmit } = formik;

  return (
    <FormStyled
      className="register-form"
      onSubmit={handleSubmit}
    >
      <FormTitleComponent>Sign Up</FormTitleComponent>

      <InputComponent
        label="Username"
        InputLabelProps={inputLabelPropsStyle}
        formik={formik}
        value={values.name}
        name="name"
        type="text"
        inputTouched={touched.name}
        inputError={errors.name}
      />

      <InputComponent
        formik={formik}
        value={values.email}
        name="email"
        type="email"
        label="Email"
        InputLabelProps={inputLabelPropsStyle}
        inputTouched={touched.email}
        inputError={errors.email}
      />

      <InputComponent
        label="Password"
        InputLabelProps={inputLabelPropsStyle}
        formik={formik}
        value={values.password}
        name="password"
        type="password"
        inputTouched={touched.password}
        inputError={errors.password}
      />

      <InputComponent
        label="Confirm Password"
        InputLabelProps={inputLabelPropsStyle}
        formik={formik}
        value={values.confirmPassword}
        name="confirmPassword"
        type="password"
        inputTouched={touched.confirmPassword}
        inputError={errors.confirmPassword}
      />
      <AuthButtonStyled>Sign Up</AuthButtonStyled>

      <FormBottomText
        actionText="Log In"
        navigateTo="/"
        whiteText="Already have an account?"
      />
    </FormStyled>
  );
};

export default RegisterFormComponent;
