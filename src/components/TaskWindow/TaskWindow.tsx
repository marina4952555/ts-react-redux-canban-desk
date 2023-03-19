import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import Comment from '../Comment';
import './index.css';
import { DeskType, TaskType } from '../../types';
import RemoveButton from './../ui/RemoveButton';
import SaveButton from './../ui/SaveButton';
import EditButton from './../ui/EditButton';
import { useAppSelector } from '../../redux/hooks';
import { useAppDispatch } from '../../redux/hooks';
import { addNewComment } from '../../redux/comment/thunks';

interface Props {
  desk: DeskType;
  currentTask: TaskType;
  handleAddDescription: (task: TaskType, descriptionText: string) => void;
  handleCloseTaskWindow: () => void;
}

function TaskWindow({
  desk,
  currentTask,
  handleAddDescription,
  handleCloseTaskWindow,
}: Props) {
  const [descriptionText, setDescriptionText] = useState(
    currentTask.taskDescription,
  );
  const [isEditingDescriptionText, setIsEditingDescriptionText] =
    useState(false);
  const [commentText, setCommentText] = useState('');

  const { userName, commentList } = useAppSelector((state) => ({
    userName: state.user.name,
    commentList: state.comments,
  }));

  const dispatch = useAppDispatch();

  const onClickAddTaskDescription = () => {
    handleAddDescription(currentTask, descriptionText);
    setIsEditingDescriptionText(false);
  };

  const onClickAddComment = () => {
    if (commentText) {
      dispatch(
        addNewComment({
          commentText: commentText,
          commentAuthor: userName,
          perentid: currentTask.id,
          id: uuidv4(),
          commentDate: dayjs().format('DD.MM.YYYY HH:mm'),
        }),
      );
      setCommentText('');
    }
  };

  const onClickEditDescroptionText = () => {
    setIsEditingDescriptionText(true);
  };

  const curentComment = commentList.filter(
    (comment) => comment.perentid === currentTask.id,
  );

  return (
    <div className='window'>
      <div className='window__container'>
        <RemoveButton
          onClickRemove={handleCloseTaskWindow}
          text='Remove comment'
        />
        <p>Task: {currentTask.taskName}</p>
        <p>In desk: {desk.deskName}</p>
        {currentTask.taskDescription && !isEditingDescriptionText && (
          <div className='description__box'>
            <p>Description: {currentTask.taskDescription}</p>
            <EditButton onClickEdit={onClickEditDescroptionText} />
          </div>
        )}
        {(isEditingDescriptionText || !currentTask.taskDescription) && (
          <form className='description__form'>
            <label>
              <textarea
                name='name'
                autoComplete='off'
                value={descriptionText}
                placeholder='Task description'
                onChange={(e) => setDescriptionText(e.target.value)}
              />
            </label>

            <SaveButton onClicSave={onClickAddTaskDescription} text='save' />
          </form>
        )}
        <form className='description__form'>
          <label>
            <textarea
              name='comment'
              autoComplete='off'
              value={commentText}
              placeholder='Comment Text'
              onChange={(e) => setCommentText(e.target.value)}
            />
          </label>
          <SaveButton onClicSave={onClickAddComment} text='save' />
        </form>
        {curentComment.length > 0 && (
          <ul className='comment__list'>
            {curentComment.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </ul>
        )}
        <div className='task-info__box'>
          <p>Author: {currentTask.taskAuthor}</p>
          <p>{currentTask.taskDate}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskWindow;
