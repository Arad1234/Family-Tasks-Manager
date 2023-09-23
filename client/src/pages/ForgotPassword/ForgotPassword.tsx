import { useFormik } from "formik";
import { object, string } from "yup";
import ForgotPasswordForm from "../../components/Auth-UI/ForgotPassword/ForgotPasswordForm";
import { forgotPasswordThunk } from "../../redux/actions/Auth/auth-actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import Wrapper from "../../components/Common/Wrapper";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.authReducer);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: object({
      email: string().required("Required Field").email().trim(),
    }),
    async onSubmit({ email }) {
      const response: any = await dispatch(forgotPasswordThunk({ email }));
      if (response.error) {
        return toast.error(response.payload);
      }
      toast.success(response.payload.message);
      navigate("/");
      dispatch(setLoading(false));
    },
  });

  return loading ? (
    <Loader height="100vh" />
  ) : (
    <Wrapper>
      <ForgotPasswordForm formik={formik} />
    </Wrapper>
  );
};

export default ForgotPassword;
