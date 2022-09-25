import axios from "axios";
import { getTokenFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
  baseURL: "http://localhost:8000",
});
customFetch.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default customFetch;
