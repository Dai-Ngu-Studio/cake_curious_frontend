import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import customFetch from "../../ultils/axios";
import { auth } from "../../ultils/firebase";
import { firebaseAuthError } from "../../ultils/firebaseError";
import { clearAllAccountsState } from "../accounts/accountSlice";
import { clearAllProductsState } from "../products/productSlice";
import { clearAllReportsState } from "../reports/reportSlice";
import { clearAllStoresState } from "../stores/storeSlice";
import { clearUserLoginValues, logoutUser } from "./userSlice";

export const loginUserThunk = async ({ email, password }, thunkAPI) => {
  try {
    const authUser = await signInWithEmailAndPassword(auth, email, password);
    return authUser.user.toJSON();
  } catch (error) {
    return thunkAPI.rejectWithValue(firebaseAuthError(error.code));
  }
};

export const loginGoogleThunk = async (thunkAPI) => {
  try {
    const googleAuth = new GoogleAuthProvider();
    const authGoogle = await signInWithPopup(auth, googleAuth);
    return authGoogle.user.toJSON();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getUserThunk = async (_, thunkAPI) => {
  try {
    const user = await customFetch.post("/api/users/login");
    thunkAPI.dispatch(clearUserLoginValues());
    return user.data;
  } catch (error) {
    // return checkForUnauthorizedResponse(error, thunkAPI);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearAllReportsState());
    thunkAPI.dispatch(clearAllAccountsState());
    thunkAPI.dispatch(clearAllProductsState());
    thunkAPI.dispatch(clearAllStoresState());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
