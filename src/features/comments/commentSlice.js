import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllReportedCommentsThunk } from "./commentThunk";
const initialState = {
  isLoading: true,
  reportedComments: [],
  isModalLoading: true,
  page: 1,
  size: 10,
  search: "",
  sort: "All",
  filter: "All",
  totalPage: 1,
};

export const getAllReportedComments = createAsyncThunk(
  "recipe/getComments",
  getAllReportedCommentsThunk
);
// export const getSingleAccount = createAsyncThunk(
//   "account/getSingleAccount",
//   getAccountThunk
// );
// export const updateAccount = createAsyncThunk(
//   "account/updateAccount",
//   updateAccountThunk
// );
// export const updateAccountRole = createAsyncThunk(
//   "account/changeRoleAccountThunk",
//   changeRoleAccountThunk
// );

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    handleCommentChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    changeCommentPage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllCommentsState: (state) => initialState,
  },
  extraReducers: {
    [getAllReportedComments.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllReportedComments.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.reportedComments = payload.comments;
      state.totalPage = payload.totalPage;
    },
    [getAllReportedComments.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleCommentChange, changeCommentPage, clearAllCommentsState } =
  commentSlice.actions;
export default commentSlice.reducer;
