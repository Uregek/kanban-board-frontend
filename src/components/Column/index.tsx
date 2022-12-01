import { FC, memo, useState } from 'react';
import { Column as ColumnType, Task as TaskType } from '~/data';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Task } from '~/components';
import classNames from 'classnames';
import { AddElement } from '~/components/AddElement';

interface InnerListProps {
  tasks: TaskType[];
}

const InnerList: FC<InnerListProps> = memo(({ tasks }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task key={task.id} index={index} task={task} />
      ))}
    </>
  );
});

interface ColumnProps {
  index: number;
  column: ColumnType;
  tasks: TaskType[];
}

export const Column: FC<ColumnProps> = memo(({ index, column, tasks }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Draggable key={column.id} draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={classNames(
            'relative border rounded-lg bg-neutral-900 border-neutral-600 shrink-0 w-80 mx-2 min-h-24 h-min',
            { 'border-neutral-400': snapshot.isDragging },
          )}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            className={classNames(
              'flex rounded-t-md flex-grow-0 bg-neutral-700 w-full flex-row p-2 border-b border-neutral-600',
              {
                'rounded-md': !isOpen,
                'bg-neutral-500 border-neutral-400': snapshot.isDragging,
              },
            )}
            {...provided.dragHandleProps}
          >
            <p>{column.title}</p>
          </div>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                className={classNames('flex-grow p-2', {
                  invisible: !isOpen,
                  hidden: !isOpen,
                })}
              >
                <div
                  className={classNames(
                    'pb-2 border-2 rounded-lg border-dashed border-transparent',
                    {
                      '!border-neutral-400': snapshot.isDraggingOver,
                      '-mb-2': Boolean(
                        tasks.length === 0 && !snapshot.isDraggingOver,
                      ),
                    },
                  )}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {Boolean(tasks.length === 0 && !snapshot.isDraggingOver) && (
                    <div className="px-2 py-4 w-full text-neutral-800 text-center border-2 rounded-lg border-dashed border-neutral-800">
                      Drag here
                    </div>
                  )}
                  <InnerList tasks={tasks} />
                  {provided.placeholder}
                </div>
                <AddElement
                  element={{
                    type: 'task',
                    columnId: column.id,
                  }}
                />
              </div>
            )}
          </Droppable>
          <button
            onClick={() => setIsOpen((value) => !value)}
            className={classNames(
              'flex items-center gap-1 text-xs px-3 py-1 absolute block rounded-full bg-neutral-900 left-1/2 transform -translate-x-1/2 -bottom-3.5 border border-neutral-600',
              { 'border-neutral-400': snapshot.isDragging },
            )}
          >
            {Boolean(!isOpen && tasks.length) && tasks.length}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={classNames(
                'w-4 h-4 transition-transform duration-400',
                {
                  'rotate-180': !isOpen,
                },
              )}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>
        </div>
      )}
    </Draggable>
  );
});
