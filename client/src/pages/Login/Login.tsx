import React from "react";
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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, password } = useAppSelector((state) => state.authReducer);
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
    } else {
      navigate("/home");
    }
  };

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
