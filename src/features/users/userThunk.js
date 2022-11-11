import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import customFetch from "../../utils/axios";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { firebaseAuthError } from "../../utils/firebaseError";
import { clearAllAccountsState } from "../accounts/accountSlice";
import { clearAllProductsState } from "../products/productSlice";
import { clearAllReportsState } from "../reports/reportSlice";
import { clearAllStoresState } from "../stores/storeSlice";
import { clearUserLoginValues, logoutUser } from "./userSlice";
import { clearAllDashboardsState } from "../dashboards/dashboardSlice";

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

    const res = await getDoc(doc(db, "users", authGoogle.user.uid));
    if (!res.exists()) {
      await setDoc(doc(db, "users", authGoogle.user.uid), {
        uid: authGoogle.user.uid,
        displayName: authGoogle.user.displayName,
        email: authGoogle.user.email,
        photoUrl: authGoogle.user.photoURL,
      });
      await setDoc(doc(db, "rooms", authGoogle.user.uid), {});
    }
    return authGoogle.user.toJSON();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
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
    thunkAPI.dispatch(clearAllDashboardsState());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
