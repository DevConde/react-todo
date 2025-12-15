'use client'

import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

export default function Droppable({ id, children }: { id: UniqueIdentifier, children?: ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id
  });

  const style = {
    color: isOver ? 'green' : undefined
  };

  function onOverClasses() {
    return isOver ? 'bg-blue-300 border-blue-600': 'bg-neutral-200';
  }  

  return (
    <div ref={setNodeRef} style={style} className={"green mb-1 w-56 p-4 border-1 border-dashed " + onOverClasses()}>
      {children}
    </div>
  );
}