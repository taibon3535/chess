import { DndContext, DragEndEvent } from '@dnd-kit/core';
import React, { useState } from 'react';
import { Draggable } from './draggable';
import { Droppable } from './droppable';

export const Chessboard: React.FC = () => {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = <Draggable>Drag me</Draggable>;

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid aspect-square h-full grid-cols-8 grid-rows-[repeat(8,minmax(0,1fr))] border">
        {[...Array(8 * 8)].map((_, index) => {
          return (
            <Droppable
              className={`${
                Math.trunc(index / 8) % 2 === 0
                  ? 'odd:bg-orange-50 even:bg-blue-400'
                  : 'odd:bg-blue-400 even:bg-orange-50'
              }`}
            >
              {isDropped ? draggableMarkup : null}
            </Droppable>
          );
        })}
      </div>
    </DndContext>
  );
};
