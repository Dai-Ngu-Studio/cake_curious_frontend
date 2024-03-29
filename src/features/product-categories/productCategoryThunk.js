import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getProductCategoriesThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/product-categories");
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
