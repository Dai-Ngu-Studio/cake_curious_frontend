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
import { clearAllCouponsState } from "../coupons/couponSlice";
import { clearAllCommentsState } from "../comments/commentSlice";
import { clearAllRecipesState } from "../recipes/recipeSlice";
import { clearAllChatsState } from "../chats/chatSlice";
import { clearImageValues } from "../images/imageSlice";
import { clearAllProductCategoriesState } from "../product-categories/productCategorySlice";
import { clearAllOrdersState } from "../orders/orderSlice";
import { clearAllOrderDetailsState } from "../order-details/orderDetailSlice";

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
    // const res = await getDoc(doc(db, "users", authGoogle.user.uid));
    // if (!res.exists()) {
    //   await setDoc(doc(db, "users", authGoogle.user.uid), {
    //     uid: authGoogle.user.uid,
    //     displayName: authGoogle.user.displayName,
    //     email: authGoogle.user.email,
    //     photoUrl: authGoogle.user.photoURL,
    //   });
    // }
    return authGoogle.user.toJSON();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateUserRoleThunk = async ({ request }, thunkAPI) => {
  try {
    const updateRole = await customFetch.post(
      "/api/users/current/to-store",
      request
    );
    thunkAPI.dispatch(clearAllAccountsState());
    return updateRole.data;
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
    return thunkAPI.rejectWithValue(error);
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
    thunkAPI.dispatch(clearAllCouponsState());
    thunkAPI.dispatch(clearAllCommentsState());
    thunkAPI.dispatch(clearAllRecipesState());
    thunkAPI.dispatch(clearAllChatsState());
    thunkAPI.dispatch(clearAllProductCategoriesState());
    thunkAPI.dispatch(clearImageValues());
    thunkAPI.dispatch(clearAllOrdersState());
    thunkAPI.dispatch(clearAllOrderDetailsState());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
