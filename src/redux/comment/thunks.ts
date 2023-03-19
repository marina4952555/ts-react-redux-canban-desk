import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CommentType } from '../../types';
import { baseUrl } from '../common/thunks';

export const addNewComment = createAsyncThunk(
  'addNewComment',
  async (comment: CommentType) => {
    await axios.post(`${baseUrl}/comments`, comment);

    return {
      comment,
    };
  },
);

export const removeComment = createAsyncThunk(
  'removeComment',
  async (id: string) => {
    await axios.delete(`${baseUrl}/comments/${id}`);

    return id;
  },
);

export const addNewCommentText = createAsyncThunk(
  'addNewCommentText',
  async (comment: CommentType) => {
    await axios.put(`${baseUrl}/comments/${comment.id}`, {
      commentText: comment.commentText,
      id: comment.id,
      perentid: comment.perentid,
      commentAuthor: comment.commentAuthor,
      commentDate: comment.commentDate,
    });

    return comment;
  },
);
