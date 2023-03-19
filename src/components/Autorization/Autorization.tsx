import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import SaveButton from './../ui/SaveButton';
import './index.css';
import { userLogin } from '../../redux/user/thunks';

const Autorization = () => {
  const [value, setValue] = useState('');

  const dispatch = useAppDispatch();

  const saveUserName = () => {
    if (value) {
      dispatch(userLogin(value));
    }
  };

  return (
    <form className='autorization' onSubmit={saveUserName}>
      <label>
        <input
          className='autorization__input'
          type='text'
          name='name'
          autoComplete='off'
          value={value}
          placeholder='Your name'
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <button type='submit'>save</button>
    </form>
  );
};

export default Autorization;
