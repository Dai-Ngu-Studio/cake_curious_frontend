import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addReasonThunk } from "./reasonThunk";

const initialState = {
  isReasonDoneAdding: true,
};

export const addReason = createAsyncThunk("reason/addReason", addReasonThunk);
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
  },
});

export const { handleReasonChange, clearAllReasonStates } = reasonSlice.actions;
export default reasonSlice.reducer;
