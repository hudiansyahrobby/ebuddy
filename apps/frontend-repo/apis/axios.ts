import axios from "axios";
import { Route } from "../constant/Route";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    if (!err.response) throw err;
    const isUnauthorized = err.response.status === 401;
    if (isUnauthorized) {
      Cookies.remove("token");
      window.location.href = Route.Login;
      return err;
    }
    throw err;
  }
);

export default instance;
