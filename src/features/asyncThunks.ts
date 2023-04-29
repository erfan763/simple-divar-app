import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMe, login, register } from "../api/user";

export const loginThunk = createAsyncThunk(
  "user/loginThunk",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await login(data);
    } catch (error: any) {
      return rejectWithValue(error || "An error occurred");
    }
  }
);

export const getMeThunk = createAsyncThunk("user/getMeThunk", async (data: { id: number }, { rejectWithValue }) => {
  try {
    return await getMe({ id: data.id });
  } catch (error: any) {
    return rejectWithValue(error || "An error occurred");
  }
});

export const registerThunk = createAsyncThunk(
  "user/registerThunk",
  async (data: { email: string; password: string; username: string }, { rejectWithValue }) => {
    try {
      return await register(data);
    } catch (error: any) {
      return rejectWithValue(error || "An error occurred");
    }
  }
);
