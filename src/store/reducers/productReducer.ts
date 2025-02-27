import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterKeys = keyof typeof initialState.filter;

const initialState = {
  product: {},
  filter: {
    rating: 0,
    price: 0,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any>) => {
      state.product = action.payload;
    },
    updateFilter: (
      state,
      action: PayloadAction<{ key: FilterKeys; value: number }>
    ) => {
      const { key, value } = action.payload;
      state.filter[key] = value;
    },
  },
});

export const { setProducts, updateFilter } = productSlice.actions;

export default productSlice.reducer;
