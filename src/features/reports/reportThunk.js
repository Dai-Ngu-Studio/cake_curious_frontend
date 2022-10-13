import customFetch, { checkForUnauthorizedResponse } from "../../ultils/axios";

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

export const updateReportThunk = async ({ reportId, report }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/reports/${reportId}`, report);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
