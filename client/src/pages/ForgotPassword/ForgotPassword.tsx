import { useFormik } from "formik";
import { object, string } from "yup";
import ForgotPasswordForm from "../../components/Auth-UI/ForgotPassword/ForgotPasswordForm";
import { forgotPasswordThunk } from "../../redux/actions/Auth/auth-actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import Wrapper from "../../components/Common/Wrapper";
import { useState } from "react";

const ForgotPassword = () => {
  const [sentEmailMessage, setSentEmailMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
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

      setSentEmailMessage(response.payload.message);
      dispatch(setLoading(false));
    },
  });

  return loading ? (
    <Loader height="100vh" />
  ) : (
    <Wrapper>
      <ForgotPasswordForm
        sentEmailMessage={sentEmailMessage}
        formik={formik}
      />
    </Wrapper>
  );
};

export default ForgotPassword;
