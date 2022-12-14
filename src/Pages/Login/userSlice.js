import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  isActive: false,
  loginUser: [],
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUser: (state, action) => {
      state.user = [...action.payload];
    },
    loginUser: (state, action) => {
      state.loginUser = action.payload;
    },
    logOutUser: (state, action) => {
      state.loginUser = [];
    },
    createUser: (state, action) => {
      state.user = [...state.user, action.payload];
    },
  },
});

export const { loginUser, logOutUser, createUser, fetchUser } =
  userSlice.actions;
export default userSlice.reducer;
