import { TUser } from "@repo/shared-types/user";
import { AxiosResponse } from "axios";
import axios from "./axios";

import { Endpoint } from "./../constant/Endpoint";
import { UpdateUserRequest, User } from "./../../backend-repo/entities/user";
import { CommonResponse } from "../types/common";

export const fetchUser = async () => {
  const response = await axios.get<CommonResponse<TUser>>(Endpoint.User.Fetch);

  return response;
};

export const updateUser = async (data: UpdateUserRequest) => {
  const response = await axios.put<
    UpdateUserRequest,
    AxiosResponse<CommonResponse<User>>
  >(Endpoint.User.Update, data);

  return response;
};
