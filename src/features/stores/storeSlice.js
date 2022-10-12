import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addStoreThunk,
  deleteStoreThunk,
  getAllStoresThunk,
  updateStoreThunk,
} from "./storeThunk";

const initialState = {
  isStoreLoading: false,
  stores: [],
  totalStorePages: 1,
  page: 1,
  size: 10,
  search: "",
  sort: "All",
  filter: "All",
  filterOptions: ["Inactive", "Active"],
};

export const getAllStores = createAsyncThunk(
  "store/getStores",
  getAllStoresThunk
);
export const addStore = createAsyncThunk("store/addStore", addStoreThunk);
export const updateStore = createAsyncThunk(
  "store/updateStore",
  updateStoreThunk
);
export const deleteStore = createAsyncThunk(
  "store/deleteStore",
  deleteStoreThunk
);

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    handleStoreChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    changeStorePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllStoresState: (state) => initialState,
  },
  extraReducers: {
    [getAllStores.pending]: (state) => {
      state.isStoreLoading = true;
    },
    [getAllStores.fulfilled]: (state, { payload }) => {
      state.isStoreLoading = false;
      state.stores = payload.stores;
      state.totalStorePages = payload.totalPage;
    },
    [getAllStores.rejected]: (state, { payload }) => {
      state.isStoreLoading = false;
      toast.error(payload);
    },
    [addStore.pending]: (state) => {
      state.isStoreLoading = true;
    },
    [addStore.fulfilled]: (state, { payload }) => {
      state.isStoreLoading = false;
      toast.success("Store Added");
    },
    [addStore.rejected]: (state, { payload }) => {
      state.isStoreLoading = false;
      toast.error(payload);
    },
    [updateStore.pending]: (state) => {
      state.isStoreLoading = true;
    },
    [updateStore.fulfilled]: (state, { payload }) => {
      state.isStoreLoading = false;
      toast.success("Store Updated...");
    },
    [updateStore.rejected]: (state, { payload }) => {
      state.isStoreLoading = false;
      toast.error(payload);
    },
    [deleteStore.pending]: (state) => {
      state.isStoreLoading = true;
    },
    [deleteStore.fulfilled]: (state, { payload }) => {
      state.isStoreLoading = false;
      toast.success("Store Deleted...");
    },
    [deleteStore.rejected]: (state, { payload }) => {
      state.isStoreLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleStoreChange, changeStorePage, clearAllStoresState } =
  storeSlice.actions;
export default storeSlice.reducer;
