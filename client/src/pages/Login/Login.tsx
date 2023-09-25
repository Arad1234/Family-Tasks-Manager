import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginThunk } from "../../redux/actions/Auth/auth-actions";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SignInWithOAuth } from "../../supabase/OAuth";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import LoginFormComponent from "../../components/Auth-UI/Login/LoginFormComponent";
import Wrapper from "../../components/Common/Wrapper";

const Login = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.authReducer);
  const supabase = useSupabaseClient();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: object({
      email: string().email().required("Required Field").trim(),
      password: string().required("Required Field"),
    }),
    async onSubmit({ email, password }) {
      const response: any = await dispatch(loginThunk({ email, password }));

      if (response.error) {
        toast.error(response.payload as string);
        return;
      }

      // This will trigger an auth event SIGNED_IN.
      const { error } = await SignInWithOAuth(supabase);

      if (error) {
        alert("Error logging in to Google provider with Supabase");
        console.log(error);
      }
    },
  });

  return loading ? (
    <Loader />
  ) : (
    <Wrapper>
      <LoginFormComponent formik={formik} />
    </Wrapper>
  );
};

export default Login;
