import "./Login.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginThunk } from "../../redux/actions/Auth/auth-actions";
import { Box } from "@mui/material";
import AuthButton from "../../components/Auth-UI/AuthButton";
import LabelComponent from "../../components/Auth-UI/LabelComponent";
import InputComponent from "../../components/Auth-UI/InputComponent";
import InputLabelWrapper from "../../components/Auth-UI/InputLabelWrapper";
import TitleComponent from "../../components/Auth-UI/TitleComponent";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SignInWithOAuth } from "../../Supabase/OAuth";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import SecondaryAuthButton from "../../components/Auth-UI/Login/SecondaryAuthButton";
import { useFormik } from "formik";
import { object, string } from "yup";
import InputErrorMessage from "../../components/Auth-UI/InputErrorMessage";

const Login = () => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.authReducer);
  const supabase = useSupabaseClient();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: object({
      email: string().email().required("Required Field").trim(),
      password: string().required("Required Field"),
    }),
    async onSubmit({ email, password }) {
      const response: any = await dispatch(loginThunk({ email, password }));

      if (response.error) {
        toast.error(response.payload as string);
        return;
      }

      // This will create a trigger an auth event SIGNED_IN.
      const { error } = await SignInWithOAuth(supabase);

      if (error) {
        alert("Error logging in to Google provider with Supabase");
        console.log(error);
      }
    },
  });
  const { handleSubmit, values, errors, touched } = formik;

  if (loading) {
    return <Loader height="100vh" />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <TitleComponent>Login</TitleComponent>
        <InputLabelWrapper>
          <LabelComponent>Email</LabelComponent>
          <InputComponent
            value={values.email}
            formik={formik}
            type="email"
            name="email"
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
            type="password"
            name="password"
          />
          {errors.password && touched.password && (
            <InputErrorMessage>{errors.password}</InputErrorMessage>
          )}
        </InputLabelWrapper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <AuthButton>Login</AuthButton>
          <p className="hr-lines">or</p>
          <SecondaryAuthButton />
        </Box>
      </form>
    </Box>
  );
};

export default Login;
