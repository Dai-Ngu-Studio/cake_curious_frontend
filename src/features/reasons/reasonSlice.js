import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addReasonThunk,
  getReasonThunk,
  getReasonForItemThunk,
} from "./reasonThunk";

const initialState = {
  isDoneLoadingReason: false,
  isReasonDoneAdding: false,
  IdRequesting: "",
  reason: null,
};

export const addReason = createAsyncThunk("reason/addReason", addReasonThunk);
export const getReason = createAsyncThunk("reason/getReason", getReasonThunk);
export const getReasonForItem = createAsyncThunk(
  "reason/getReasonForItem",
  getReasonForItemThunk
);
const reasonSlice = createSlice({
  name: "reason",
  initialState,
  reducers: {
    handleReasonChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearAllReasonStates: (state) => initialState,
  },
  extraReducers: {
    [addReason.pending]: (state) => {
      state.isReasonDoneAdding = false;
    },
    [addReason.fulfilled]: (state, { payload }) => {
      state.isReasonDoneAdding = true;
    },
    [addReason.rejected]: (state, { payload }) => {
      state.isReasonDoneAdding = false;
      toast.error(payload);
    },
    [getReason.pending]: (state) => {
      state.isDoneLoadingReason = false;
    },
    [getReason.fulfilled]: (state, { payload }) => {
      state.isDoneLoadingReason = true;
      state.reason = payload;
    },
    [getReason.rejected]: (state, { payload }) => {
      state.isDoneLoadingReason = false;
      toast.error(payload);
    },
    [getReasonForItem.pending]: (state) => {
      state.isDoneLoadingReason = false;
    },
    [getReasonForItem.fulfilled]: (state, { payload }) => {
      state.isDoneLoadingReason = true;
      state.reason = payload;
    },
    [getReasonForItem.rejected]: (state, { payload }) => {
      state.isDoneLoadingReason = false;
      toast.error(payload);
    },
  },
});

export const { handleReasonChange, clearAllReasonStates } = reasonSlice.actions;
export default reasonSlice.reducer;
