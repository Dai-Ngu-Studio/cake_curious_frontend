import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addStoreThunk,
  deleteStoreThunk,
  getAllStoresThunk,
  updateStoreThunk,
  userStoreThunk,
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
  isStoreEditing: false,
  editStoreId: null,
  user: {},
  name: "",
  description: "",
  photoUrl: null,
  address: "",
  rating: 0,
  status: 0,
};

export const getAllStores = createAsyncThunk(
  "store/getStores",
  getAllStoresThunk
);
export const getUserStore = createAsyncThunk(
  "store/getUserStore",
  userStoreThunk
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
    setUpdateStore: (state, { payload }) => {
      return {
        ...state,
        isStoreEditing: true,
        ...payload,
      };
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
    [getUserStore.pending]: (state) => {
      state.isStoreLoading = true;
    },
    [getUserStore.fulfilled]: (state, { payload }) => {
      state.isStoreLoading = false;
      state.id = payload.id;
      state.user = payload.user;
      state.name = payload.name;
      state.description = payload.description;
      state.photoUrl = payload.photoUrl;
      state.address = payload.address;
      state.rating = payload.rating;
    },
    [getUserStore.rejected]: (state, { payload }) => {
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

export const {
  handleStoreChange,
  setUpdateStore,
  changeStorePage,
  clearAllStoresState,
} = storeSlice.actions;
export default storeSlice.reducer;
