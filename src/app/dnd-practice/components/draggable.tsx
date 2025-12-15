'use client'

import type { ReactNode } from 'react';
import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";

export default function Draggable({ id, children }: { id: UniqueIdentifier, children?: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: id });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className="w-auto p-4 bg-amber-200">
      {children}
    </button>
  );
}