import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  email: string;
  id: string;
  password: string;
  __typename: string;
};

type SessionState = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: SessionState = {
  user: null,
  isAuthenticated: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
