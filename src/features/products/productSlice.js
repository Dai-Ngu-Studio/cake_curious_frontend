import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProductsThunk } from "./productThunk";

const initialState = {
  isProductLoading: false,
  products: [],
  totalProductPages: 1,
  page: 1,
  size: 10,
  search: "",
};

export const getAllProducts = createAsyncThunk(
  "products/getProducts",
  getAllProductsThunk
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    handleProductChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    changeProductPage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: {},
});

export const {} = productSlice.actions;
export default productSlice.reducer;
