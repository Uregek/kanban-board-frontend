import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Column, ColumnMap, Task, TaskMap } from '~/features/board/models';
import { generateTasks } from '~/features/board/utils';
import undoable from 'redux-undo';
import { undoRedoHistoryLimit } from '~/features/board/constants';

interface BoardState {
  tasks: TaskMap;
  columns: ColumnMap;
  columnOrder: Column['id'][];
}

const { taskIds, tasks } = generateTasks(16);

const initialState: BoardState = {
  tasks,
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskOrder: [...taskIds.slice(0, taskIds.length - 4)],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskOrder: [...taskIds.slice(taskIds.length - 4)],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskOrder: [],
    },
    'column-4': {
      id: 'column-4',
      title: 'Blocked',
      taskOrder: [],
    },
  },

  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    moveColumn(
      state,
      {
        payload,
      }: PayloadAction<{
        sourceIndex: number;
        destinationIndex: number;
        columnId: Column['id'];
      }>,
    ) {
      const { sourceIndex, destinationIndex, columnId } = payload;
      state.columnOrder.splice(sourceIndex, 1);
      state.columnOrder.splice(destinationIndex, 0, columnId);
    },
    addColumn(state, { payload }: PayloadAction<Column['title']>) {
      const columnId = nanoid();
      state.columns[columnId] = { id: columnId, title: payload, taskOrder: [] };
      state.columnOrder.push(columnId);
    },
    removeColumn(
      state,
      {
        payload,
      }: PayloadAction<{ columnId: Column['id']; columnIndex: number }>,
    ) {
      const { columnId, columnIndex } = payload;
      const tasks = state.columns[columnId].taskOrder;
      for (const taskId of tasks) {
        delete state.tasks[taskId];
      }
      delete state.columns[columnId];
      state.columnOrder.splice(columnIndex, 1);
    },
    moveTaskInColumn(
      state,
      {
        payload,
      }: PayloadAction<{
        columnId: Column['id'];
        sourceIndex: number;
        destinationIndex: number;
        taskId: Task['id'];
      }>,
    ) {
      const { columnId, sourceIndex, destinationIndex, taskId } = payload;
      state.columns[columnId].taskOrder.splice(sourceIndex, 1);
      state.columns[columnId].taskOrder.splice(destinationIndex, 0, taskId);
    },
    moveTaskBetweenColumns(
      state,
      {
        payload,
      }: PayloadAction<{
        sourceColumnId: Column['id'];
        destinationColumnId: Column['id'];
        sourceIndex: number;
        destinationIndex: number;
        taskId: Task['id'];
      }>,
    ) {
      const {
        sourceColumnId,
        destinationColumnId,
        sourceIndex,
        destinationIndex,
        taskId,
      } = payload;
      state.columns[sourceColumnId].taskOrder.splice(sourceIndex, 1);
      state.columns[destinationColumnId].taskOrder.splice(
        destinationIndex,
        0,
        taskId,
      );
    },
    addTaskToColumn(
      state,
      {
        payload,
      }: PayloadAction<{ columnId: Column['id']; content: Task['content'] }>,
    ) {
      const { columnId, content } = payload;
      const taskId = nanoid();
      state.tasks[taskId] = { id: taskId, content };
      state.columns[columnId].taskOrder.push(taskId);
    },
    removeTask(
      state,
      {
        payload,
      }: PayloadAction<{
        columnId: Column['id'];
        taskId: Task['id'];
        sourceIndex: number;
      }>,
    ) {
      const { columnId, taskId, sourceIndex } = payload;
      state.columns[columnId].taskOrder.splice(sourceIndex, 1);
      delete state.tasks[taskId];
    },
  },
});

export const {
  moveColumn,
  addColumn,
  removeColumn,
  moveTaskInColumn,
  moveTaskBetweenColumns,
  addTaskToColumn,
  removeTask,
} = boardSlice.actions;

export default undoable(boardSlice.reducer, { limit: undoRedoHistoryLimit });
