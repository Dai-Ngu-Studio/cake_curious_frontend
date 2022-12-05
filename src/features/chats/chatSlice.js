import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  username: "",
  userData: {},
  chatId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    handleChatChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    setChatting: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
    clearAllChatsState: (state) => initialState,
  },
  extraReducers: {},
});

export const { handleChatChange, setChatting, clearAllChatsState } = chatSlice.actions;
export default chatSlice.reducer;
