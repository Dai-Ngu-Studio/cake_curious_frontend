import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./features/accounts/accountSlice";
import chatSlice from "./features/chats/chatSlice";
import commentSlice from "./features/comments/commentSlice";
import couponSlice from "./features/coupons/couponSlice";
import dashboardSlice from "./features/dashboards/dashboardSlice";
import imageSlice from "./features/images/imageSlice";
import orderDetailSlice from "./features/order-details/orderDetailSlice";
import orderSlice from "./features/orders/orderSlice";
import productCategorySlice from "./features/product-categories/productCategorySlice";
import productSlice from "./features/products/productSlice";
import recipeSlice from "./features/recipes/recipeSlice";
import reportSlice from "./features/reports/reportSlice";
import storeSlice from "./features/stores/storeSlice";
import userSlice from "./features/users/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    coupon: couponSlice,
    account: accountSlice,
    store: storeSlice,
    report: reportSlice,
    order: orderSlice,
    productCategory: productCategorySlice,
    image: imageSlice,
    orderDetail: orderDetailSlice,
    chat: chatSlice,
    dashboard: dashboardSlice,
    recipe: recipeSlice,
    comment: commentSlice,
  },
});
