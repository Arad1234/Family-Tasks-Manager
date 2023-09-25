import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import FamilyRoom from "../pages/FamilyRoom/FamilyRoom";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import BackgroundColor from "../Layouts/BackgroundColor";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BackgroundColor>
        <Outlet />
      </BackgroundColor>
    ),
    children: [
      { path: "/", element: <Login /> },
      { path: "home", element: <Home /> },
      { path: "forgotPassword", element: <ForgotPassword /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "register", element: <Register /> },
      { path: "home/:roomId", element: <FamilyRoom /> },
    ],
  },
]);
