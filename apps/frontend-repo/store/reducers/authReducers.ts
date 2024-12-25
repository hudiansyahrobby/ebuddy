import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../actions/authActions";

// initialize userToken from local storage
let userToken: string | null = null;

if (typeof window !== "undefined") {
  userToken = localStorage.getItem("token");
}

type AuthState = {
  userToken: string | null;
  loading: boolean;
  error: null | string;
};

const initialState: AuthState = {
  userToken,
  loading: false,
  error: null,
};

export const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userToken = payload?.accessToken ?? null;
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
        state.userToken = null;
        localStorage.removeItem("token");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to logout";
      });
  },
});

export default authSlices.reducer;
