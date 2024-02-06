import { useDroppable } from '@dnd-kit/core';
import React, { PropsWithChildren } from 'react';

interface DroppableProps extends PropsWithChildren {
  id: string;
  className: string;
}

export const Droppable: React.FC<DroppableProps> = ({
  id,
  children,
  className,
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={`h-full w-full ${className}`}>
      {children}
    </div>
  );
};
