import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { registerThunk } from "../../redux/actions/Auth/auth-actions";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import AuthButton from "../../components/Auth-UI/AuthButton";
import LabelComponent from "../../components/Auth-UI/LabelComponent";
import InputLabelWrapper from "../../components/Auth-UI/InputLabelWrapper";
import InputComponent from "../../components/Auth-UI/InputComponent";
import { Box, Typography } from "@mui/material";
import LinkComponent from "../../components/Link/LinkComponent";
import TitleComponent from "../../components/Auth-UI/TitleComponent";
import { toast } from "react-toastify";
import RegisterTitle from "../../components/Auth-UI/Register/Title";
import { useFormik } from "formik";
import { object, string } from "yup";
import InputErrorMessage from "../../components/Auth-UI/InputErrorMessage";
import { formikPropsType } from "../../types";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username, confirmPassword } = useAppSelector(
    (state) => state.authReducer
  );

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema: object({
      name: string().required("Required Field").trim(),
      email: string().email().required("Required Field").trim(),
      password: string().required("Required Field"),
      confirmPassword: string().required("Required Field"),
    }),
    async onSubmit({ email, password }) {
      const response: any = await dispatch(
        registerThunk({ username, email, password, confirmPassword })
      );
      if (response.error) {
        toast.error(response.payload as string);
      } else {
        toast.success("Created User Successfully!");
        navigate("/");
      }
    },
  });
  const { handleSubmit, values, errors, touched } = formik;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        gap: "20px",
      }}
    >
      <RegisterTitle />

      <form
        className="register-form"
        onSubmit={handleSubmit}
      >
        <TitleComponent>Sign Up</TitleComponent>

        <InputLabelWrapper>
          <LabelComponent>Username</LabelComponent>
          <InputComponent
            formik={formik as formikPropsType}
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
            formik={formik as formikPropsType}
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
          Already have an account?{" "}
          <LinkComponent href="/">Log In</LinkComponent>
        </Typography>
      </form>
    </Box>
  );
};

export default Register;
