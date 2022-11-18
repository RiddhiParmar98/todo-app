import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todoForm",
  initialState,
  reducers: {
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
  },
});

export const { createTodo, editTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
