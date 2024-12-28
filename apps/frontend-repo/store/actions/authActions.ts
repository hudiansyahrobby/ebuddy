import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, signup } from "../../apis/authApi";
import { UserAuthValues } from "@repo/types";
import { AxiosError } from "axios";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ email, password }: UserAuthValues, { rejectWithValue }) => {
    try {
      const data = await signup(email, password);
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

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: UserAuthValues, { rejectWithValue }) => {
    try {
      const data = await login(email, password);
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

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_params, { rejectWithValue }) => {
    try {
      const data = await logout();
      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        return rejectWithValue(error?.response?.data.message);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
