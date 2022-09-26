import axios from "axios";
import { getTokenFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
  baseURL: process.env.REACT_APP_DEPLOYMENT_URL,
});
customFetch.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default customFetch;
