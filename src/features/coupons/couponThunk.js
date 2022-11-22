import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearCouponValues } from "./couponSlice";

export const getAllCouponsThunk = async (_, thunkAPI) => {
  const { search, page, size, sort, filter } = thunkAPI.getState().coupon;
  let url = `/api/coupons?sort=${sort}&filter=${filter}&page=${page}&size=${size}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getCouponThunk = async ({ couponId }, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/api/coupons/${couponId}`);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const addCouponThunk = async (coupon, thunkAPI) => {
  try {
    const resp = await customFetch.post("/api/coupons", coupon);
    thunkAPI.dispatch(clearCouponValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateCouponThunk = async ({ couponId, coupon }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/coupons/${couponId}`, coupon);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
