import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import FamilyRoom from "../pages/FamilyRoom/FamilyRoom";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/forgotPassword", element: <ForgotPassword /> },
  { path: "/register", element: <Register /> },
  { path: "/home/:roomId", element: <FamilyRoom /> },
]);
