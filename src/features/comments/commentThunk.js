import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllReportedCommentsThunk = async (_, thunkAPI) => {
  const { search, page, size, sort, filter } = thunkAPI.getState().comment;
  let url = `api/comments/is-reported?sort=${sort}&filter=Active&page=${page}&size=${size}`;
  if (search) {
    url += `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const getCommentThunk = async ({ id }, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/api/comments/${id}`);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deleteCommentThunk = async ({ id }, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/comments/take-down/${id}`);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
