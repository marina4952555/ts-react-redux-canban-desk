import { createSlice } from '@reduxjs/toolkit';
import { CommentType } from '../../types';
import { fetchInitialData } from '../common/thunks';
import { addNewComment, removeComment, addNewCommentText } from './thunks';

const initialState = [] as CommentType[];

const commentSlice = createSlice({
  name: 'commentList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchInitialData.fulfilled, (_, action) => {
      const { comments } = action.payload;

      if (comments) {
        return comments;
      }
    });
    builder.addCase(addNewComment.fulfilled, (state, action) => {
      state.push(action.payload.comment);
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      return state.filter(
        (comment: CommentType) => comment.id !== action.payload,
      );
    });
    builder.addCase(addNewCommentText.fulfilled, (state, action) => {
      return state.map((comment) => {
        if (comment.id === action.payload.id) {
          return action.payload;
        }

        return comment;
      });
    });
  },
});

export default commentSlice.reducer;
