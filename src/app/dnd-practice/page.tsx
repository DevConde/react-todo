'use client';

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
// import Droppable from "./components/droppable";
// import Draggable from "./components/draggable";
import { useState } from "react";

interface Item {
  id: UniqueIdentifier;
  content: string;
}

function SortableItem({ id, content }: { id: UniqueIdentifier, content: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (<li ref={setNodeRef} style={style} {...attributes} {...listeners} className="rounded-md border bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
    <div className="flex items-center gap-3">
      <span className="text-gray-500 dark:text-gray-400">::</span>
      <span className="dark:text-gray-200">
        {content}
      </span>
    </div>
  </li>)
}

export default function DndPractice() {

  const [items, setItems] = useState<Item[]>([
    { id: 'item-1', content: 'Item 1' },
    { id: 'item-2', content: 'Item 2' },
    { id: 'item-3', content: 'Item 3' },
  ]);
  // void setItems

  function handleDragStart(event: DragStartEvent) { }

  function handleDragEnd(event: DragEndEvent) {
    // console.log('Drag End', event);
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function addItem() {
    setItems((prev) => [...prev, { id: `item-${prev.length + 1}`, content: `Item ${prev.length + 1}` }]);
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">

      <h2 className="mb-4 text-xl font-bold dark:text-white">Sortable list</h2>
      <h3 className="mb-4 text-xl font-bold dark:text-white" onClick={addItem}> Add item</h3>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <ul className="space-y-2">
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} content={item.content}></SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}