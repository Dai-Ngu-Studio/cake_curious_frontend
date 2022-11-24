import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllReportedRecipesThunk } from "./recipeThunk";

const initialState = {
  isRecipesLoading: true,
  reportedRecipes: [],
  isModalLoading: true,
  page: 1,
  size: 10,
  search: "",
  sort: "All",
  filter: "All",
  totalPage: 1,
};

export const getAllReportedRecipes = createAsyncThunk(
  "recipe/getRecipes",
  getAllReportedRecipesThunk
);
// export const getSingleAccount = createAsyncThunk(
//   "account/getSingleAccount",
//   getAccountThunk
// );
// export const updateAccount = createAsyncThunk(
//   "account/updateAccount",
//   updateAccountThunk
// );
// export const updateAccountRole = createAsyncThunk(
//   "account/changeRoleAccountThunk",
//   changeRoleAccountThunk
// );

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    handleRecipeChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    changeRecipePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllRecipesState: (state) => initialState,
  },
  extraReducers: {
    [getAllReportedRecipes.pending]: (state) => {
      state.isRecipesLoading = true;
    },
    [getAllReportedRecipes.fulfilled]: (state, { payload }) => {
      state.isRecipesLoading = false;
      state.reportedRecipes = payload.recipes;
      state.totalPage = payload.totalPage;
    },
    [getAllReportedRecipes.rejected]: (state, { payload }) => {
      state.isRecipesLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleRecipeChange, changeRecipePage, clearAllRecipesState } =
  recipeSlice.actions;
export default recipeSlice.reducer;
