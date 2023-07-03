import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { setLoading } from "../slices/auth-slice";

export const getRoomsThunk = createAsyncThunk(
  "/rooms/getRooms",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const response: AxiosResponse = await axios.get(
        "http://localhost:3000/api/v1/data/rooms"
      );
      const { data } = response;
      console.log(data);
      return data;
    } catch (error: any) {
      const { response } = error;
      return rejectWithValue(response.data.error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const createRoomThunk = createAsyncThunk(
  "/rooms/createRoom",
  async ({ roomName, maxMembers }, { dispatch, rejectWithValue }) => {}
);
