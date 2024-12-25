import { TUser, UpdateUserValues } from "@repo/types";
import { AxiosResponse } from "axios";
import axios from "./axios";

import { Endpoint } from "./../constant/Endpoint";
import { CommonResponse } from "../types/common";

export const fetchUser = async () => {
  const response = await axios.get<CommonResponse<TUser>>(Endpoint.User.Fetch);

  return response;
};

export const updateUser = async (data: UpdateUserValues) => {
  const response = await axios.put<
    UpdateUserValues,
    AxiosResponse<CommonResponse<TUser>>
  >(Endpoint.User.Update, data);

  return response;
};
