import React, { useEffect } from 'react';
import Autorization from './components/Autorization';
import Main from './components/Main';
import './App.css';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchInitialData } from './redux/common/thunks';

function App() {
  const userName = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  return <main className='main'>{userName ? <Main /> : <Autorization />}</main>;
}

export default App;
