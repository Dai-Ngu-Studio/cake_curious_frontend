import customFetch from "../../utils/axios";

export const getImageThunk = async ({ tmpImage }, thunkAPI) => {
  try {
    let formData = new FormData();
    formData.append("file", tmpImage);
    const resp = await customFetch.post("/api/cloud/upload", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("There was an error");
  }
};
