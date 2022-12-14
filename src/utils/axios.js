import axios from "axios";
import { clearStore } from "../features/users/userSlice";
import { getTokenFromLocalStorage } from "./localStorage";
import { auth } from "../utils/firebase";
const customFetch = axios.create({
  baseURL: process.env.REACT_APP_BASEAPI_URL,
});
customFetch.interceptors.request.use(async (config) => {
  // const token = getTokenFromLocalStorage();
  const token = await auth.currentUser.getIdToken(true);
  if (token) {
    config.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response?.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Không ủy quyền! Đã đăng xuất...");
  } else if (error.code === "auth/user-disabled") {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Tài khoản của bạn đã bị hủy kích hoạt");
  }
  return thunkAPI.rejectWithValue(error);
};
export default customFetch;
