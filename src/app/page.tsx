'use client'

import { useState } from "react";
import Todo from "./components/todo";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    const text = inputValue.trim();
    if (!text) return;
    setTodos(prev => [text, ...prev]); // Always add to the start of the list
    setInputValue('');
  };

  function removeTodo(index: number) {
    setTodos(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-4 col-start-2">
        <div className="grid grid-cols-12">
          <div className="col-span-11">
            <input className="bg-neutral-200 border-2 rounded-md w-full px-4 py-3 focus:outline-0" type="text" placeholder="Just another todo..." value={inputValue} onChange={e => setInputValue(e.target.value)} />
          </div>
          <div className="col-span-1">
            <input className="border-2 rounded-md px-2 py-3 ml-2 w-full hover:cursor-pointer" type="button" value="Add it" onClick={addTodo} />
          </div>
        </div>
        <div className="mt-10 grid grid-cols-6">
          <div className="col-span-6">
            <div>
              {todos.map((todo, index) => (
                <Todo key={index} onRemove={() => removeTodo(index)}>{todo}</Todo>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}