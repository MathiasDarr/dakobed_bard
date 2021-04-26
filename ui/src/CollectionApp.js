import React from "react";
import AddTodo from "./components/Collections/AddCollection";
import TodoList from "./components/Collections/CollectionList";
import VisibilityFilters from "./components/Collections/VisibilityFilters";
import "./styles.css";

export default function Collections() {
  return (
    <div className="todo-app">
      <h1>Collections</h1>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
}
