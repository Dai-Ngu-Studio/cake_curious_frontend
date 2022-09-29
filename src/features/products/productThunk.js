export const getAllProductsThunk = async (_, thunkAPI) => {
  const { search, page, size } = thunkAPI.getState().products;
  let url = `/api/products`;
};
