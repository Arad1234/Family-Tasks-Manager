import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginThunk } from "../../redux/actions/Auth/auth-actions";
import { setEmail, setPassword } from "../../redux/slices/Auth/auth-slice";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { Typography } from "@mui/material";
import InputWrapper from "../../components/Auth-UI/InputWrapper";
import AuthButton from "../../components/Auth-UI/AuthButton";
import LabelComponent from "../../components/Auth-UI/LabelComponent";
import TextInput from "../../components/Auth-UI/TextInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, password } = useAppSelector((state) => state.authReducer);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <form
      className="login-form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h2">Login Page</Typography>
      <InputWrapper>
        <LabelComponent>Email</LabelComponent>
        <TextInput
          handleChange={handleEmailChange}
          type="email"
          name="email"
        />
      </InputWrapper>
      <InputWrapper>
        <LabelComponent>Password</LabelComponent>
        <TextInput
          handleChange={handlePasswordChange}
          type="password"
          name="password"
        />
      </InputWrapper>
      <AuthButton>Login</AuthButton>
      New to the app? <a href="/register">Register</a>
    </form>
  );
};

export default Login;
