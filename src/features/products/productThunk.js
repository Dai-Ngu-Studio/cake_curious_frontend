import customFetch from "../../ultils/axios";

export const getAllProductsThunk = async (_, thunkAPI) => {
  const { search, page, size, sort, filter } = thunkAPI.getState().product;
  let url = `/api/products?sort=${sort}&filter=${filter}&page=${page}&size=${size}`;
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

export const addProductThunk = async (product, thunkAPI) => {
  try {
    const resp = await customFetch.post("/api/products", product);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateProductThunk = async ({ productId, product }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/products/${productId}`, product);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteProductThunk = async ({ productId }, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/products/${productId}`);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
