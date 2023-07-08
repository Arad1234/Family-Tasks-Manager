import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export const loginThunk = createAsyncThunk<
  { status: string; userId: string }, // The type the function returns
  LoginPayload // the arguments the function get.
>("/auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/login",
      {
        email,
        password,
      }
    );
    const { data } = response;
    return data;
  } catch (error: any) {
    const { response } = error;
    return thunkAPI.rejectWithValue(response.data.error);
  }
});

export const registerThunk = createAsyncThunk<
  string, // The type the function returns
  RegisterPayload // the arguments the function get.
>("/auth/register", async ({ username, email, password }, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/register",
      {
        username,
        email,
        password,
      }
    );
    const { data } = response;
    return data;
  } catch (error: any) {
    const { data } = error.response;
    if (data.error.code === 11000) {
      return thunkAPI.rejectWithValue("Email already exists");
    } else {
      // Getting issues from "zod" validation on the server.
      const { issues } = data.error;
      return thunkAPI.rejectWithValue(issues[0].message);
    }
  }
});
