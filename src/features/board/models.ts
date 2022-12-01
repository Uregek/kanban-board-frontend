export interface Task {
  id: string;
  content: string;
}
export interface TaskMap {
  [key: Task['id']]: Task;
}

export interface Column {
  id: string;
  title: string;
  taskOrder: Task['id'][];
}

export interface ColumnMap {
  [key: Column['id']]: Column;
}
