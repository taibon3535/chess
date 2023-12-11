import { useDroppable } from '@dnd-kit/core';
import React, { PropsWithChildren } from 'react';

type Props = {
  className: string;
};

export const Droppable: React.FC<PropsWithChildren & Props> = ({
  children,
  className,
}) => {
  const { isOver, setNodeRef } = useDroppable({ id: 'droppable' });

  return (
    <div ref={setNodeRef} className={`h-full w-full ${className}`}>
      {children}
    </div>
  );
};
