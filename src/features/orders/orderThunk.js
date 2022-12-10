import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllOrdersThunk = async (_, thunkAPI) => {
  const { search, page, size, sort, filter } = thunkAPI.getState().order;
  let url = `/api/orders?sort=${sort}&filter=${filter}&page=${page}&size=${size}`;
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

export const GetOrderThunk = async ({ orderId }, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/api/orders/${orderId}`);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateOrderThunk = async ({ orderId, order }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/orders/${orderId}`, order);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};