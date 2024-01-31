import { DndContext, DragEndEvent } from '@dnd-kit/core';
import React, { useState } from 'react';
import { Draggable } from './draggable';
import { Droppable } from './droppable';
import bbi from '../../images/bbi.png';
import bki from '../../images/bki.png';
import bkn from '../../images/bkn.png';
import bpo from '../../images/bpo.png';
import bqu from '../../images/bqu.png';
import bro from '../../images/bro.png';
import wbi from '../../images/wbi.png';
import wki from '../../images/wki.png';
import wkn from '../../images/wkn.png';
import wpo from '../../images/wpo.png';
import wqu from '../../images/wqu.png';
import wro from '../../images/wro.png';

const startinglayout = {
  a1: wro,
  b1: wkn,
  c1: wbi,
  d1: wqu,
  e1: wki,
  f1: wbi,
  g1: wkn,
  h1: wro,
  a2: wpo,
  b2: wpo,
  c2: wpo,
  d2: wpo,
  e2: wpo,
  f2: wpo,
  g2: wpo,
  h2: wpo,
  a7: bpo,
  b7: bpo,
  c7: bpo,
  d7: bpo,
  e7: bpo,
  f7: bpo,
  g7: bpo,
  h7: bpo,
  a8: bro,
  b8: bkn,
  c8: bbi,
  d8: bqu,
  e8: bki,
  f8: bbi,
  g8: bkn,
  h8: bro,
};

export const Chessboard: React.FC = () => {
  const [isDropped, setIsDropped] = useState(false);

  const draggableMarkup = <Draggable>Drag me</Draggable>;

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  };

  const renderPiece = (tileId) => {
    const piece = startinglayout[tileId];
    if (piece) {
      return (
        <img
          src={piece}
          alt={tileId}
          style={{ width: '100%', height: '100%' }}
        />
      );
    }
    return null;
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid aspect-square h-full grid-cols-8 grid-rows-[repeat(8,minmax(0,1fr))] border">
        {[...Array(8 * 8)].map((_, index) => {
          const row = String.fromCharCode(
            'a'.charCodeAt(0) + Math.floor(index % 8),
          );
          const col = 8 - Math.floor(index / 8);
          const tileId = `${row}${col}`;
          return (
            <Droppable
              key={tileId}
              className={`${
                (index + Math.floor(index / 8)) % 2 === 0
                  ? 'bg-orange-50'
                  : 'bg-blue-400'
              }`}
            >
              {isDropped ? draggableMarkup : renderPiece(tileId)}
            </Droppable>
          );
        })}
      </div>
    </DndContext>
  );
};
