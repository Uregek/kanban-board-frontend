export interface Task {
  id: string;
  content: string;
  big?: boolean;
}

export interface Column {
  id: string;
  title: string;
  taskIds: Task['id'][];
}

export interface TaskMap {
  [key: Task['id']]: Task;
}

interface ColumnMap {
  [key: Column['id']]: Column;
}

interface InitialData {
  tasks: TaskMap;
  columns: ColumnMap;
  columnOrder: Column['id'][];
}

export const initialData: InitialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content:
        'Double click on me to see details \n Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam consequuntur, culpa earum ex, fuga ipsa ipsam ipsum iste laborum minus, quod ratione ullam veritatis.',
      big: true,
    },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
    'column-4': {
      id: 'column-4',
      title: 'Blocked',
      taskIds: [],
    },
  },

  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};
