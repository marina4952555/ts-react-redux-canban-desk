import React, { useState } from 'react';
import dayjs from 'dayjs';
import { TaskType } from '../../types';
import './index.css';
import RemoveButton from './../ui/RemoveButton';
import SaveButton from './../ui/SaveButton';
import EditButton from './../ui/EditButton';
import { removeTask, addNewTaskName } from '../../redux/task/thunks';
import { useAppSelector } from '../../redux/hooks';
import { useAppDispatch } from '../../redux/hooks';

interface Props {
  task: TaskType;
  handleOpenTaskWindow: (id: string) => void;
}

function Task({ task, handleOpenTaskWindow }: Props) {
  const [isEditingTaskName, setIsEditingTaskName] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.taskName);

  const userName = useAppSelector((state) => ({
    userName: state.user.name,
  }));

  const dispatch = useAppDispatch();

  const handleSaveTaskName = () => {
    dispatch(
      addNewTaskName({
        ...task,
        taskName: newTaskName,
        taskDate: dayjs().format('DD.MM.YYYY HH:mm'),
      }),
    );
    setIsEditingTaskName(false);
  };

  const onClickEditTaskName = () => {
    setIsEditingTaskName(true);
  };

  const onClickRemoveTask = () => {
    dispatch(removeTask(task.id));
  };

  return (
    <li className='task__item'>
      <div className='task__item-box'>
        {isEditingTaskName && (
          <form>
            <label>
              <input
                type='text'
                name='name'
                autoComplete='off'
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
              />
            </label>
            <SaveButton onClicSave={handleSaveTaskName} text='save' />
          </form>
        )}
        {!isEditingTaskName && userName.userName === task.taskAuthor && (
          <>
            <h4 onClick={() => handleOpenTaskWindow(task.id)}>
              {task.taskName}
            </h4>
            <EditButton onClickEdit={onClickEditTaskName} />
            <RemoveButton
              onClickRemove={onClickRemoveTask}
              text='Remove tasc'
            />
          </>
        )}
        {!isEditingTaskName && userName.userName != task.taskAuthor && (
          <h4 onClick={() => handleOpenTaskWindow(task.id)}>{task.taskName}</h4>
        )}
      </div>
    </li>
  );
}

export default Task;
