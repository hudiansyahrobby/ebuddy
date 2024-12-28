"use client";

import { AxiosResponse } from "axios";
import { UserAuthValues, TLoginResponse } from "@repo/types";
import axios from "./axios";
import { CommonResponse } from "../types/common";
import { Endpoint } from "../constant/Endpoint";

export const login = async (email: string, password: string) => {
  const response = await axios.post<
    UserAuthValues,
    AxiosResponse<CommonResponse<TLoginResponse>>
  >(Endpoint.Login, {
    email,
    password,
  });

  return response.data;
};

export const logout = async () => {
  const response = await axios.post<
    UserAuthValues,
    AxiosResponse<CommonResponse>
  >(Endpoint.Logout);

  return response.data;
};
