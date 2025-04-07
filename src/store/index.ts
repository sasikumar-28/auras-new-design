import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import sessionReducer from "./reducers/authReducer";
import storeReducer from "./reducers/storeReducer";
import imageReducer from "./reducers/cmsReducer";
import accountReducer from "./reducers/accountReducer";
import categoryReducer from "./reducers/categoryReducer";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: sessionReducer,
    store: storeReducer,
    cmsImage: imageReducer,
    customerAccount: accountReducer,
    category: categoryReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
