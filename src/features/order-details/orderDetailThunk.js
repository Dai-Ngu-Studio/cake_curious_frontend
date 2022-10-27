import customFetch, { checkForUnauthorizedResponse } from "../../ultils/axios";

export const getAllOrderDetailsThunk = async ({ orderId }, thunkAPI) => {
  const { page, size, sort } = thunkAPI.getState().orderDetail;
  let url = `/api/orders/store-order-detail/${orderId}?sort=${sort}&page=${page}&size=${size}`;
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
