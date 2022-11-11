import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

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

export const addStoreThunk = async (product, thunkAPI) => {
  try {
    const resp = await customFetch.post("/api/stores", product);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateStoreThunk = async ({ storeId, store }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/stores/${storeId}`, store);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteStoreThunk = async ({ storeId }, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/stores/${storeId}`);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
