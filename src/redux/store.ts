import { configureStore } from '@reduxjs/toolkit';
import deskSlice from './desk/deskSlice';
import taskSlice from './task/taskSlice';
import commentSlice from './comment/commentSlice';
import userSlice from './user/userSlice';

export const store = configureStore({
  reducer: {
    desks: deskSlice,
    tasks: taskSlice,
    comments: commentSlice,
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
