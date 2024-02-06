// Chessboard.tsx
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import React, { useState } from 'react';
import { Droppable } from './droppable';
import { startingLayout, renderPiece } from './pieces';

export const Chessboard: React.FC = () => {
  const [boardLayout, setBoardLayout] = useState(startingLayout);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const newLayout = { ...boardLayout };
      const movedPiece = newLayout[active.id];
      delete newLayout[active.id];
      newLayout[over.id] = movedPiece;

      setBoardLayout(newLayout);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid aspect-square h-full grid-cols-8 grid-rows-[repeat(8,minmax(0,1fr))] border">
        {[...Array(8 * 8)].map((_, index) => {
          const row = String.fromCharCode('a'.charCodeAt(0) + (index % 8));
          const col = 8 - Math.floor(index / 8);
          const tileId = `${row}${col}`;

          return (
            <Droppable
              key={tileId}
              id={tileId}
              className={`${
                (index + Math.floor(index / 8)) % 2 === 0
                  ? 'bg-orange-50'
                  : 'bg-blue-400'
              }`}
            >
              {renderPiece(tileId, boardLayout)}
            </Droppable>
          );
        })}
      </div>
    </DndContext>
  );
};
