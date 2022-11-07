import axios from "axios";
import { clearStore } from "../features/users/userSlice";
import { getTokenFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
  baseURL: process.env.REACT_APP_BASEAPI_URL,
});
customFetch.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error);
};
export default customFetch;
