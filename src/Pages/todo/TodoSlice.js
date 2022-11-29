import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todoForm",
  initialState,
  reducers: {
    fetchTodo: (state, action) => {
      state.todos = [...action.payload];
    },
    createTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    editTodo: (state, action) => {
      const index = current(state.todos).findIndex(
        (todoItem, idx) => todoItem.id === action.payload.id
      );
      let cloneData = [...current(state.todos)];
      cloneData.splice(index, 1, action.payload);
      state.todos = [...cloneData];
    },
    deleteTodo: (state, action) => {
      state.todos = current(state.todos).filter(
        (data, idx) => data.id !== action.payload
      );
    },
    clearTodo: (state, action) => {
      state.todos = [];
    },
  },
});

export const { createTodo, editTodo, deleteTodo, fetchTodo, clearTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
