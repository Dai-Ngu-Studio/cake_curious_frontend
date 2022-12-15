import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const addReasonThunk = async (reason, thunkAPI) => {
  try {
    const resp = await customFetch.post(`/api/deactivate-reasons`, reason);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
