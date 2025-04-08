import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AccountState {
  customerNumber: number | null;
}

const initialState: AccountState = {
  customerNumber: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountInfo: (_state, action: PayloadAction<AccountState>) => {
      console.log(state)
      return action.payload;
    },
    updateCustomerNumber: (state, action: PayloadAction<AccountState>) => {
      state.customerNumber = action.payload.customerNumber;
    },
    clearAccount: () => initialState,
  },
});

export const { setAccountInfo, updateCustomerNumber, clearAccount } =
  accountSlice.actions;
export default accountSlice.reducer;
