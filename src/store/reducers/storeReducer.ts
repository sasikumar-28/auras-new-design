import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "@/graphQL/queries/types";

interface StoreState {
  store?: Store;
}

const initialState: StoreState = {
  store: {
    storeCode: "",
    storeName: "",
    storeDescription: "",
    activeCatalogId: 0,
    isDefault: false,
    logoDarkBg: "",
    logoLightBg: "",
    logoTransparent: "",
    catalogs: [],
    themeColor: "",
    themeContrastColor: "",
    tanyaThemeColor: "",
    tanyaThemeColorLight: "",
    favicon: "",
    websiteTitle: "",
    flowId: "",
    aliasId: "",
    searchConfigs: {
      endpoint: "",
      accessKey: "",
      secretKey: "",
    },
    homePageCategories: [
      //   {
      //     categoryID: 1,
      //     carouselTitle:
      //       "Start with a Crunch – Appetizers That Steal the Spotlight!",
      //   },
      //   {
      //     categoryID: 5,
      //     carouselTitle:
      //       "Sip, Savor, Refresh – Perfect Beverages for Every Moment!",
      //   },
      //   {
      //     categoryID: 112,
      //     carouselTitle:
      //       "Sweeten Every Moment – Indulge in Irresistible Desserts!",
      //   },
      //   {
      //     categoryID: 121,
      //     carouselTitle:
      //       "Savor the Heart of the Meal – Delicious Main Courses for Every Craving!",
      //   },
    ],
    carouselImages: {
      web: [],
      mobile: [],
    },
    otherImages: {
      web: [],
      mobile: [],
    },
  },
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStore: (state, action: PayloadAction<Store>) => {
      state.store = action.payload;
    },
  },
});

export const { setStore } = storeSlice.actions;

export default storeSlice.reducer;
