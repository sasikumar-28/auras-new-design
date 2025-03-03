import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import sessionReducer from "./reducers/authReducer";
export default configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: sessionReducer,
  },
});
