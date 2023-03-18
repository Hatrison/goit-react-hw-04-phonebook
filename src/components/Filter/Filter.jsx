import React from 'react';
import PropTypes from 'prop-types';
import { Label } from './Filter.styled';

const Filter = ({ onChange, filter }) => {
  return (
    <Label>
      Find contacts by name
      <input name="filter" type="text" value={filter} onChange={onChange} />
    </Label>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Filter;
