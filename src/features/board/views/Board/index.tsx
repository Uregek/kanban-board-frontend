import {
  DragDropContext,
  Droppable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import React, { FC, memo } from 'react';
import { Column as ColumnType, TaskMap } from '~/features/board/models';
import { useAppDispatch, useAppSelector } from '~/shared/hooks/react-redux';
import { selectBoardState } from '~/features/board/slice/selectors';
import {
  moveColumn,
  moveTaskBetweenColumns,
  moveTaskInColumn,
  removeTask,
} from '~/features/board/slice';
import { AddElement, Column } from '~/features/board/components';

interface InnerListProps {
  index: number;
  column: ColumnType;
  taskMap: TaskMap;
}

const InnerList: FC<InnerListProps> = memo(({ index, column, taskMap }) => {
  const tasks = column.taskOrder.map((taskId) => taskMap[taskId]);
  return <Column index={index} column={column} tasks={tasks} />;
});

export const Board = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectBoardState);

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { destination, source, draggableId, type } = result;

    if (!destination && type === 'task') {
      dispatch(
        removeTask({
          columnId: source.droppableId,
          taskId: draggableId,
          sourceIndex: source.index,
        }),
      );
      return;
    }

    if (!destination) {
      return;
    }

    const { index: sourceIndex, droppableId: sourceDroppableId } = source;
    const { index: destinationIndex, droppableId: destinationDroppableId } =
      destination;

    if (
      sourceDroppableId === destinationDroppableId &&
      sourceIndex === destinationIndex
    ) {
      return;
    }

    if (type === 'column') {
      dispatch(
        moveColumn({
          sourceIndex,
          destinationIndex,
          columnId: draggableId,
        }),
      );
      return;
    }

    const sourceColumn = state.columns[sourceDroppableId];
    const destinationColumn = state.columns[destinationDroppableId];

    if (sourceColumn === destinationColumn) {
      dispatch(
        moveTaskInColumn({
          columnId: sourceDroppableId,
          sourceIndex,
          destinationIndex,
          taskId: draggableId,
        }),
      );
      return;
    }

    dispatch(
      moveTaskBetweenColumns({
        sourceColumnId: sourceColumn.id,
        destinationColumnId: destinationColumn.id,
        sourceIndex,
        destinationIndex,
        taskId: draggableId,
      }),
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="text-white sm:p-10 p-5 flex flex-auto overflow-auto scrollbar-hide"
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
