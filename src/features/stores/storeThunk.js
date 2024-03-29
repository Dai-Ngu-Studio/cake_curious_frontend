import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearImageValues } from "../images/imageSlice";

export const getAllStoresThunk = async (_, thunkAPI) => {
  const { search, page, size, sort, filter } = thunkAPI.getState().store;
  let url = `/api/stores?sort=${sort}&filter=${filter}&page=${page}&size=${size}`;
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

export const userStoreThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/stores/of-a-user");
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateStoreThunk = async ({ storeId, store }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/stores/${storeId}`, store);
    thunkAPI.dispatch(clearImageValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
