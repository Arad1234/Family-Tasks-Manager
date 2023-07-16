import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { setLoading } from "../../slices/Auth/auth-slice";

export const getRoomsThunk = createAsyncThunk(
  "/rooms/getRooms",
  async (_, { dispatch, rejectWithValue }) => {
    // Dispatch action to the auth slice.
    dispatch(setLoading(true));
    try {
      const response: AxiosResponse = await axios.get(
        "http://localhost:3000/api/v1/data/rooms"
      );
      const { data } = response;
      return data;
    } catch (error: any) {
      const { response } = error;
      return rejectWithValue(response.data.error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const createRoomThunk = createAsyncThunk<
  object,
  { roomName: string; maxMembers: number }
>(
  "/rooms/createRoom",
  async ({ roomName, maxMembers }, { dispatch, rejectWithValue }) => {
    // Dispatch action to the auth slice.
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/data/createRoom",
        {
          roomName: roomName,
          maxMembers: maxMembers,
        }
      );
      dispatch(setLoading(false));
      const { data } = response;
      console.log(data);

      return data;
    } catch (error: any) {
      dispatch(setLoading(false));
      const { data } = error.response;
      const { issues } = data.error;
      console.log(issues);
      return issues
        ? rejectWithValue(issues[0].message)
        : rejectWithValue(data.error);
    }
  }
);
