import axios from "axios";

export const getToken = () => {
  const token = localStorage.getItem("token");

  return token;
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export default instance;
