import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginThunk } from "../../store/actions/auth-actions";
import { setEmail, setPassword } from "../../store/slices/auth-slice";

const Login = () => {
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
    dispatch(loginThunk({ email, password }));
  };
  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
