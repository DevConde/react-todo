"use client"

import { useState } from "react";
import type { MouseEvent } from 'react';

export default function Todo({ children, onRemove }: { children: string, onRemove?: () => void }) {
  const [value, setValue] = useState(false);

  function handleValue() {    
    setValue(prev => !prev);
  }

  function handleRemove(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (onRemove) onRemove();
  }

  return (
    <span onClick={handleValue} className={"bg-neutral-200 border-1 rounded-md w-full px-4 py-3 mb-1 hover:bg-neutral-300 hover:cursor-grab active:cursor-grabbing inline-block align-middle " + (value == true ? 'line-through' : '')}>
      <input type="checkbox" checked={value} onChange={e => setValue(e.target.checked)} className="mr-2 p-2 rounded-md border-1 hover:cursor-pointer" />
      {children}
      <button type="button" onClick={handleRemove} className="bg-neutral-400 text-red-600 border-1 rounded-md border-neutral-600 hover:cursor-alias hover:bg-neutral-500 px-2 float-right clear-both">x</button>
    </span>
  );
}