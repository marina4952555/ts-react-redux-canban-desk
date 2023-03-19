import React from 'react';
import './index.css';

interface Props {
  onClickEdit: () => void;
}

const EditButton = ({ onClickEdit }: Props) => {
  return (
    <button className='button__edit' type='button' onClick={onClickEdit}>
      edit
    </button>
  );
};

export default EditButton;
