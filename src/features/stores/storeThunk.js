import customFetch from "../../ultils/axios";

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
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const addStoreThunk = async (product, thunkAPI) => {
  try {
    const resp = await customFetch.post("/api/stores", product);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateStoreThunk = async ({ storeId, store }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/stores/${storeId}`, store);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteStoreThunk = async ({ storeId }, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/stores/${storeId}`);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
