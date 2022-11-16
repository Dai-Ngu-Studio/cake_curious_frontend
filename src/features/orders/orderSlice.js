import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  deleteOrderThunk,
  getAllOrdersThunk,
  GetOrderThunk,
  updateOrderThunk,
} from "./orderThunk";

const initialState = {
  isOrderLoading: false,
  orders: [],
  totalOrderPages: 1,
  page: 1,
  size: 10,
  search: "",
  sort: "All",
  filter: "All",
  filterOptions: ["Pending", "Completed", "Cancelled", "Processing"],
  // isOrderEditting: false,
  // editOrderId: null,
  isOrderDoneUpdating: false,
  status: 0,
  orderDate: null,
  processedDate: null,
  completedDate: null,
  discountedTotal: 0,
  address: "",
  user: {},
  orderDetails: [],
};

export const getAllOrders = createAsyncThunk(
  "order/getOrders",
  getAllOrdersThunk
);
export const getSingleOrder = createAsyncThunk(
  "order/getSingleOrder",
  GetOrderThunk
);
export const updateOrder = createAsyncThunk(
  "order/updateOrders",
  updateOrderThunk
);
export const deleteOrder = createAsyncThunk(
  "order/deleteOrders",
  deleteOrderThunk
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    handleOrderChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    // setUpdateOrder: (state, { payload }) => {
    //   return {
    //     ...state,
    //     isOrderEditting: true,
    //     isOrderDetailsReady: true,
    //     ...payload,
    //   };
    // },
    changeOrderPage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllOrdersState: (state) => initialState,
  },
  extraReducers: {
    [getAllOrders.pending]: (state) => {
      state.isOrderLoading = true;
    },
    [getAllOrders.fulfilled]: (state, { payload }) => {
      state.isOrderLoading = false;
      state.orders = payload.orders;
      state.totalOrderPages = payload.totalPage;
    },
    [getAllOrders.rejected]: (state, { payload }) => {
      state.isOrderLoading = false;
      toast.error(payload);
    },
    [getSingleOrder.pending]: (state) => {
      state.isOrderLoading = true;
    },
    [getSingleOrder.fulfilled]: (state, { payload }) => {
      state.isOrderLoading = false;
      state.status = payload.status;
      state.orderDate = payload.orderDate;
      state.discountedTotal = payload.discountedTotal;
      state.address = payload.address;
      state.user = payload.user;
      state.processedDate = payload.processedDate;
      state.completedDate = payload.completedDate;
    },
    [getSingleOrder.rejected]: (state, { payload }) => {
      state.isOrderLoading = false;
      toast.error(payload);
    },
    [updateOrder.pending]: (state) => {
      state.isOrderLoading = true;
      state.isOrderDoneUpdating = false;
    },
    [updateOrder.fulfilled]: (state, { payload }) => {
      state.isOrderLoading = false;
      state.isOrderDoneUpdating = true;
      toast.success("Order Updated...");
    },
    [updateOrder.rejected]: (state, { payload }) => {
      state.isOrderLoading = false;
      toast.error(payload);
    },
    [deleteOrder.pending]: (state) => {
      state.isOrderLoading = true;
    },
    [deleteOrder.fulfilled]: (state, { payload }) => {
      state.isOrderLoading = false;
      toast.success("Order Deleted...");
    },
    [deleteOrder.rejected]: (state, { payload }) => {
      state.isOrderLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  handleOrderChange,
  // setUpdateOrder,
  changeOrderPage,
  clearAllOrdersState,
} = orderSlice.actions;
export default orderSlice.reducer;
