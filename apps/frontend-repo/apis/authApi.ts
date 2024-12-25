import { AxiosResponse } from "axios";
import { TLoginRequest, TLoginResponse } from "@repo/shared-types/auth";
import axios from "./axios";
import { CommonResponse } from "../types/common";
import { Endpoint } from "../constant/Endpoint";

export const login = async (email: string, password: string) => {
  const response = await axios.post<
    TLoginRequest,
    AxiosResponse<CommonResponse<TLoginResponse>>
  >(Endpoint.Login, {
    email,
    password,
  });

  return response.data;
};

export const logout = async () => {
  const response = await axios.post<
    TLoginRequest,
    AxiosResponse<CommonResponse>
  >(Endpoint.Logout);

  return response.data;
};
