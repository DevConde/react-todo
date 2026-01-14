'use client'

import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import { Todo } from "./models/todo";

function SortableTodoItem({ id, content, removeAction }: { id: UniqueIdentifier, content: string, removeAction: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  return (
    <li ref={setNodeRef} style={style} {...attributes} className="rounded-sm p-3 shadow-md bg-indigo-500">
      <div className="flex items-center gap-3">

        <span className={`text-white ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} {...listeners}>
          ⋮⋮
        </span>
        <input type="checkbox" className="rounded-2xl cursor-pointer" />
        <span className="text-white">
          {content}
        </span>

        <input
          type="button"
          value="&#10006;"
          className="ml-auto text-indigo-200 px-2 py-0.5 text-shadow-white rounded-full hover:cursor-pointer active:brightness-75"
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={removeAction}
        />
      </div>
    </li >
  )
}

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodo() {
    const text = inputValue.trim();
    if (!text) return;
    setTodos(prev => [{ title: text, isCompleted: false, id: Math.random().toString(36).substring(2, 9) }, ...prev]); // Always add to the start of the list
    setInputValue('');
  };

  function removeTodo(index: number) {
    setTodos(prev => prev.filter((_, i) => i !== index));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const contextArea = <div className="mx-auto w-full max-w-2xl p-4 bg-indigo-300 rounded-lg mt-3 shadow-xl">
    <ul className="space-y-2">
      {todos.map((item, index) => (
        <SortableTodoItem key={item.id} id={item.id} content={item.title} removeAction={() => removeTodo(index)}></SortableTodoItem>
      ))}
    </ul>
  </div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto w-full max-w-2xl p-4 bg-indigo-300 rounded-lg mt-10 shadow-xl">
        <h1 className="mb-4 text-xl font-bold text-center text-white">Just another todo list</h1>
        <form onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
          <div className="flex gap-2">
            <input className="flex-1 bg-indigo-400 text-white rounded-md px-4 py-3 shadow-md focus:outline-0" type="text" placeholder="Another todo..." value={inputValue} onChange={(e) => { setInputValue(e.target.value) }}></input>
            <input className="text-white rounded-md bg-indigo-600 px-3 py-3 hover:cursor-pointer active:brightness-75" type="submit" value="Add" />
          </div>
        </form>
      </div>

      {/* Items container */}
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={todos.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          {todos.length > 0 ? contextArea : null}
        </SortableContext>
      </DndContext>
    </div>
  );
}