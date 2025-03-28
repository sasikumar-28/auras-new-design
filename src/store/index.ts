import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import sessionReducer from "./reducers/authReducer";
import storeReducer from "./reducers/storeReducer";
import imageReducer from "./reducers/cmsReducer";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: sessionReducer,
    store: storeReducer,
    cmsImage: imageReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
