import { useFormik } from "formik";
import { object, string } from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "@Redux/hooks";
import { resetPasswordThunk } from "@Redux/thunk/Auth/auth-actions";
import ResetPasswordForm from "@Components/Auth-UI/ResetPassword/ResetPasswordForm";
import { FormWrapperStyled } from "@Components/Auth-UI/Wrapper/Wrapper.styled";

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const resetToken = query.get("token") as string;

  const formik = useFormik({
    initialValues: { newPassword: "", confirmPassword: "" },
    validationSchema: object({
      newPassword: string().required("Required Field"),
      confirmPassword: string().required("Required Field"),
    }),
    async onSubmit({ newPassword, confirmPassword }) {
      const response: any = await dispatch(
        resetPasswordThunk({ newPassword, confirmPassword, resetToken })
      );

      if (response.error) {
        return toast.error(response.payload);
      }

      toast.success(response.payload.message);
      navigate("/");
    },
  });

  return (
    <FormWrapperStyled>
      <ResetPasswordForm formik={formik} />
    </FormWrapperStyled>
  );
};

export default ResetPassword;
