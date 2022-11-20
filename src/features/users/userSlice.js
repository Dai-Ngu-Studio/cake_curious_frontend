import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addTokenToLocalStorage,
  addUserToLocalStorage,
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
  removeTokenFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import {
  clearStoreThunk,
  getUserThunk,
  loginGoogleThunk,
  loginUserThunk,
  updateUserRoleThunk,
} from "./userThunk";

const initialState = {
  isUserLoading: false,
  isUserRoleDoneUpdating: false,
  phoneNumber: "+84",
  fullName: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  citizenshipNumber: "",
  citizenshipDate: "",
  OTP: "",
  email: "",
  password: "",
  user: getUserFromLocalStorage(),
  token: getTokenFromLocalStorage(),
};

export const loginUser = createAsyncThunk("user/loginUser", loginUserThunk);
export const getUser = createAsyncThunk("user/getUser", getUserThunk);
export const updateUserRole = createAsyncThunk(
  "user/updateUserRole",
  updateUserRoleThunk
);
export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);
export const loginGoogle = createAsyncThunk(
  "user/loginGoogle",
  loginGoogleThunk
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleUserChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.token = null;
      removeUserFromLocalStorage();
      removeTokenFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
    clearUserLoginValues: (state) => {
      return { ...state, email: "", password: "" };
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isUserLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isUserLoading = false;
      state.token = payload.stsTokenManager.accessToken;
      addTokenToLocalStorage(payload.stsTokenManager.accessToken);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isUserLoading = false;
      toast.error(payload);
    },
    [loginGoogle.pending]: (state) => {
      state.isUserLoading = true;
    },
    [loginGoogle.fulfilled]: (state, { payload }) => {
      state.isUserLoading = false;
      state.token = payload.stsTokenManager.accessToken;
      addTokenToLocalStorage(payload.stsTokenManager.accessToken);
    },
    [loginGoogle.rejected]: (state, { payload }) => {
      state.isUserLoading = false;
      toast.error(payload);
    },
    [getUser.pending]: (state) => {
      state.isUserLoading = true;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.isUserLoading = false;
      state.user = payload;
      addUserToLocalStorage(payload);
    },
    [getUser.rejected]: (state, { payload }) => {
      state.isUserLoading = false;
      toast.error(payload);
    },
    [updateUserRole.pending]: (state) => {
      state.isUserRoleDoneUpdating = false;
    },
    [updateUserRole.fulfilled]: (state, { payload }) => {
      state.isUserRoleDoneUpdating = true;
      // addUserToLocalStorage(payload);
    },
    [updateUserRole.rejected]: (state, { payload }) => {
      state.isUserRoleDoneUpdating = false;
      toast.error(payload);
    },
    [clearStore.rejected]: () => {
      toast.error("There was an error...");
    },
  },
});

export const { handleUserChange, logoutUser, clearUserLoginValues } =
  userSlice.actions;
export default userSlice.reducer;
