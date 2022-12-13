import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAccountThunk,
  getAllAccountsThunk,
  updateAccountThunk,
  changeRoleAccountThunk,
  addStaffAccountThunk,
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
  roles: [],
  status: 0,
  account: null,
  verifyPhoneNumber: "+84",
  OTP: "",
  /* --- only for getting user info when chatting ---- */
  isUserChatting: false,
  /* ---------------------- */
  /* ---- update user profile ----- */
  // email: "",
  displayName: "",
  fullName: "",
  photoUrl: "",
  gender: "",
  profilePhoneNumber: "",
  address: "",
  citizenshipDate: "",
  citizenshipNumber: "",
  dateOfBirth: "",
  /* ---------------- */
};

export const getAllAccounts = createAsyncThunk(
  "account/getAccounts",
  getAllAccountsThunk
);
export const getSingleAccount = createAsyncThunk(
  "account/getSingleAccount",
  getAccountThunk
);
export const getAccountForUpdating = createAsyncThunk(
  "account/getAccountForUpdating",
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
export const addStaff = createAsyncThunk(
  "account/addStaff",
  addStaffAccountThunk
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
        account: null,
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
      state.account = payload;
    },
    [getSingleAccount.rejected]: (state, { payload }) => {
      state.isModalAccountLoading = false;
    },
    [getAccountForUpdating.pending]: (state) => {
      state.isAccountLoading = true;
    },
    [getAccountForUpdating.fulfilled]: (state, { payload }) => {
      state.isAccountLoading = false;
      state.displayName = payload.displayName;
      state.fullName = payload.fullName;
      state.photoUrl = payload.photoUrl;
      state.gender = payload.gender;
      state.profilePhoneNumber = payload.phoneNumber;
      state.address = payload.address;
      state.citizenshipDate = payload.citizenshipDate;
      state.citizenshipNumber = payload.citizenshipNumber;
      state.dateOfBirth = payload.dateOfBirth;
      // gọi state.account = payload để khi update xong
      // trang profile có thể ghi đè vào user trong local storage
      state.account = payload;
    },
    [getAccountForUpdating.rejected]: (state, { payload }) => {
      state.isAccountLoading = false;
    },
    [updateAccount.pending]: (state) => {
      state.isAccountDoneUpdating = false;
    },
    [updateAccount.fulfilled]: (state, { payload }) => {
      state.isAccountDoneUpdating = true;
      toast.success("Cập nhật thông tin tài khoản thành công");
    },
    [updateAccount.rejected]: (state, { payload }) => {
      state.isAccountDoneUpdating = false;
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
    [addStaff.pending]: (state) => {
      state.isAccountLoading = true;
      state.isAccountDoneUpdating = false;
    },
    [addStaff.fulfilled]: (state, { payload }) => {
      state.isAccountLoading = false;
      state.isAccountDoneUpdating = true;
      toast.success(`Đã thêm tài khoản nhân viên thành công`);
    },
    [addStaff.rejected]: (state, { payload }) => {
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
