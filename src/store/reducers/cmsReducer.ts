import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getContentfulImages } from "@/contentful/getContentfulImages";

interface ImageState {
  carouselImages: string[];
  squareImages: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ImageState = {
  carouselImages: [],
  squareImages: [],
  loading: false,
  error: null,
};

// Thunk to fetch square images
export const fetchSquareImages = createAsyncThunk(
  "images/fetchSquareImages",
  async (storeCode: string, { rejectWithValue }) => {
    try {
      const fieldName = `${storeCode}SquareImages`;
      const images = await getContentfulImages(fieldName);
      return images;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Thunk to fetch carousel images
export const fetchCarouselImages = createAsyncThunk(
  "images/fetchCarouselImages",
  async (storeCode: string, { rejectWithValue }) => {
    try {
      const fieldName = `${storeCode}CarouselImages`;
      const images = await getContentfulImages(fieldName);
      return images;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setCarouselImages: (state, action: PayloadAction<string[]>) => {
      state.carouselImages = action.payload;
    },
    setSquareImages: (state, action: PayloadAction<string[]>) => {
      state.squareImages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSquareImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSquareImages.fulfilled, (state, action) => {
        state.squareImages = action.payload;
        state.loading = false;
      })
      .addCase(fetchSquareImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCarouselImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarouselImages.fulfilled, (state, action) => {
        state.carouselImages = action.payload;
        state.loading = false;
      })
      .addCase(fetchCarouselImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCarouselImages, setSquareImages } = imageSlice.actions;
export default imageSlice.reducer;
