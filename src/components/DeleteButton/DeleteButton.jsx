import React from 'react';
import PropTypes from 'prop-types';
import { DeleteBtn } from './DeleteButton.styled';

const DeleteButton = ({ onDelete, id }) => {
  return <DeleteBtn onClick={() => onDelete(id)}>Delete</DeleteBtn>;
};

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default DeleteButton;
