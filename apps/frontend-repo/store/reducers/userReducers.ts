import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "@repo/types";
import { fetchUserInfo, updateUserInfo } from "../actions/userActions";

type UserState = {
  user: TUser | null;
  loading: boolean;
  error: null | string;
  success: boolean;
};

const initialState: UserState = {
  user: null,
  loading: false,
  success: false,
  error: null,
};

export const userSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // fetch user info
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload?.data ?? null;
      })
      .addCase(fetchUserInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = (payload as string) || "Failed to fetch user info";
      })

      // update user info
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.user = payload?.data ?? null;
      })
      .addCase(updateUserInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = (payload as string) || "Failed to update user info";
      });
  },
});

export const { clearUserState } = userSlices.actions;

export default userSlices.reducer;
