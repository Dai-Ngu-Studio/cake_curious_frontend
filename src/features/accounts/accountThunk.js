import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllAccountsThunk = async (_, thunkAPI) => {
  const { search, page, size, sort, filter } = thunkAPI.getState().account;
  let url = `/api/users?sort=${sort}&filter=${filter}&page=${page}&size=${size}`;
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
export const getAccountThunk = async ({ userId }, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/api/users/${userId}`);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const updateAccountThunk = async ({ userId, user }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/users/${userId}`, user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const changeRoleAccountThunk = async ({ userId, user }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/users/${userId}`, user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const addStaffAccountThunk = async (email, thunkAPI) => {
  try {
    const resp = await customFetch.post(`/api//users/staff`, email);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
