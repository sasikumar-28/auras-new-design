import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/graphQL/queries/types";

interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.cart = action.payload;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem && existingItem.quantity) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          state.cart = state.cart.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCart, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
