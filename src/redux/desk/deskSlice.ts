import { createSlice } from '@reduxjs/toolkit';
import { DeskType } from '../../types';
import { fetchInitialData } from '../common/thunks';
import {
  addNewDesk,
  removeDesk,
  addNewDeskName,
  removeAllDesk,
} from './thunks';

const initialState = [] as DeskType[];

const desksSlice = createSlice({
  name: 'deskList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchInitialData.fulfilled, (_, action) => {
      const { desks } = action.payload;

      if (desks) {
        return desks;
      }
    });
    builder.addCase(addNewDesk.fulfilled, (state, action) => {
      state.push(action.payload.desk);
    });
    builder.addCase(removeDesk.fulfilled, (state, action) => {
      return state.filter((desk: DeskType) => desk.id !== action.payload);
    });
    builder.addCase(addNewDeskName.fulfilled, (state, action) => {
      return state.map((desk) => {
        if (desk.id === action.payload.id) {
          return action.payload;
        }

        return desk;
      });
    });
    builder.addCase(removeAllDesk.fulfilled, (state) => {
      return (state = []);
    });
  },
});

export default desksSlice.reducer;
