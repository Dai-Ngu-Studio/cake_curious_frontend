import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAdminDashboardThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/dashboard-reports/admin");
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getStoreDashboardThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/dashboard-reports/store");
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
