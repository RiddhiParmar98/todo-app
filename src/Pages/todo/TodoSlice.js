import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todoForm",
  initialState,
  reducers: {
    createTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
      console.log("state.todos :>> ", state.todos, action.payload);
    },
    editTodo: (state, action) => {
      // // console.log('state', state)
      // const filterdata = state.todos.filter(
      //   (todoItem, index) => todoItem.id === action.payload
      // );
      // console.log("state.todos :>> ", state.todos, action.payload, filterdata);
    },
  },
});

export const { createTodo, editTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
