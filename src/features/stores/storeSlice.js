import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
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
  isStoreDoneUpdating: false,
  editStoreId: null,
  user: {},
  name: "",
  description: "",
  photoUrl: null,
  storeAddress: "",
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
export const updateStore = createAsyncThunk(
  "store/updateStore",
  updateStoreThunk
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
    [getUserStore.pending]: (state) => {
      state.isStoreLoading = true;
    },
    [getUserStore.fulfilled]: (state, { payload }) => {
      state.isStoreLoading = false;
      state.editStoreId = payload.id;
      state.user = payload.user;
      state.name = payload.name;
      state.description = payload.description;
      state.photoUrl = payload.photoUrl;
      state.storeAddress = payload.address;
      state.rating = payload.rating;
    },
    [getUserStore.rejected]: (state, { payload }) => {
      state.isStoreLoading = false;
      toast.error(payload);
    },
    [updateStore.pending]: (state) => {
      state.isStoreLoading = true;
      state.isStoreDoneUpdating = false;
    },
    [updateStore.fulfilled]: (state, { payload }) => {
      state.isStoreLoading = false;
      state.isStoreDoneUpdating = true;
      toast.success("Cửa hàng cập nhật thành công");
    },
    [updateStore.rejected]: (state, { payload }) => {
      state.isStoreLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleStoreChange, changeStorePage, clearAllStoresState } =
  storeSlice.actions;
export default storeSlice.reducer;
