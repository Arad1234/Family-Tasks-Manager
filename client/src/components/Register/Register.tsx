import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerThunk } from "../../store/actions/auth-actions";
import {
  setEmail,
  setPassword,
  setUsername,
} from "../../store/slices/auth-slice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username, email, password } = useAppSelector(
    (state) => state.authReducer
  );

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await dispatch(
      registerThunk({ username, email, password })
    );
    if (response.error) {
      console.log(response);
      alert(response.payload);
    } else {
      navigate("/");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Username</label>
      <input
        name="name"
        onChange={handleUsernameChange}
        type="text"
      />
      <label>Email</label>
      <input
        name="email"
        onChange={handleEmailChange}
        type="email"
      />
      <label>Password</label>
      <input
        onChange={handlePasswordChange}
        type="password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
