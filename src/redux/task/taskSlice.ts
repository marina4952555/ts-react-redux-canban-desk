import { createSlice } from '@reduxjs/toolkit';
import { TaskType } from '../../types';
import { fetchInitialData } from '../common/thunks';
import {
  addNewTask,
  removeTask,
  addNewTaskName,
  addTaskDescription,
} from './thunks';

const initialState = [] as TaskType[];

const taskSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchInitialData.fulfilled, (_, action) => {
      const { tasks } = action.payload;

      if (tasks) {
        return tasks;
      }
    });
    builder.addCase(addNewTask.fulfilled, (state, action) => {
      state.push(action.payload.task);
    });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      return state.filter((task: TaskType) => task.id !== action.payload);
    });
    builder.addCase(addNewTaskName.fulfilled, (state, action) => {
      return state.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload;
        }

        return task;
      });
    });
    builder.addCase(addTaskDescription.fulfilled, (state, action) => {
      return state.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload;
        }

        return task;
      });
    });
  },
});

export default taskSlice.reducer;
