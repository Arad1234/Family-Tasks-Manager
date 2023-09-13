import React from "react";
import "./Login.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginThunk } from "../../redux/actions/Auth/auth-actions";
import { setEmail, setPassword } from "../../redux/slices/Auth/auth-slice";
import { Box } from "@mui/material";
import AuthButton from "../../components/Auth-UI/AuthButton";
import LabelComponent from "../../components/Auth-UI/LabelComponent";
import InputComponent from "../../components/Auth-UI/InputComponent";
import InputLabelWrapper from "../../components/Auth-UI/InputLabelWrapper";
import { InputChangeEvent } from "../../types";
import TitleComponent from "../../components/Auth-UI/TitleComponent";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SignInWithOAuth } from "../../Supabase/OAuth";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import SecondaryAuthButton from "../../components/Auth-UI/Login/SecondaryAuthButton";

const Login = () => {
  const dispatch = useAppDispatch();
  const { email, password, loading } = useAppSelector(
    (state) => state.authReducer
  );
  const supabase = useSupabaseClient();

  const handleEmailChange = (e: InputChangeEvent) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e: InputChangeEvent) => {
    dispatch(setPassword(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
  };

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
        gap: "20px",
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
            handleChange={handleEmailChange}
            type="email"
            name="email"
          />
        </InputLabelWrapper>
        <InputLabelWrapper>
          <LabelComponent>Password</LabelComponent>
          <InputComponent
            handleChange={handlePasswordChange}
            type="password"
            name="password"
          />
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
