import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  isActive: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = [...state.user, action.payload];
    },
    logOutUser: (state, action) => {
      state.user = [];
    },
    createUser: (state, action) => {
      state.user = [...state.user, action.payload];
    },
  },
});

export const { loginUser, logOutUser, createUser } = userSlice.actions;
export default userSlice.reducer;
