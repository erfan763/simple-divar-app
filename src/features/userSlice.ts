import { Action, AnyAction, createSlice } from "@reduxjs/toolkit";

import { setToken, removeToken } from "../utils/token";
import { RootState, useAppSelector } from "../store";

import { getMeThunk, loginThunk, registerThunk } from "./asyncThunks";
import { IUserType } from "api/user";

interface RejectedAction extends Action {
  payload: string;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith("rejected");
}

const initialState: IInitialState = {
  user: null,
  status: "Unauthorized",
  error: "",
  id: undefined,
  themeMode: "light",
};

interface IInitialState {
  status: "Authorized" | "Unauthorized" | "loading" | "idle";
  id: number | undefined;
  user?: Partial<IUserType> | null;
  token?: string | null;
  error: string;
  themeMode: "light" | "dark";
}

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    logout(state) {
      removeToken();
      state.status = "Unauthorized";
      state.user = null;
      state.id = undefined;
    },
    lightTheme(state) {
      state.themeMode = "light";
    },
    darkTheme(state) {
      state.themeMode = "dark";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMeThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "Authorized";
          state.user = action.payload;
        } else {
          state.status = "Unauthorized";
        }
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        if (action.payload.accessToken) {
          state.token = action.payload.accessToken;
          state.user = action.payload.user;
          state.id = action.payload.user.id;
          state.status = "Authorized";
          setToken(action.payload.accessToken);
        } else {
          state.status = "Unauthorized";
        }
      })

      .addCase(registerThunk.fulfilled, (state, action) => {
        if (action.payload.accessToken) {
          state.token = action.payload.accessToken;
          state.user = action.payload.user;
          state.id = action.payload.user.id;
          state.status = "Authorized";
          setToken(action.payload.accessToken);
        } else {
          state.status = "Unauthorized";
        }
      })

      .addMatcher(isRejectedAction, (state, action) => {
        state.status = "Unauthorized";
        state.error = action.payload;
      });
  },
});

export const selectUser = (state: RootState) => state.user;

export const useSession = () => {
  const user = useAppSelector(selectUser);

  return user.user ? user.user : null;
};

export const { logout, darkTheme, lightTheme } = userSlice.actions;

export default userSlice.reducer;
