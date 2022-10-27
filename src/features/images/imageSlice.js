import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getImageThunk } from "./imageThunk";

const initialState = {
  isGetImageLoading: false,
  image: "",
};

export const getImage = createAsyncThunk("image/getImage", getImageThunk);

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    clearImageValues: () => initialState,
  },
  extraReducers: {
    [getImage.pending]: (state) => {
      state.isGetImageLoading = true;
    },
    [getImage.fulfilled]: (state, { payload }) => {
      state.isGetImageLoading = false;
      state.image = payload;
    },
    [getImage.rejected]: (state, { payload }) => {
      state.isGetImageLoading = false;
      toast.error(payload);
    },
  },
});

export const { clearImageValues } = imageSlice.actions;
export default imageSlice.reducer;
