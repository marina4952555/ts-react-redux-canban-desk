import React from 'react';
import './index.css';

interface Props {
  text: string;
  onClickRemove: () => void;
}

const RemoveButton = ({ text, onClickRemove }: Props) => {
  return (
    <button
      type='button'
      className='button__remove'
      title={text}
      onClick={onClickRemove}
    >
      &#10006;
    </button>
  );
};

export default RemoveButton;
