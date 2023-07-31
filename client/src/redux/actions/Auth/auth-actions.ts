import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../../axiosClient";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const loginThunk = createAsyncThunk<
  { userId: string; username: string }, // The type the function returns
  LoginPayload // the arguments the function get.
>("/auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const response = await axiosClient.post("/user/login", {
      email,
      password,
    });
    const { data } = response;
    const { userId, username } = data;
    return { userId, username };
  } catch (error: any) {
    const { response } = error;
    console.log(error);
    return thunkAPI.rejectWithValue(response.data.error);
  }
});

export const registerThunk = createAsyncThunk<
  string, // The type the function returns
  RegisterPayload // the arguments the function get.
>(
  "/auth/register",
  async ({ username, email, password, confirmPassword }, thunkAPI) => {
    try {
      const response = await axiosClient.post("/user/register", {
        username,
        email,
        password,
        confirmPassword,
      });
      const { data } = response;
      return data;
    } catch (error: any) {
      const { data } = error.response;
      if (data.error.code === 11000) {
        return thunkAPI.rejectWithValue("Email already exists");
      } else {
        // Getting issues from "zod" validation from the server.
        const { issues } = data.error;
        return thunkAPI.rejectWithValue(issues[0].message);
      }
    }
  }
);
