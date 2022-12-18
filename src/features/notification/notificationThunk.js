import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const pushChatNotificationThunk = async ({ chat }, thunkAPI) => {
  try {
    const resp = await customFetch.post(`/api/notifications/push`, chat);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
