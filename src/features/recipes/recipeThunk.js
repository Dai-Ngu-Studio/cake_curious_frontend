import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllReportedRecipesThunk = async (_, thunkAPI) => {
  const { search, page, size, sort, filter } = thunkAPI.getState().recipe;
  let url = `api/recipes/is-reported?sort=${sort}&filter=${filter}&page=${page}&size=${size}`;
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
export const getRecipeThunk = async ({ id }, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/api/recipes/${id}/model`);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deleteRecipeThunk = async ({ id }, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/recipes/take-down/${id}`);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
