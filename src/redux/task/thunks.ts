import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TaskType } from '../../types';
import { baseUrl } from '../common/thunks';

export const addNewTask = createAsyncThunk(
  'addNewTask',
  async (task: TaskType) => {
    await axios.post(`${baseUrl}/tasks`, task);

    return {
      task,
    };
  },
);

export const removeTask = createAsyncThunk('removeTask', async (id: string) => {
  await axios.delete(`${baseUrl}/tasks/${id}`);

  return id;
});

export const addNewTaskName = createAsyncThunk(
  'addNewTaskName',
  async (task: TaskType) => {
    await axios.put(`${baseUrl}/tasks/${task.id}`, {
      perentid: task.perentid,
      taskAuthor: task.taskAuthor,
      taskDate: task.taskDate,
      taskDescription: task.taskDescription,
      id: task.id,
      taskName: task.taskName,
    });

    return task;
  },
);

export const addTaskDescription = createAsyncThunk(
  'addTaskDescription',
  async (task: TaskType) => {
    await axios.put(`${baseUrl}/tasks/${task.id}`, {
      perentid: task.perentid,
      taskAuthor: task.taskAuthor,
      taskDate: task.taskDate,
      taskDescription: task.taskDescription,
      id: task.id,
      taskName: task.taskName,
    });

    return task;
  },
);
