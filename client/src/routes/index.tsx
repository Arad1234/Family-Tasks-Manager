import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "@Pages/Home/Home";
import Login from "@Pages/Login/Login";
import Register from "@Pages/Register/Register";
import FamilyRoom from "@Pages/FamilyRoom/FamilyRoom";
import ForgotPassword from "@Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "@Pages/ResetPassword/ResetPassword";
import BackgroundColor from "@Layouts/BackgroundColor";

export const router = createBrowserRouter([
  {
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
