import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAccountThunk,
  getAllAccountsThunk,
  updateAccountThunk,
  changeRoleAccountThunk,
} from "./accountThunk";

const initialState = {
  isAccountLoading: false,
  isModalAccountLoading: true,
  accounts: [],
  totalAccountPages: 1,
  page: 1,
  size: 10,
  search: "",
  sort: "All",
  filter: "All",
  isAccountDoneUpdating: false,
  editAccountId: null,
  email: "",
  displayName: "",
  photoUrl: null,
  gender: "",
  roles: [],
  status: 0,
  phoneNumber: "+84",
  OTP: "",
  // fullName: "",
  // gender: "",
  // dateOfBirth: "",
  // address: "",
  // citizenshipNumber: "",
  // citizenshipDate: "",
  /* --- only for getting user info when chatting ---- */
  isUserChatting: false,
  /* ---------------------- */
  user: null,
};

export const getAllAccounts = createAsyncThunk(
  "account/getAccounts",
  getAllAccountsThunk
);
export const getSingleAccount = createAsyncThunk(
  "account/getSingleAccount",
  getAccountThunk
);
export const updateAccount = createAsyncThunk(
  "account/updateAccount",
  updateAccountThunk
);
export const updateAccountRole = createAsyncThunk(
  "account/changeRoleAccountThunk",
  changeRoleAccountThunk
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    handleAccountChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    changeAccountPage: (state, { payload }) => {
      state.page = payload;
    },
    clearGetUserChatState: (state) => {
      return {
        ...state,
        user: null,
      };
    },
    clearAllAccountsState: (state) => initialState,
  },
  extraReducers: {
    [getAllAccounts.pending]: (state) => {
      state.isAccountLoading = true;
    },
    [getAllAccounts.fulfilled]: (state, { payload }) => {
      state.isAccountLoading = false;
      state.accounts = payload.users;
      state.totalAccountPages = payload.totalPage;
    },
    [getAllAccounts.rejected]: (state, { payload }) => {
      state.isAccountLoading = false;
      toast.error(payload);
    },
    [getSingleAccount.pending]: (state) => {
      state.isModalAccountLoading = true;
      state.isUserChatting = false;
    },
    [getSingleAccount.fulfilled]: (state, { payload }) => {
      state.isModalAccountLoading = false;
      state.isUserChatting = true;
      state.user = payload;
    },
    [getSingleAccount.rejected]: (state, { payload }) => {
      state.isModalAccountLoading = false;
      state.isUserChatting = false;
    },
    [updateAccount.pending]: (state) => {
      state.isAccountLoading = true;
      state.isAccountDoneUpdating = false;
    },
    [updateAccount.fulfilled]: (state, { payload }) => {
      state.isAccountLoading = false;
      state.isAccountDoneUpdating = true;
      toast.success("Account Updated...");
    },
    [updateAccount.rejected]: (state, { payload }) => {
      state.isAccountLoading = false;
      toast.error(payload);
    },
    [updateAccountRole.pending]: (state) => {
      state.isAccountLoading = true;
      state.isAccountDoneUpdating = false;
    },
    [updateAccountRole.fulfilled]: (state, { payload }) => {
      state.isAccountLoading = false;
      state.isAccountDoneUpdating = true;
      toast.success("Chỉnh sửa chức vụ thành công");
    },
    [updateAccountRole.rejected]: (state, { payload }) => {
      state.isAccountLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  handleAccountChange,
  clearGetUserChatState,
  changeAccountPage,
  clearAllAccountsState,
} = accountSlice.actions;
export default accountSlice.reducer;
