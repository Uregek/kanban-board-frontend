import { FC, useState } from 'react';
import { Task as TaskType } from '~/data';
import { Draggable } from 'react-beautiful-dnd';
import classNames from 'classnames';

interface TaskProps {
  index: number;
  task: TaskType;
}

export const Task: FC<TaskProps> = ({ task, index }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          key={task.id}
          onDoubleClick={() => {
            setIsOpen((value) => !value);
          }}
          className={classNames(
            'p-2 border-2 rounded-lg text-sm bg-neutral-900 border-neutral-800 mt-2 mx-2',
            {
              'bg-neutral-500 !border-neutral-400': snapshot.isDragging,
              truncate: Boolean(task?.big && isOpen),
            },
          )}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};
