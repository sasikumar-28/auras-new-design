import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the category structure
interface Category {
  categoryId: string;
  categoryName: string;
  children?: Category[]; // Optional, based on whether you have subcategories
  requestParam: number[];
  active: boolean;
  attributes: any[];
  categoryDescription: string;
}

// State structure to hold a list of categories and loading/error states
interface CategoryState {
  categories: Category[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: null,
  loading: false,
  error: null,
};

// Create a slice with actions to set the categories, loading, and error
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // Set categories, typically after fetching them
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null; // Reset error when categories are successfully loaded
    },
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      state.error = null; // Reset any existing error when loading starts
    },
    // Set error state
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Optionally, you can clear the categories if needed
    clearCategories: (state) => {
      state.categories = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setCategories, setLoading, setError, clearCategories } = categorySlice.actions;
export default categorySlice.reducer;
