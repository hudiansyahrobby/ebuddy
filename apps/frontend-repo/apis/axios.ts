import axios from "axios";
import { Route } from "../constant/Route";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

if (typeof window !== "undefined") {
  const token = localStorage.getItem("token"); // Access localStorage on the client-side
  if (token) {
    instance.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
}

instance.interceptors.response.use(null, (err) => {
  if (!err.response) throw err;

  const isUnauthorized = err.response.status === 401;

  if (isUnauthorized) {
    localStorage.removeItem("token");
    window.location.href = Route.Login;
    return err;
  }

  throw err;
});

export default instance;
