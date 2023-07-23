import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import FamilyRoom from "../pages/FamilyRoom/FamilyRoom";

export const router = createBrowserRouter([
  { path: "/home", element: <Home /> },
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home/:roomId", element: <FamilyRoom /> },
]);
