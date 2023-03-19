import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DeskType } from '../../types';
import { baseUrl } from '../common/thunks';

export const addNewDesk = createAsyncThunk(
  'addNewDesk',
  async (desk: DeskType) => {
    await axios.post(`${baseUrl}/desks`, desk);

    return {
      desk,
    };
  },
);

export const removeDesk = createAsyncThunk('removeDesk', async (id: string) => {
  await axios.delete(`${baseUrl}/desks/${id}`);

  return id;
});

export const addNewDeskName = createAsyncThunk(
  'addNewDeskName',
  async (desk: DeskType) => {
    await axios.put(`${baseUrl}/desks/${desk.id}`, {
      deskAuthor: desk.deskAuthor,
      deskDate: desk.deskDate,
      id: desk.id,
      deskName: desk.deskName,
    });

    return desk;
  },
);

export const removeAllDesk = createAsyncThunk('removeAllDesk', async () => {
  await axios.put(`${baseUrl}/desks`, []);
  await axios.put(`${baseUrl}/tasks`, []);
  await axios.put(`${baseUrl}/comments`, []);
});
