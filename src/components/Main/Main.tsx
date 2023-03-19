import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import Desk from '../Desk';
import './index.css';
import SaveButton from './../ui/SaveButton';
import { useAppSelector } from '../../redux/hooks';
import { useAppDispatch } from '../../redux/hooks';
import { userLogout } from '../../redux/user/thunks';
import { addNewDesk, removeAllDesk } from '../../redux/desk/thunks';

const Main = () => {
  const [deskName, setDeskName] = useState('');
  const [isError, setIsError] = useState(false);

  const { userName, deskList } = useAppSelector((state) => ({
    userName: state.user.name,
    deskList: state.desks,
  }));

  const dispatch = useAppDispatch();

  const handleChangeUser = () => {
    dispatch(userLogout());
  };

  const handleRemoveAllDesk = () => {
    dispatch(removeAllDesk());
  };

  const saveDesk = () => {
    if (deskName) {
      dispatch(
        addNewDesk({
          deskName: deskName,
          deskAuthor: userName,
          deskDate: dayjs().format('DD.MM.YYYY HH:mm'),
          id: uuidv4(),
        }),
      );
      setDeskName('');
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <>
      <div className='main__container'>
        <h2>User: {userName}</h2>
        <form className='new-desk'>
          <label>
            <input
              className='new-desk__input'
              type='text'
              name='name'
              autoComplete='off'
              value={deskName}
              placeholder='Desk name'
              onChange={(e) => setDeskName(e.target.value)}
            />
          </label>
          {isError && (
            <p className='error'>Please enter the text of your desk</p>
          )}
          <SaveButton onClicSave={saveDesk} text='submit' />
        </form>
        <SaveButton onClicSave={handleChangeUser} text='Change user' />
      </div>
      {deskList.length ? (
        <>
          {/* <SaveButton
            onClicSave={handleRemoveAllDesk}
            text='Remove all desks'
          /> */}
          <ul className='desk__list'>
            {deskList.map((desk) => (
              <Desk key={desk.id} desk={desk} />
            ))}
          </ul>
        </>
      ) : (
        <p className='main__not-desk'>desks not found</p>
      )}
    </>
  );
};

export default Main;
