import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { registerThunk } from "../../redux/actions/Auth/auth-actions";
import {
  setConfirmPassword,
  setEmail,
  setPassword,
  setUsername,
} from "../../redux/slices/Auth/auth-slice";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import AuthButton from "../../components/Auth-UI/AuthButton";
import LabelComponent from "../../components/Auth-UI/LabelComponent";
import { InputChangeEvent } from "../../types";
import InputLabelWrapper from "../../components/Auth-UI/InputLabelWrapper";
import InputComponent from "../../components/Auth-UI/InputComponent";
import { Typography } from "@mui/material";
import LinkComponent from "../../components/Auth-UI/LinkComponent";
import BackgroundImage from "../../components/Auth-UI/BackgroundImage";
import TitleComponent from "../../components/Auth-UI/TitleComponent";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username, email, password, confirmPassword } = useAppSelector(
    (state) => state.authReducer
  );

  const handleUsernameChange = (e: InputChangeEvent) => {
    dispatch(setUsername(e.target.value));
  };
  const handleEmailChange = (e: InputChangeEvent) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e: InputChangeEvent) => {
    dispatch(setPassword(e.target.value));
  };

  const handleConfirmPasswordChange = (e: InputChangeEvent) => {
    dispatch(setConfirmPassword(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await dispatch(
      registerThunk({ username, email, password, confirmPassword })
    );
    if (response.error) {
      console.log(response);
      alert(response.payload);
    } else {
      navigate("/");
    }
  };

  return (
    <BackgroundImage>
      <form
        className="register-form"
        onSubmit={handleSubmit}
      >
        <TitleComponent>Sign Up</TitleComponent>

        <InputLabelWrapper>
          <LabelComponent>Username</LabelComponent>
          <InputComponent
            handleChange={handleUsernameChange}
            name="name"
            type="text"
          />
        </InputLabelWrapper>

        <InputLabelWrapper>
          <LabelComponent>Email</LabelComponent>

          <InputComponent
            handleChange={handleEmailChange}
            name="email"
            type="email"
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

        <InputLabelWrapper>
          <LabelComponent>Confirm Password</LabelComponent>

          <InputComponent
            handleChange={handleConfirmPasswordChange}
            type="password"
            name="confirmPassword"
          />
        </InputLabelWrapper>

        <AuthButton>Sign Up</AuthButton>
        <Typography>
          Already have an account?{" "}
          <LinkComponent href="/">Log In</LinkComponent>
        </Typography>
      </form>
    </BackgroundImage>
  );
};

export default Register;
