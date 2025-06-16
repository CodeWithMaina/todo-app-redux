import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodo,
  deleteTodo,
  editTodo,
  toggleCompleted,
} from "../features/todoSlice";
import type { RootState } from "../app/store";
import type { TODO } from "../types/types";
import "./TodoComponent.css";

export const TodoComponent = () => {
  const [todoInput, setTodoInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);

  const remainingTasks = todos.filter((todo) => !todo.isCompleted).length;

  const handleEdit = (todo: TODO) => {
    setEditingId(todo.id);
    setEditText(todo.task);
  };

  const handleSaveEdit = (id: number) => {
    if (editText.trim()) {
      dispatch(editTodo({ id, newTodo: editText }));
      setEditingId(null);
      setEditText("");
    }
  };

  const handleToggleComplete = (id: number) => {
    dispatch(toggleCompleted(id));
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div>
        <h3>Tasks remaining: {remainingTasks}</h3>
        <div className="adding-container">
          <input
          className="todo-input"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder="Add todo"
        />
        <button
          className="todo-add-button"
          onClick={() => {
            if (todoInput.trim()) {
              dispatch(createTodo(todoInput));
              setTodoInput("");
            }
          }}
        >
          Add Todo
        </button>
        </div>
        
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {editingId === todo.id ? (
                <div className="editing-container">
                  <input
                    className="todo-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="buttons">
                    <button
                    className="todo-add-button"
                    onClick={() => handleSaveEdit(todo.id)}
                  >
                    Save
                  </button>
                  <button
                    className="todo-add-button cancel"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                  </div>
                  
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => handleToggleComplete(todo.id)}
                      style={{ marginRight: "10px" }}
                    />
                    <span
                      style={{
                        textDecoration: todo.isCompleted
                          ? "line-through"
                          : "none",
                        color: todo.isCompleted ? "#888" : "inherit",
                      }}
                    >
                      {todo.task}
                    </span>
                    <div className="buttons">
                      <button
                        className="todo-add-button"
                        onClick={() => handleEdit(todo)}
                      >
                        Edit
                      </button>
                      <button
                        className="todo-add-button delete"
                        onClick={() => dispatch(deleteTodo(todo.id))}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
