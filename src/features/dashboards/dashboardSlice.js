import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAdminDashboardThunk,
  getStaffDashboardThunk,
  getStoreDashboardThunk,
} from "./dashboardThunk";

const initialState = {
  isDashboardLoading: false,
  cardStats: {},
  barChart: {},
  lineChart: {},
  tableStoreVisit: [],
  tableFamousRecipe: [],
};

export const getAdminDashboard = createAsyncThunk(
  "dashboard/getAdminDashboard",
  getAdminDashboardThunk
);
export const getStoreDashboard = createAsyncThunk(
  "dashboard/getStoreDashboard",
  getStoreDashboardThunk
);
export const getStaffDashboard = createAsyncThunk(
  "dashboard/getStaffDashboard",
  getStaffDashboardThunk
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearAllDashboardsState: (state) => initialState,
  },
  extraReducers: {
    [getAdminDashboard.pending]: (state) => {
      state.isDashboardLoading = true;
    },
    [getAdminDashboard.fulfilled]: (state, { payload }) => {
      state.isDashboardLoading = false;
      state.cardStats = payload.cardStats;
      state.barChart = payload.barChart;
      state.lineChart = payload.lineChart;
      state.tableStoreVisit = payload.tableStoreVisit;
      state.tableFamousRecipe = payload.tableFamousRecipe;
    },
    [getAdminDashboard.rejected]: (state, { payload }) => {
      state.isDashboardLoading = false;
      toast.error(payload);
    },
    [getStoreDashboard.pending]: (state) => {
      state.isDashboardLoading = true;
    },
    [getStoreDashboard.fulfilled]: (state, { payload }) => {
      state.isDashboardLoading = false;
      state.cardStats = payload.cardStats;
      state.barChart = payload.barChart;
      state.lineChart = payload.lineChart;
    },
    [getStoreDashboard.rejected]: (state, { payload }) => {
      state.isDashboardLoading = false;
      toast.error(payload);
    },
    [getStaffDashboard.pending]: (state) => {
      state.isDashboardLoading = true;
    },
    [getStaffDashboard.fulfilled]: (state, { payload }) => {
      state.isDashboardLoading = false;
      state.cardStats = payload.cardStats;
      state.barChart = payload.barChart;
      state.lineChart = payload.lineChart;
    },
    [getStaffDashboard.rejected]: (state, { payload }) => {
      state.isDashboardLoading = false;
      toast.error(payload);
    },
  },
});

export const { clearAllDashboardsState } = dashboardSlice.actions;
export default dashboardSlice.reducer;
