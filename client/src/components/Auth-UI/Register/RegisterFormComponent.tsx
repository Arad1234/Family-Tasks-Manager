import FormTitleComponent from "../FormTitleComponent";
import InputComponent from "../InputComponent";
import "./Register.scss";
import AuthButton from "../AuthButton";
import { FormikProps } from "formik";
import FormBottomText from "../FormBottomText";
import { inputLabelPropsStyle } from "../../../utils/constants/genericConstants";

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
    <form
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

      <AuthButton>Sign Up</AuthButton>

      <FormBottomText
        actionText="Log In"
        navigateTo="/"
        whiteText="Already have an account?"
      />
    </form>
  );
};

export default RegisterFormComponent;
