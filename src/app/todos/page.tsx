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
      <button onClick={addTodo} className="bg-green-700 text-white ml-10 px-2 py-1 rounded cursor-pointer">Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}