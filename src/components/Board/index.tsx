import {
  DragDropContext,
  Droppable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import React, { FC, memo, useState } from 'react';
import { Column as ColumnType, initialData, TaskMap } from '~/data';
import { Column } from '~/components';
import { AddElement } from '~/components/AddElement';

interface InnerListProps {
  index: number;
  column: ColumnType;
  taskMap: TaskMap;
}

const InnerList: FC<InnerListProps> = memo(({ index, column, taskMap }) => {
  const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
  return <Column index={index} column={column} tasks={tasks} />;
});

export const Board = () => {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      return;
    }

    const home = state.columns[source.droppableId];
    const foreign = state.columns[destination.droppableId];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newHome.id]: newHome,
        },
      };

      setState(newState);
      return;
    }

    // moving from one list to another
    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="text-white sm:p-10 p-5 flex flex-auto absolute w-full h-full snap-x snap-mandatory overflow-x-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns[columnId];
              return (
                <InnerList
                  key={columnId}
                  index={index}
                  column={column}
                  taskMap={state.tasks}
                />
              );
            })}
            {provided.placeholder}
            <AddElement element={{ type: 'column' }} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
