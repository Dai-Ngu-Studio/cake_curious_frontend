import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllReportsThunk,
  getReportThunk,
  updateReportThunk,
  getReportsOfAnItemThunk,
} from "./reportThunk";

const initialState = {
  isReportLoading: false,
  reports: [],
  totalReportPages: 1,
  page: 1,
  size: 10,
  search: "",
  sort: "All",
  type: "All",
  status: "All",
  // statusOptions: ["Censored", "Pending", "Rejected"],
  // typeOptions: ["Comment", "Recipe"],
  isReportDoneUpdating: false,
  submittedDate: null,
  itemType: 0,
  comment: null,
  recipe: null,
  reporter: null,
  title: "",
  content: "",
  staff: null,
  reportedUser: null,
  statusUpdate: 0,
};

export const getAllReports = createAsyncThunk(
  "report/getReports",
  getAllReportsThunk
);
export const getReportsOfAnItem = createAsyncThunk(
  "report/getReportsOfAnItem",
  getReportsOfAnItemThunk
);
export const getSingleReport = createAsyncThunk(
  "report/getSingleReport",
  getReportThunk
);

export const updateReport = createAsyncThunk(
  "report/updateReport",
  updateReportThunk
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    handleReportChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    changeReportPage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllReportsState: (state) => initialState,
  },
  extraReducers: {
    [getAllReports.pending]: (state) => {
      state.isReportLoading = true;
    },
    [getAllReports.fulfilled]: (state, { payload }) => {
      state.isReportLoading = false;
      state.reports = payload.reports;
      state.totalReportPages = payload.totalPage;
    },
    [getAllReports.rejected]: (state, { payload }) => {
      state.isReportLoading = false;
      toast.error(payload);
    },
    [getReportsOfAnItem.pending]: (state) => {
      state.isReportLoading = true;
    },
    [getReportsOfAnItem.fulfilled]: (state, { payload }) => {
      state.isReportLoading = false;
      state.reports = payload.reports;
      state.totalReportPages = payload.totalPage;
    },
    [getReportsOfAnItem.rejected]: (state, { payload }) => {
      state.isReportLoading = false;
      toast.error(payload);
    },
    [getSingleReport.pending]: (state) => {
      state.isReportLoading = true;
    },
    [getSingleReport.fulfilled]: (state, { payload }) => {
      state.isReportLoading = false;
      state.submittedDate = payload.submittedDate;
      state.itemType = payload.itemType;
      state.comment = payload.comment;
      state.recipe = payload.recipe;
      state.reporter = payload.reporter;
      state.title = payload.title;
      state.content = payload.content;
      state.staff = payload.staff;
      state.reportedUser = payload.reportedUser;
      state.statusUpdate = payload.status;
      state.staff = payload.staff;
    },
    [getSingleReport.rejected]: (state, { payload }) => {
      state.isReportLoading = false;
    },
    [updateReport.pending]: (state) => {
      state.isReportDoneUpdating = false;
    },
    [updateReport.fulfilled]: (state, { payload }) => {
      state.isReportDoneUpdating = true;
      toast.success("Report Updated...");
    },
    [updateReport.rejected]: (state, { payload }) => {
      state.isReportDoneUpdating = false;
      toast.error(payload);
    },
  },
});

export const { handleReportChange, changeReportPage, clearAllReportsState } =
  reportSlice.actions;
export default reportSlice.reducer;
