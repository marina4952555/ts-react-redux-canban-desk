import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CommentType, DeskType, TaskType, UserType } from '../../types';

export const baseUrl = 'http://localhost:3001';

export const fetchInitialData = createAsyncThunk(
  'fetchInitialData',
  async () => {
    const user = await axios.get<UserType>('http://localhost:3001/user');

    if (user.data.name) {
      const [desks, tasks, comments] = await Promise.all([
        axios.get<DeskType[]>(`${baseUrl}/desks`),
        axios.get<TaskType[]>(`${baseUrl}/tasks`),
        axios.get<CommentType[]>(`${baseUrl}/comments`),
      ]);

      return {
        name: user.data.name,
        desks: desks.data,
        tasks: tasks.data,
        comments: comments.data,
      };
    }

    return {
      name: user.data.name,
    };
  },
);
