import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./features/accounts/accountSlice";
import imageSlice from "./features/images/imageSlice";
import orderDetailSlice from "./features/order-details/orderDetailSlice";
import orderSlice from "./features/orders/orderSlice";
import productCategorySlice from "./features/product-categories/productCategorySlice";
import productSlice from "./features/products/productSlice";
import reportSlice from "./features/reports/reportSlice";
import storeSlice from "./features/stores/storeSlice";
import userSlice from "./features/users/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    account: accountSlice,
    store: storeSlice,
    report: reportSlice,
    order: orderSlice,
    productCategory: productCategorySlice,
    image: imageSlice,
    orderDetail: orderDetailSlice,
  },
});
