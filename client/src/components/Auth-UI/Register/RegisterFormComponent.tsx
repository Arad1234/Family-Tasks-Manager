import FormTitleComponent from "../FormTitleComponent";
import InputLabelWrapper from "../InputLabelWrapper";
import LabelComponent from "../LabelComponent";
import InputErrorMessage from "../InputErrorMessage";
import InputComponent from "../InputComponent";
import "./Register.scss";
import AuthButton from "../AuthButton";
import { FormikProps } from "formik";
import FormBottomText from "../FormBottomText";

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

      <InputLabelWrapper>
        <LabelComponent>Username</LabelComponent>
        <InputComponent
          formik={formik}
          value={values.name}
          name="name"
          type="text"
        />
        {errors.name && touched.name && (
          <InputErrorMessage>{errors.name}</InputErrorMessage>
        )}
      </InputLabelWrapper>

      <InputLabelWrapper>
        <LabelComponent>Email</LabelComponent>

        <InputComponent
          formik={formik}
          value={values.email}
          name="email"
          type="email"
        />
        {errors.email && touched.email && (
          <InputErrorMessage>{errors.email}</InputErrorMessage>
        )}
      </InputLabelWrapper>

      <InputLabelWrapper>
        <LabelComponent>Password</LabelComponent>
        <InputComponent
          formik={formik}
          value={values.password}
          name="password"
          type="password"
        />
        {errors.password && touched.password && (
          <InputErrorMessage>{errors.password}</InputErrorMessage>
        )}
      </InputLabelWrapper>

      <InputLabelWrapper>
        <LabelComponent>Confirm Password</LabelComponent>

        <InputComponent
          formik={formik}
          value={values.confirmPassword}
          name="confirmPassword"
          type="password"
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <InputErrorMessage>{errors.confirmPassword}</InputErrorMessage>
        )}
      </InputLabelWrapper>

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
