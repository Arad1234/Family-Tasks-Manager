import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginThunk = createAsyncThunk<
  string, // The type the function returns
  { email: string; password: string } // the arguments the function get.
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
    console.log("asdsad");
    thunkAPI.rejectWithValue(error.message);
  }
});

export const registerThunk = createAsyncThunk<
  string, // The type the function returns
  { username: string; email: string; password: string } // the arguments the function get.
>("/auth/login", async ({ username, email, password }, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/register",
      {
        email,
        password,
      }
    );
    const { data } = response;
    return data;
  } catch (error: any) {
    console.log("asdsad");
    thunkAPI.rejectWithValue(error.message);
  }
});
