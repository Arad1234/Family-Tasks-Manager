import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerThunk } from "../../store/actions/Auth/auth-actions";
import {
  setConfirmPassword,
  setEmail,
  setPassword,
  setUsername,
} from "../../store/slices/Auth/auth-slice";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import InputWrapper from "../../components/Auth-UI/InputWrapper";
import AuthButton from "../../components/Auth-UI/AuthButton";
import LabelComponent from "../../components/Auth-UI/Label/LabelComponent";
import LabelWrapper from "../../components/Auth-UI/Label/LabelWrapper";
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
        <LabelWrapper>
          <LabelComponent>Username</LabelComponent>
        </LabelWrapper>
        <TextInput
          handleChange={handleUsernameChange}
          name="name"
          type="text"
        />
      </InputWrapper>

      <InputWrapper>
        <LabelWrapper>
          <LabelComponent>Email</LabelComponent>
        </LabelWrapper>

        <TextInput
          handleChange={handleEmailChange}
          name="email"
          type="email"
        />
      </InputWrapper>

      <InputWrapper>
        <LabelWrapper>
          <LabelComponent>Password</LabelComponent>
        </LabelWrapper>
        <TextInput
          handleChange={handlePasswordChange}
          type="password"
          name="password"
        />
      </InputWrapper>

      <InputWrapper>
        <LabelWrapper>
          <LabelComponent>Confirm Password</LabelComponent>
        </LabelWrapper>

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
