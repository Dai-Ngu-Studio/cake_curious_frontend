import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getProductCategoriesThunk } from "./productCategoryThunk";

const initialState = {
  isProductCategoryLoading: false,
  categories: [],
};

export const getAllProductCategories = createAsyncThunk(
  "productCategory/getProductCategories",
  getProductCategoriesThunk
);

const productCategorySlice = createSlice({
  name: "productCategory",
  initialState,
  extraReducers: {
    [getAllProductCategories.pending]: (state) => {
      state.isProductCategoryLoading = true;
    },
    [getAllProductCategories.fulfilled]: (state, { payload }) => {
      state.isProductCategoryLoading = false;
      state.categories = payload.productCategories;
    },
    [getAllProductCategories.rejected]: (state, { payload }) => {
      state.isProductCategoryLoading = false;
      toast.error(payload);
    },
  },
});

export default productCategorySlice.reducer;
