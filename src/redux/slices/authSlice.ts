import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authApi, Profile } from "../api/authApi";

export type AuthState = {
  user: Profile | null;
  token: string | null;
  status: "idle" | "authenticated";
};

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: Profile }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.status = "authenticated";
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.status = "authenticated";
      },
    );
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
