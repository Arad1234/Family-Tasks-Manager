import { useFormik } from "formik";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { forgotPasswordThunk } from "@Redux/thunk/Auth/auth-actions";
import { setLoading } from "@Redux/slices/Auth/auth-slice";
import Loader from "@Components/Common/Loader";
import ForgotPasswordTitle from "@Components/Auth-UI/ForgotPassword/ForgotPasswordTitle";
import ForgotPasswordForm from "@Components/Auth-UI/ForgotPassword/ForgotPasswordForm";
import { FormWrapperStyled } from "@Components/Auth-UI/Wrapper/Wrapper.styled";

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
    <Loader />
  ) : (
    <FormWrapperStyled
      height={sentEmailMessage ? undefined : "auto"}
      gap={sentEmailMessage ? undefined : "50px"}
    >
      {!sentEmailMessage && <ForgotPasswordTitle />}
      <ForgotPasswordForm
        sentEmailMessage={sentEmailMessage}
        formik={formik}
      />
    </FormWrapperStyled>
  );
};

export default ForgotPassword;
