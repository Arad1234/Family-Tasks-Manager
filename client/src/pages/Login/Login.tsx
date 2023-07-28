import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginThunk } from "../../redux/actions/Auth/auth-actions";
import { setEmail, setPassword } from "../../redux/slices/Auth/auth-slice";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { Typography } from "@mui/material";
import AuthButton from "../../components/Auth-UI/AuthButton";
import LabelComponent from "../../components/Auth-UI/LabelComponent";
import InputComponent from "../../components/Auth-UI/InputComponent";
import InputLabelWrapper from "../../components/Auth-UI/InputLabelWrapper";
import LinkComponent from "../../components/Link/LinkComponent";
import { InputChangeEvent } from "../../types";
import BackgroundImage from "../../components/Auth-UI/BackgroundImage";
import TitleComponent from "../../components/Auth-UI/TitleComponent";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { SignInWithOAuth } from "../../Supabase/Supabase-auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, password } = useAppSelector((state) => state.authReducer);
  const supabase = useSupabaseClient();
  const session = useSession();

  const handleEmailChange = (e: InputChangeEvent) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e: InputChangeEvent) => {
    dispatch(setPassword(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await dispatch(loginThunk({ email, password }));
    console.log(response);

    if (response.error) {
      alert(response.payload);
      return;
    }

    // This will create a session with "provider_token" so the useEffect will navigate to the "/home" url.
    const { error } = await SignInWithOAuth(supabase);

    if (error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    console.log(session?.provider_token);
    if (session?.provider_token) {
      navigate("/home");
    }
  }, [session?.provider_token]);

  return (
    <BackgroundImage>
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
        <AuthButton>Login</AuthButton>
        <Typography>
          New to the app?{" "}
          <LinkComponent href="/register">Register</LinkComponent>
        </Typography>
      </form>
    </BackgroundImage>
  );
};

export default Login;
