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
import InputWrapper from "../../components/Auth-UI/InputWrapper";
import AuthButton from "../../components/Auth-UI/AuthButton";
import LabelComponent from "../../components/Auth-UI/LabelComponent";
import TextInput from "../../components/Auth-UI/TextInput";
import { ChangeEvent } from "../../types";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username, email, password, confirmPassword } = useAppSelector(
    (state) => state.authReducer
  );

  const handleUsernameChange = (e: ChangeEvent) => {
    dispatch(setUsername(e.target.value));
  };
  const handleEmailChange = (e: ChangeEvent) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e: ChangeEvent) => {
    dispatch(setPassword(e.target.value));
  };

  const handleConfirmPasswordChange = (e: ChangeEvent) => {
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
    <form
      className="registerForm"
      onSubmit={handleSubmit}
    >
      <InputWrapper>
        <LabelComponent>Username</LabelComponent>
        <TextInput
          handleChange={handleUsernameChange}
          name="name"
          type="text"
        />
      </InputWrapper>

      <InputWrapper>
        <LabelComponent>Email</LabelComponent>

        <TextInput
          handleChange={handleEmailChange}
          name="email"
          type="email"
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

      <InputWrapper>
        <LabelComponent>Confirm Password</LabelComponent>

        <TextInput
          handleChange={handleConfirmPasswordChange}
          type="password"
          name="confirmPassword"
        />
      </InputWrapper>

      <AuthButton>Register</AuthButton>
      <p>
        Already have an account? <a href="/">Log in</a>
      </p>
    </form>
  );
};

export default Register;
