import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UpdateUserValues } from "@repo/types";
import { fetchUser, updateUser } from "../../apis/userApi";

export const fetchUserInfo = createAsyncThunk(
  "user/fetch-user-info",
  async (_params, { rejectWithValue }) => {
    try {
      const data = await fetchUser();
      return data.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        return rejectWithValue(error?.response?.data.message);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/update-user-info",
  async (body: UpdateUserValues, { rejectWithValue }) => {
    try {
      const data = await updateUser(body);
      return data.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        return rejectWithValue(error?.response?.data.message);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
