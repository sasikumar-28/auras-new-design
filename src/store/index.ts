import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
export default configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});
