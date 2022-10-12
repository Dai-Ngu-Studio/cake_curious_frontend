import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addProductThunk,
  deleteProductThunk,
  getAllProductsThunk,
  updateProductThunk,
} from "./productThunk";

const initialState = {
  isProductLoading: false,
  products: [],
  totalProductPages: 1,
  page: 1,
  size: 10,
  search: "",
  sort: "All",
  filter: "All",
  filterOptions: ["Ingredient", "Tool"],
};

export const getAllProducts = createAsyncThunk(
  "product/getProducts",
  getAllProductsThunk
);
export const addProduct = createAsyncThunk(
  "product/addProduct",
  addProductThunk
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  updateProductThunk
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  deleteProductThunk
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    handleProductChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    changeProductPage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllProductsState: (state) => initialState,
  },
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.isProductLoading = true;
    },
    [getAllProducts.fulfilled]: (state, { payload }) => {
      state.isProductLoading = false;
      state.products = payload.products;
      state.totalProductPages = payload.totalPage;
    },
    [getAllProducts.rejected]: (state, { payload }) => {
      state.isProductLoading = false;
      toast.error(payload);
    },
    [addProduct.pending]: (state) => {
      state.isProductLoading = true;
    },
    [addProduct.fulfilled]: (state, { payload }) => {
      state.isProductLoading = false;
      toast.success("Product Added");
    },
    [addProduct.rejected]: (state, { payload }) => {
      state.isProductLoading = false;
      toast.error(payload);
    },
    [updateProduct.pending]: (state) => {
      state.isProductLoading = true;
    },
    [updateProduct.fulfilled]: (state, { payload }) => {
      state.isProductLoading = false;
      toast.success("Product Updated...");
    },
    [updateProduct.rejected]: (state, { payload }) => {
      state.isProductLoading = false;
      toast.error(payload);
    },
    [deleteProduct.pending]: (state) => {
      state.isProductLoading = true;
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      state.isProductLoading = false;
      toast.success("Product Deleted...");
    },
    [deleteProduct.rejected]: (state, { payload }) => {
      state.isProductLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleProductChange, changeProductPage, clearAllProductsState } =
  productSlice.actions;
export default productSlice.reducer;
