import React, { useState } from 'react';
import dayjs from 'dayjs';
import { CommentType } from '../../types';
import './index.css';
import RemoveButton from './../ui/RemoveButton';
import SaveButton from './../ui/SaveButton';
import EditButton from './../ui/EditButton';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { removeComment, addNewCommentText } from '../../redux/comment/thunks';

interface Props {
  comment: CommentType;
}

const Comment = ({ comment }: Props) => {
  const [isEditingCommentText, setIsEditingCommentText] = useState(false);
  const [newCommentText, setNewCommentText] = useState(comment.commentText);

  const userName = useAppSelector((state) => ({
    userName: state.user.name,
  }));

  const dispatch = useAppDispatch();

  const onClickAddComment = (id: string, newCommentText: string) => {
    dispatch(
      addNewCommentText({
        ...comment,
        commentText: newCommentText,
        commentDate: dayjs().format('DD.MM.YYYY HH:mm'),
      }),
    );
    setIsEditingCommentText(false);
  };

  const onClickRemoveComment = () => {
    dispatch(removeComment(comment.id));
  };

  const handleSaveCommentText = () => {
    onClickAddComment(comment.id, newCommentText);
  };

  const onClickEditCommentText = () => {
    setIsEditingCommentText(true);
  };

  return (
    <>
      <li className='comment__item'>
        {comment.commentAuthor === userName.userName && (
          <RemoveButton
            onClickRemove={onClickRemoveComment}
            text='Remove comment'
          />
        )}
        {isEditingCommentText && (
          <form>
            <label>
              <input
                type='text'
                name='name'
                autoComplete='off'
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
              />
            </label>
            <SaveButton onClicSave={handleSaveCommentText} text='save' />
          </form>
        )}
        <div className='task__item-box'>
          {!isEditingCommentText && <p>{comment.commentText}</p>}
          {comment.commentAuthor === userName.userName && (
            <EditButton onClickEdit={onClickEditCommentText} />
          )}
        </div>
        <p>{comment.commentAuthor}</p>
        <p>{comment.commentDate}</p>
      </li>
    </>
  );
};

export default Comment;
