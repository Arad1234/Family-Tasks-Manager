import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { loginThunk } from "@Redux/thunk/Auth/auth-actions";
import Loader from "@Components/Loader/Loader";
import Wrapper from "@Components/Auth-UI/Wrapper";
import LoginTitle from "@Components/Auth-UI/Login/LoginTitle";
import LoginFormComponent from "@Components/Auth-UI/Login/LoginFormComponent";
import { SignInWithOAuth } from "@Supabase/OAuth";

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

  //// Need to implement OAuth with google
  const loginWithGoogle = async () => {
    // This will trigger an auth event SIGNED_IN.
    const { error } = await SignInWithOAuth(supabase);

    if (error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Wrapper
        height="auto"
        gap="50px"
      >
        <LoginTitle />
        <LoginFormComponent
          loginWithGoogle={loginWithGoogle}
          formik={formik}
        />
      </Wrapper>
    </>
  );
};

export default Login;
