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
  isModalAccountLoading: true,
  accounts: [],
  totalAccountPages: 1,
  page: 1,
  size: 10,
  search: "",
  sort: "All",
  filter: "All",
  // isAccountEditing: false,
  isAccountDoneUpdating: false,
  editAccountId: null,

  email: "",
  displayName: "",
  photoUrl: null,
  gender: "",
  roles: [],
  status: 0,
  fullName: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  citizenshipNumber: "",
  citizenshipDate: "",
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
    // setUpdateAccount: (state, { payload }) => {
    //   return {
    //     ...state,
    //     isAccountEditing: true,
    //     ...payload,
    //   };
    // },
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
    },
    [getSingleAccount.fulfilled]: (state, { payload }) => {
      state.isModalAccountLoading = false;
      state.user = payload;
    },
    [getSingleAccount.rejected]: (state, { payload }) => {
      state.isModalAccountLoading = false;
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
  // setUpdateAccount,
  changeAccountPage,
  clearAllAccountsState,
} = accountSlice.actions;
export default accountSlice.reducer;
