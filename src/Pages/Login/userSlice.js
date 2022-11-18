import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: [],
  };
  console.log('initialState', initialState)
  export const userSlice = createSlice({
      name: "user", 
      initialState,
      reducers: {
        loginUser: (state, action) => {
            state.user = [...state.user,action.payload]
            console.log('state: ', state.user);
        },
        logOutUser: (state,action) => {
            state.user = [];
            console.log('state: ', state.user);
        }
    }
})
console.log('initialState222', initialState)

export const { loginUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;