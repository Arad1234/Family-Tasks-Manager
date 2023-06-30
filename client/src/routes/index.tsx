import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

export const router = createBrowserRouter([
  { path: "/home", element: <Home /> },
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
