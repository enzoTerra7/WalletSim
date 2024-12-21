import axios from "axios";
import { getCookie } from "cookies-next";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BRAPI_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = process.env.NEXT_PUBLIC_BRAPI_TOKEN;

  const jwt = await getCookie("token");

  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }

  if (token) {
    config.url = `${config.url}?token=${token}`;
  }

  return config;
});
