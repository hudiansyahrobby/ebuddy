import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, signupUser } from "../actions/authActions";
import Cookies from "js-cookie";

let userToken = Cookies.get("token") || undefined;

type AuthState = {
  userToken: string | undefined;
  loading: boolean;
  error: null | string;
  success: boolean;
};

const initialState: AuthState = {
  userToken,
  loading: false,
  error: null,
  success: false,
};

export const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = (payload as string) || "Failed to login";
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userToken = payload?.accessToken;
        localStorage.setItem("token", payload?.accessToken ?? "");
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = (payload as string) || "Failed to login";
      })

      // logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.userToken = undefined;
        localStorage.removeItem("token");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to logout";
      });
  },
});

export const { clearAuthState } = authSlices.actions;

export default authSlices.reducer;
