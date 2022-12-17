import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { pushChatNotificationThunk } from "./notificationThunk";

const initialState = {
  isNotificationLoading: false,
};

export const pushChatNotification = createAsyncThunk(
  "notification/pushChatNotification",
  pushChatNotificationThunk
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: {
    [pushChatNotification.pending]: (state) => {
      state.isNotificationLoading = true;
    },
    [pushChatNotification.fulfilled]: (state, { payload }) => {
      state.isNotificationLoading = false;
    },
    [pushChatNotification.rejected]: (state, { payload }) => {
      state.isNotificationLoading = false;
      toast.error(payload);
    },
  },
});

export const {} = notificationSlice.actions;
export default notificationSlice.reducer;
