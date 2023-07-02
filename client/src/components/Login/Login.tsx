import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginThunk } from "../../store/actions/auth-actions";
import { setEmail, setPassword } from "../../store/slices/auth-slice";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

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
      <h1>Login Page</h1>
      <div className="email-main">
        <label>Email</label>
        <input
          name="email"
          onChange={handleEmailChange}
          type="email"
        />
      </div>
      <div className="password-main">
        <label>Password</label>
        <input
          onChange={handlePasswordChange}
          type="password"
        />
      </div>

      <button
        className="login-btn"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
