import { useAppDispatch } from "../../redux/hooks";
import { registerThunk } from "../../redux/actions/Auth/auth-actions";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import RegisterTitle from "../../components/Auth-UI/Register/Title";
import { useFormik } from "formik";
import { object, string } from "yup";
import RegisterFormComponent from "../../components/Auth-UI/Register/RegisterFormComponent";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema: object({
      name: string().required("Required Field").trim(),
      email: string().email().required("Required Field").trim(),
      password: string().required("Required Field"),
      confirmPassword: string().required("Required Field"),
    }),
    async onSubmit({ name, email, password, confirmPassword }) {
      const response: any = await dispatch(
        registerThunk({ username: name, email, password, confirmPassword })
      );

      if (response.error) {
        return toast.error(response.payload);
      }

      toast.success("Created User Successfully!");
      navigate("/");
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        gap: "20px",
      }}
    >
      <RegisterTitle />
      <RegisterFormComponent formik={formik} />
    </Box>
  );
};

export default Register;
