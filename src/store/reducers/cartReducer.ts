/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action: any) => {
      const existingItem: any = state.cart.find(
        (item: any) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      } else {
        state.cart.push(action.payload ?? {});
      }
    },
    removeFromCart: (state, action: any) => {
      const existingItem: any = state.cart.find(
        (item: any) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          state.cart = state.cart.filter(
            (item: any) => item.id !== action.payload.id
          );
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCart, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
