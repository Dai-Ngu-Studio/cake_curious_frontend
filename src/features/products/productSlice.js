import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addProductThunk,
  deleteProductThunk,
  getAllProductsThunk,
  getProductThunk,
  updateProductThunk,
} from "./productThunk";

const initialState = {
  isProductLoading: false,
  products: [],
  product: {},
  totalProductPages: 1,
  page: 1,
  size: 10,
  search: "",
  sort: "All",
  filter: "All",
  filterOptions: ["Ingredient", "Tool"],
  // isProductEditing: false,
  // editProductId: "",
  isProductDoneUpdating: false,
  productType: 0,
  productCategoryId: 0,
  name: "",
  description: "",
  quantity: 0,
  price: 0,
  discount: 0,
  photoUrl: null,
  status: 0,
};

export const getAllProducts = createAsyncThunk(
  "product/getProducts",
  getAllProductsThunk
);
export const getSingleProduct = createAsyncThunk(
  "product/getSingleProduct",
  getProductThunk
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
    // setUpdateProduct: (state, { payload }) => {
    //   return {
    //     ...state,
    //     isProductEditing: true,
    //     ...payload,
    //   };
    // },
    clearProductValues: () => {
      return {
        ...initialState,
      };
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
    [getSingleProduct.pending]: (state) => {
      state.isProductLoading = true;
    },
    [getSingleProduct.fulfilled]: (state, { payload }) => {
      state.isProductLoading = false;
      state.productType = payload.productType;
      state.productCategoryId = payload.productCategoryId;
      state.name = payload.name;
      state.description = payload.description;
      state.quantity = payload.quantity;
      state.price = payload.price;
      state.discount = payload.discount;
      state.photoUrl = payload.photoUrl;
      state.status = payload.status;
    },
    [getSingleProduct.rejected]: (state, { payload }) => {
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
      state.isProductDoneUpdating = false;
    },
    [updateProduct.fulfilled]: (state, { payload }) => {
      state.isProductLoading = false;
      state.isProductDoneUpdating = true;
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

export const {
  handleProductChange,
  // setUpdateProduct,
  changeProductPage,
  clearAllProductsState,
  clearProductValues,
} = productSlice.actions;
export default productSlice.reducer;
