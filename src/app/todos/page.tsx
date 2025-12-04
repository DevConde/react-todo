'use client'

import { useState } from "react";

export default function Todos() {
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = () => {
    const newTodo = `Todo ${todos.length + 1}`;
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}