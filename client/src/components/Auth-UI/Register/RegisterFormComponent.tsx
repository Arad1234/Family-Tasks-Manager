import TitleComponent from "../TitleComponent";
import InputLabelWrapper from "../InputLabelWrapper";
import LabelComponent from "../LabelComponent";
import InputErrorMessage from "../InputErrorMessage";
import InputComponent from "../InputComponent";
import { formikPropsType } from "../../../types";
import "../../../pages/Register/Register.scss";
import AuthButton from "../AuthButton";
import { Typography } from "@mui/material";
import LinkComponent from "../../Link/LinkComponent";
import { FormikProps } from "formik";

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
      <TitleComponent>Sign Up</TitleComponent>

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
          formik={formik as formikPropsType}
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
          formik={formik as formikPropsType}
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
      <Typography sx={{ color: "white" }}>
        Already have an account? <LinkComponent href="/">Log In</LinkComponent>
      </Typography>
    </form>
  );
};

export default RegisterFormComponent;
