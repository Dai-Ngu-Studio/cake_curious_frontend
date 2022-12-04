import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllReportsThunk = async (_, thunkAPI) => {
  const { search, page, size, sort, type, status } = thunkAPI.getState().report;
  let url = `/api/reports?sort=${sort}&type=${type}&status=${status}&page=${page}&size=${size}`;
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

export const getReportThunk = async ({ reportId }, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/api/reports/${reportId}`);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateReportThunk = async ({ reportId, report }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/reports/${reportId}`, report);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const bulkUpdateReportsThunk = async ({ reportIds }, thunkAPI) => {
  console.log(reportIds);
  try {
    const resp = await customFetch.put(`/api/reports/bulk-update`, reportIds);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const getReportsOfAnItemThunk = async ({ itemId }, thunkAPI) => {
  try {
    const { page, size, sort, filter } = thunkAPI.getState().report;
    let url = `/api/reports/of-an-item/${itemId}?sort=${sort}&filter=${filter}&page=${page}&size=${size}`;
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
