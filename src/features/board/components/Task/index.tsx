import { FC } from 'react';
import { Task as TaskType } from '~/features/board/models';
import {
  Draggable,
  DraggableProvidedDraggableProps,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import classNames from 'classnames';

interface TaskProps {
  index: number;
  task: TaskType;
}

const getStyle = (
  style: DraggableProvidedDraggableProps['style'],
  snapshot: DraggableStateSnapshot,
) => {
  if (!snapshot.isDropAnimating) {
    return style;
  }

  if (!snapshot.draggingOver) {
    return {
      ...style,
      opacity: 0,
      transform: 'scale(.5)',
    };
  }

  return style;
};

export const Task: FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          key={task.id}
          className={classNames(
            'p-2 border-2 rounded-lg text-sm bg-neutral-900 border-neutral-800 mt-2 mx-2',
            {
              'bg-neutral-500 !border-neutral-400': snapshot.isDragging,
              'bg-red-600': snapshot.isDragging && !snapshot.draggingOver,
            },
          )}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={getStyle(provided.draggableProps.style, snapshot)}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};
