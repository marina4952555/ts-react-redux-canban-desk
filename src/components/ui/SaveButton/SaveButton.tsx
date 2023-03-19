import React from 'react';
import './index.css';

interface Props {
  text: string;
  onClicSave: () => void;
}

const SaveButton = ({ text, onClicSave }: Props) => {
  return (
    <button className='button__save' type='button' onClick={onClicSave}>
      {text}
    </button>
  );
};

export default SaveButton;
