import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const addReasonThunk = async (reason, thunkAPI) => {
  try {
    const resp = await customFetch.post(`/api/deactivate-reasons`, reason);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const getReasonThunk = async (email, thunkAPI) => {
  try {
    const resp = await customFetch.post(
      `/api/deactivate-reasons/by-email`,
      email
    );
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const getReasonForItemThunk = async ({ itemId }, thunkAPI) => {
  try {
    const resp = await customFetch.get(
      `/api/deactivate-reasons/item/${itemId}`
    );
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
