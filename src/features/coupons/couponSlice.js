import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addCouponThunk,
  getAllCouponsThunk,
  getCouponThunk,
  updateCouponThunk,
} from "./couponThunk";

const initialState = {
  isCouponLoading: false,
  isCouponDoneUpdating: false,
  coupons: [],
  totalCouponPages: 1,
  page: 1,
  size: 10,
  search: "",
  sort: "All",
  filter: "All",
  name: "",
  code: "",
  storeId: "",
  discount: "",
  discountType: 0,
  expiryDate: "",
  maxUses: 0,
  status: 0,
};

export const getAllCoupons = createAsyncThunk(
  "coupon/getCoupons",
  getAllCouponsThunk
);
export const getSingleCoupon = createAsyncThunk(
  "coupon/getSingleCoupon",
  getCouponThunk
);
export const addCoupon = createAsyncThunk("coupon/addCoupon", addCouponThunk);
export const updateCoupon = createAsyncThunk(
  "coupon/updateCoupon",
  updateCouponThunk
);

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    handleCouponChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    changeCouponPage: (state, { payload }) => {
      state.page = payload;
    },
    clearCouponValues: () => {
      return {
        ...initialState,
      };
    },
    clearAllCouponsState: (state) => initialState,
  },
  extraReducers: {
    [getAllCoupons.pending]: (state) => {
      state.isCouponLoading = true;
    },
    [getAllCoupons.fulfilled]: (state, { payload }) => {
      state.isCouponLoading = false;
      state.coupons = payload.coupons;
      state.totalCouponPages = payload.totalPage;
    },
    [getAllCoupons.rejected]: (state, { payload }) => {
      state.isCouponLoading = false;
      toast.error(payload);
    },
    [getSingleCoupon.pending]: (state) => {
      state.isCouponLoading = true;
    },
    [getSingleCoupon.fulfilled]: (state, { payload }) => {
      state.isCouponLoading = false;
      state.name = payload.name;
      state.code = payload.code;
      state.discount = payload.discount;
      state.discountType = payload.discountType;
      state.expiryDate = payload.expiryDate;
      state.maxUses = payload.maxUses;
      state.status = payload.status;
    },
    [getSingleCoupon.rejected]: (state, { payload }) => {
      state.isCouponLoading = false;
      toast.error(payload);
    },
    [addCoupon.pending]: (state) => {
      
    },
    [addCoupon.fulfilled]: (state, { payload }) => {     
      toast.success("Tạo phiếu giảm giá thành công");
    },
    [addCoupon.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [updateCoupon.pending]: (state) => {
      state.isCouponDoneUpdating = false;
    },
    [updateCoupon.fulfilled]: (state, { payload }) => {
      state.isCouponDoneUpdating = true;
      toast.success("Phiếu giảm giá cập nhật thành công");
    },
    [updateCoupon.rejected]: (state, { payload }) => {
      state.isCouponDoneUpdating = false;
      toast.error(payload);
    },
  },
});

export const {
  handleCouponChange,
  changeCouponPage,
  clearAllCouponsState,
  clearCouponValues,
} = couponSlice.actions;
export default couponSlice.reducer;
