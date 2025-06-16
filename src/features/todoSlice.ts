import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TodoState } from "../types/types";

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now(),
        task: action.payload,
        isCompleted: false,
      });
    },
    toggleCompleted: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{id: number, newTodo: string}>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if(todo){
        todo.task = action.payload.newTodo;
      }
    },
  },
});

export const { createTodo, deleteTodo, editTodo, toggleCompleted } =
  todoSlice.actions;
export default todoSlice.reducer;
