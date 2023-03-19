import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchInitialData } from '../common/thunks';
import { userLogout, userLogin } from './thunks';

const userSlice = createSlice({
  name: 'userName',
  initialState: { name: '' },
  reducers: {
    setUserName: (_, action: PayloadAction<string>) => {
      return { name: action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchInitialData.fulfilled, (state, action) => {
      state.name = action.payload.name;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.name = '';
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.name = action.payload.name;
    });
  },
});

export const { setUserName } = userSlice.actions;

export default userSlice.reducer;
