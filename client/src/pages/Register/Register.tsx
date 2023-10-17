import { useAppDispatch } from "../../redux/hooks";
import { registerThunk } from "../../redux/actions/Auth/auth-actions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RegisterTitle from "../../components/Auth-UI/Register/RegisterTitle";
import { useFormik } from "formik";
import { object, string } from "yup";
import RegisterFormComponent from "../../components/Auth-UI/Register/RegisterFormComponent";
import Wrapper from "../../components/Common/Wrapper";

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
    <Wrapper
      height="auto"
      gap="50px"
    >
      <RegisterTitle />
      <RegisterFormComponent formik={formik} />
    </Wrapper>
  );
};

export default Register;
