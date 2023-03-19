import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import Task from '../Task';
import TaskWindow from '../TaskWindow';
import './index.css';
import { DeskType, TaskType } from '../../types';
import RemoveButton from './../ui/RemoveButton';
import SaveButton from './../ui/SaveButton';
import EditButton from './../ui/EditButton';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { addNewTask } from '../../redux/task/thunks';
import { addTaskDescription } from '../../redux/task/thunks';
import { removeDesk, addNewDeskName } from '../../redux/desk/thunks';

interface Props {
  desk: DeskType;
}

const Desk = ({ desk }: Props) => {
  const [isEditingDeskName, setIsEditingDeskName] = useState(false);
  const [newDeskName, setNewDeskName] = useState(desk.deskName);
  const [taskName, setTaskName] = useState('');
  const [isError, setIsError] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);

  const { userName, taskList } = useAppSelector((state) => ({
    userName: state.user.name,
    taskList: state.tasks,
  }));

  const dispatch = useAppDispatch();

  const curentTasks = taskList.filter((task) => task.perentid === desk.id);

  const handleSaveDeskName = () => {
    dispatch(
      addNewDeskName({
        ...desk,
        deskName: newDeskName,
        deskDate: dayjs().format('DD.MM.YYYY HH:mm'),
      }),
    );
    setIsEditingDeskName(false);
  };

  const onClickRemoveDesk = () => {
    dispatch(removeDesk(desk.id));
  };

  const saveTask = () => {
    if (taskName) {
      dispatch(
        addNewTask({
          taskName: taskName,
          taskAuthor: userName,
          perentid: desk.id,
          id: uuidv4(),
          taskDate: dayjs().format('DD.MM.YYYY HH:mm'),
          taskDescription: '',
        }),
      );
      setTaskName('');
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const handleAddDescription = (
    task: TaskType,
    taskDescriptionText: string,
  ) => {
    dispatch(
      addTaskDescription({
        ...task,
        taskDescription: taskDescriptionText,
        taskDate: dayjs().format('DD.MM.YYYY HH:mm'),
      }),
    );

    if (currentTask) {
      setCurrentTask({ ...currentTask, taskDescription: taskDescriptionText });
    }
  };

  const onClickEditDeskName = () => {
    setIsEditingDeskName(true);
  };

  const handleOpenTaskWindow = (id: string) => {
    const currentTask = taskList.find((task) => task.id === id);

    if (currentTask) {
      setCurrentTask(currentTask);
    }
  };

  const handleCloseTaskWindow = () => {
    setCurrentTask(null);
  };

  return (
    <li className='desk__item'>
      {desk.deskAuthor === userName && (
        <RemoveButton onClickRemove={onClickRemoveDesk} text='Remove desc' />
      )}
      {isEditingDeskName && (
        <form className=''>
          <label>
            <input
              className=''
              type='text'
              name='name'
              autoComplete='off'
              value={newDeskName}
              onChange={(e) => setNewDeskName(e.target.value)}
            />
          </label>
          <SaveButton onClicSave={handleSaveDeskName} text='submit' />
        </form>
      )}
      {!isEditingDeskName && desk.deskAuthor === userName && (
        <div className='desk__heading'>
          <h3>{desk.deskName}</h3>
          <EditButton onClickEdit={onClickEditDeskName} />
        </div>
      )}
      {!isEditingDeskName && desk.deskAuthor != userName && (
        <h3>{desk.deskName}</h3>
      )}
      <form>
        <label>
          <input
            className=''
            type='text'
            name='name'
            autoComplete='off'
            value={taskName}
            placeholder='Task name'
            onChange={(e) => setTaskName(e.target.value)}
          />
        </label>
        {isError && <p className='error'>Please enter the text of your task</p>}
        <SaveButton onClicSave={saveTask} text='save' />
      </form>
      {curentTasks.length > 0 && (
        <ul className='task__list'>
          {curentTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              handleOpenTaskWindow={handleOpenTaskWindow}
            />
          ))}
        </ul>
      )}
      <div className='desk-info__box'>
        <p>Author: {desk.deskAuthor}</p>
        <p>{desk.deskDate}</p>
      </div>

      {currentTask && (
        <TaskWindow
          currentTask={currentTask}
          desk={desk}
          handleAddDescription={handleAddDescription}
          handleCloseTaskWindow={handleCloseTaskWindow}
        />
      )}
    </li>
  );
};

export default Desk;
