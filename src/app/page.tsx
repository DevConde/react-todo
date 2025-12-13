'use client'

import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [todoText, setTodoText] = useState('');

  const addTodo = () => {
    const newTodo = `${todoText}`;
    setTodos([...todos, newTodo]);
    setTodoText('');
  };

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-4 col-start-2">
        <div className="grid grid-cols-12">
          <div className="col-span-11">
            <input className="bg-neutral-200 border-2 rounded-md w-full px-4 py-3 focus:outline-0" type="text" placeholder="Just another todo..." value={todoText} onChange={e => setTodoText(e.target.value)} />
          </div>
          <div className="col-span-1">
            <input className="border-2 rounded-md px-2 py-3 ml-2 w-full hover:cursor-pointer" type="button" value="Add it" onClick={addTodo} />
          </div>
        </div>
        <div className="mt-10 grid grid-cols-6">
          <div className="col-span-6">
            <ul>
              {todos.map((todo, index) => (
                <li key={index}>{todo}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}