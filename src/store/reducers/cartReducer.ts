import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/graphQL/queries/types";

interface CartState {
  cart: Product[];
  selectedProduct: Product[];
}

const initialState: CartState = {
  cart: [],
  selectedProduct: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.cart));
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
      localStorage.setItem("cart", JSON.stringify(state.cart));
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
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setSelectedProduct: (state, action: PayloadAction<Product[]>) => {
      state.selectedProduct = action.payload;
      localStorage.setItem(
        "selectedProduct",
        JSON.stringify(state.selectedProduct)
      );
    },
    removeAllSelectedProduct: (state) => {
      state.selectedProduct = [];
      localStorage.setItem(
        "selectedProduct",
        JSON.stringify(state.selectedProduct)
      );
    },
    updateProductQuantity: (
      state,
      action: PayloadAction<{ id: string; value: number }>
    ) => {
      const product = state.selectedProduct.find(
        (p) => p.id === action.payload.id
      );
      if (product) {
        product.quantity = (product.quantity || 1) + action.payload.value;
      }
      localStorage.setItem(
        "selectedProduct",
        JSON.stringify(state.selectedProduct)
      );
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  setSelectedProduct,
  updateProductQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
