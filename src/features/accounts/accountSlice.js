import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  deleteAccountThunk,
  getAccountThunk,
  getAllAccountsThunk,
  updateAccountThunk,
} from "./accountThunk";

const initialState = {
  isAccountLoading: false,
  accounts: [],
  totalAccountPages: 1,
  page: 1,
  size: 10,
  search: "",
  sort: "All",
  filter: "All",
  filterOptions: ["Inactive", "Active"],
  isAccountEditing: false,
  editAccountId: null,
  email: "",
  displayName: "",
  photoUrl: null,
  gender: "",
  roles: [],
  status: 0,
};

export const getAllAccounts = createAsyncThunk(
  "account/getAccounts",
  getAllAccountsThunk
);
export const updateAccount = createAsyncThunk(
  "account/updateAccount",
  updateAccountThunk
);
export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  deleteAccountThunk
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
    setUpdateAccount: (state, { payload }) => {
      return {
        ...state,
        isAccountEditing: true,
        ...payload,
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
    [updateAccount.pending]: (state) => {
      state.isAccountLoading = true;
    },
    [updateAccount.fulfilled]: (state, { payload }) => {
      state.isAccountLoading = false;
      toast.success("Account Updated...");
    },
    [updateAccount.rejected]: (state, { payload }) => {
      state.isAccountLoading = false;
      toast.error(payload);
    },
    [deleteAccount.pending]: (state) => {
      state.isAccountLoading = true;
    },
    [deleteAccount.fulfilled]: (state, { payload }) => {
      state.isAccountLoading = false;
      toast.success("Account Deleted...");
    },
    [deleteAccount.rejected]: (state, { payload }) => {
      state.isAccountLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  handleAccountChange,
  setUpdateAccount,
  changeAccountPage,
  clearAllAccountsState,
} = accountSlice.actions;
export default accountSlice.reducer;
