import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllReportedRecipesThunk,
  getRecipeThunk,
  deleteRecipeThunk,
} from "./recipeThunk";

const initialState = {
  isRecipesLoading: true,
  isRecipeDoneUpdating: false,
  reportedRecipes: [],
  recipe: null,
  isModalLoading: true,
  page: 1,
  size: 10,
  search: "",
  sort: "All",
  filter: "Active",
  totalPage: 1,
};

export const getAllReportedRecipes = createAsyncThunk(
  "recipe/getRecipes",
  getAllReportedRecipesThunk
);
export const getRecipe = createAsyncThunk("recipe/getRecipe", getRecipeThunk);
export const deleteRecipe = createAsyncThunk(
  "recipe/deleteRecipe",
  deleteRecipeThunk
);

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
    [getRecipe.pending]: (state) => {
      state.isRecipesLoading = true;
    },
    [getRecipe.fulfilled]: (state, { payload }) => {
      state.isRecipesLoading = false;
      state.recipe = payload;
    },
    [getRecipe.rejected]: (state, { payload }) => {
      state.isRecipesLoading = false;
    },
    [deleteRecipe.pending]: (state) => {
      state.isRecipeDoneUpdating = false;
    },
    [deleteRecipe.fulfilled]: (state, { payload }) => {
      state.isRecipeDoneUpdating = true;
    },
    [deleteRecipe.rejected]: (state, { payload }) => {
      state.isRecipeDoneUpdating = true;
    },
  },
});

export const { handleRecipeChange, changeRecipePage, clearAllRecipesState } =
  recipeSlice.actions;
export default recipeSlice.reducer;
