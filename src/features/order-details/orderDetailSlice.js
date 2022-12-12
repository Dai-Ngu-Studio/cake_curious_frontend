import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllOrderDetailsThunk } from "./orderDetailThunk";

const initialState = {
  isOrderDetailLoading: false,
  totalOrderDetailPages: 1,
  page: 1,
  size: 10,
  sort: "All",
  orderDetails: [],
};

export const getAllOrderDetails = createAsyncThunk(
  "orderDetail/getOrderDetails",
  getAllOrderDetailsThunk
);

const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState,
  reducers: {
    handleOrderDetailChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    changeOrderDetailPage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllOrderDetailsState: (state) => initialState,
  },
  extraReducers: {
    [getAllOrderDetails.pending]: (state) => {
      state.isOrderDetailLoading = true;
    },
    [getAllOrderDetails.fulfilled]: (state, { payload }) => {
      state.isOrderDetailLoading = false;
      state.orderDetails = payload.orderDetails;
      state.totalOrderDetailPages = payload.totalPage;
    },
    [getAllOrderDetails.rejected]: (state, { payload }) => {
      state.isOrderDetailLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  handleOrderDetailChange,
  changeOrderDetailPage,
  clearAllOrderDetailsState,
} = orderDetailSlice.actions;
export default orderDetailSlice.reducer;
