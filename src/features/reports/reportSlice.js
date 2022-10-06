import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllReportsThunk, updateReportThunk } from "./reportThunk";

const initialState = {
  isReportLoading: false,
  reports: [],
  totalReportPages: 1,
  page: 1,
  size: 10,
  search: "",
  sort: "All",
  filter: "All",
  filterOptions: ["Comment", "Recipe"],
};

export const getAllReports = createAsyncThunk(
  "report/getReports",
  getAllReportsThunk
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
    [updateReport.pending]: (state) => {
      state.isReportLoading = true;
    },
    [updateReport.fulfilled]: (state, { payload }) => {
      state.isReportLoading = false;
      toast.success("Report Updated...");
    },
    [updateReport.rejected]: (state, { payload }) => {
      state.isReportLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleReportChange, changeReportPage } = reportSlice.actions;
export default reportSlice.reducer;
