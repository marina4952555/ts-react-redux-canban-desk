import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserType } from '../../types';
import { baseUrl } from '../common/thunks';

export const userLogout = createAsyncThunk('user/logout', async () => {
  await axios.put<UserType>(`${baseUrl}/user`);
});

export const userLogin = createAsyncThunk(
  'user/login',
  async (name: string) => {
    const user = await axios.put<UserType>(`${baseUrl}/user`, {
      name,
    });

    return {
      name: user.data.name,
    };
  },
);
