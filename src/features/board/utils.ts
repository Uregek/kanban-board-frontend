import { Task, TaskMap } from '~/features/board/models';
import { nanoid } from '@reduxjs/toolkit';
import { loremIpsum } from 'lorem-ipsum';

export const generateTasks: (count: number) => {
  taskIds: Task['id'][];
  tasks: TaskMap;
} = (count) => {
  const taskIds = [...new Array(count)].map((_) => nanoid());

  const tasks: TaskMap = {};
  taskIds.forEach((taskId) => {
    const v = Math.random();

    if (v > 0.3) {
      tasks[taskId] = {
        id: taskId,
        content: loremIpsum({
          count: 1,
          sentenceLowerBound: 3,
          sentenceUpperBound: 6,
          units: 'sentence',
        }),
      };
    } else {
      tasks[taskId] = {
        id: taskId,
        content: loremIpsum({
          count: 1,
          sentenceLowerBound: 15,
          sentenceUpperBound: 30,
          units: 'sentence',
        }),
      };
    }
  });

  return { taskIds, tasks };
};
