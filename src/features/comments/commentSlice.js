import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllReportedCommentsThunk,
  getCommentThunk,
  deleteCommentThunk,
} from "./commentThunk";
const initialState = {
  isCommentsLoading: true,
  isCommentDoneUpdating: true,
  reportedComments: [],
  comment: null,
  isModalLoading: true,
  page: 1,
  size: 10,
  search: "",
  sort: "All",
  filter: "Active",
  totalPage: 1,
};

export const getAllReportedComments = createAsyncThunk(
  "recipe/getComments",
  getAllReportedCommentsThunk
);
export const getComment = createAsyncThunk(
  "comment/getComment",
  getCommentThunk
);
export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  deleteCommentThunk
);

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
      state.isCommentsLoading = true;
    },
    [getAllReportedComments.fulfilled]: (state, { payload }) => {
      state.isCommentsLoading = false;
      state.reportedComments = payload.comments;
      state.totalPage = payload.totalPage;
    },
    [getAllReportedComments.rejected]: (state, { payload }) => {
      state.isCommentsLoading = false;
      toast.error(payload);
    },
    [getComment.pending]: (state) => {
      state.isCommentsLoading = true;
    },
    [getComment.fulfilled]: (state, { payload }) => {
      state.isCommentsLoading = false;
      state.comment = payload;
    },
    [getComment.rejected]: (state, { payload }) => {
      state.isCommentsLoading = false;
    },
    [deleteComment.pending]: (state) => {
      state.isCommentDoneUpdating = false;
    },
    [deleteComment.fulfilled]: (state, { payload }) => {
      state.isCommentDoneUpdating = true;
      toast.success("Xóa bỏ công thức thành công");
    },
    [deleteComment.rejected]: (state, { payload }) => {
      state.isCommentDoneUpdating = true;
    },
  },
});

export const { handleCommentChange, changeCommentPage, clearAllCommentsState } =
  commentSlice.actions;
export default commentSlice.reducer;
